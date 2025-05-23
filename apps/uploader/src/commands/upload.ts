import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { getClaudeProjectsDir } from '../config.js';
import { scanTranscripts, formatDate, formatSize, TranscriptInfo } from '../utils/scanner.js';
import { uploadTranscript } from '../utils/uploader.js';

const DEFAULT_VIEWER_URL = 'http://localhost:3000';

export function createUploadCommand(): Command {
  const command = new Command('upload')
    .description('Upload a Claude transcript to the viewer')
    .option('-s, --server <url>', 'Override viewer URL for generating display link', DEFAULT_VIEWER_URL)
    .action(async (options) => {
      const serverUrl = options.server;
      const projectsDir = getClaudeProjectsDir();

      const scanSpinner = ora('Scanning for Claude transcripts...').start();

      try {
        const transcripts = await scanTranscripts(projectsDir);
        scanSpinner.succeed(`Found ${transcripts.length} transcripts`);

        if (transcripts.length === 0) {
          console.log(chalk.yellow('No transcripts found in ~/.claude/projects/'));
          return;
        }

        // Prepare choices for inquirer
        const choices = transcripts.map((t: TranscriptInfo) => ({
          name: formatTranscriptLine(t),
          value: t,
          short: t.projectPath
        }));

        // Show interactive selection
        const { selected } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selected',
            message: 'Select a transcript to upload:',
            choices,
            pageSize: 15,
            loop: false
          }
        ]);

        // Upload selected transcript
        const uploadSpinner = ora('Uploading transcript...').start();
        const result = await uploadTranscript(selected.path, serverUrl);

        if (result.success) {
          uploadSpinner.succeed('Upload complete!');
          console.log(chalk.green(`\n✓ Transcript uploaded successfully`));
          if (result.url) {
            console.log(chalk.blue(`View at: ${result.url}`));
          }
        } else {
          uploadSpinner.fail('Upload failed');
          console.log(chalk.red(`\n✗ ${result.message}`));
        }

      } catch (error) {
        scanSpinner.fail('Error scanning transcripts');
        console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
        process.exit(1);
      }
    });

  return command;
}

function formatTranscriptLine(transcript: TranscriptInfo): string {
  const date = chalk.cyan(formatDate(transcript.lastModified).padEnd(15));
  const project = chalk.yellow(transcript.projectPath.padEnd(40));
  const size = chalk.gray(`[${formatSize(transcript.size)}]`.padEnd(10));
  const summary = chalk.white(transcript.summary);

  return `${date} ${project} ${size} ${summary}`;
}
