import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { homedir } from "node:os";
import ora from "ora";
import { getClaudeProjectsDir } from "../config.js";
import { formatDate, formatSize, formatRelativeDate, scanTranscripts, type TranscriptInfo } from "../utils/scanner.js";
import { uploadTranscript } from "../utils/uploader.js";

const DEFAULT_VIEWER_URL = "https://claude-code-viewer.pages.dev";

export function createUploadCommand(): Command {
  const command = new Command("upload")
    .description("Upload a Claude transcript to the viewer")
    .option(
      "-s, --server <url>",
      "Override viewer URL for generating display link",
      DEFAULT_VIEWER_URL,
    )
    .action(async (options) => {
      const serverUrl = options.server;
      const projectsDir = getClaudeProjectsDir();

      const scanSpinner = ora("Scanning for Claude transcripts...").start();

      try {
        const transcripts = await scanTranscripts(projectsDir);
        scanSpinner.succeed(`Found ${transcripts.length} transcripts`);

        if (transcripts.length === 0) {
          return;
        }

        // Prepare choices for inquirer
        const choices = transcripts.map((t: TranscriptInfo) => ({
          name: formatTranscriptLine(t),
          value: t,
          short: t.projectPath,
        }));

        // Show interactive selection
        const { selected } = await inquirer.prompt([
          {
            type: "list",
            name: "selected",
            message: "Select a transcript to upload:",
            choices,
            pageSize: 30,
            loop: false,
          },
        ]);

        // Upload selected transcript
        const uploadSpinner = ora("Uploading transcript...").start();
        const result = await uploadTranscript(selected.path, serverUrl);

        if (result.success) {
          uploadSpinner.succeed("Upload complete!");
          if (result.url) {
            console.log(chalk.green(`View at: ${result.url}`));
          }
        } else {
          uploadSpinner.fail("Upload failed");
        }
      } catch (error) {
        scanSpinner.fail("Error scanning transcripts");
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
      }
    });

  return command;
}

function formatTranscriptLine(transcript: TranscriptInfo): string {
  // 1. Modified date as relative time (fixed width)
  const modifiedDate = chalk.cyan(formatRelativeDate(transcript.lastModified).padEnd(6));
  
  // 2. Message count with file size in parentheses (fixed width)
  const messageCountStr = transcript.messageCount.toString();
  const sizeStr = formatSize(transcript.size);
  const messageInfo = chalk.white(messageCountStr.padStart(3)) + 
                     chalk.gray(` (${sizeStr})`.padEnd(12));
  
  // 3. Working directory / git repo name (fixed width)
  let repoInfo: string;
  if (transcript.repositoryName) {
    repoInfo = transcript.repositoryName;
  } else {
    // Format working directory with ~ for home
    const home = homedir();
    let formattedPath = transcript.workingDirectory;
    if (formattedPath.startsWith(home)) {
      formattedPath = formattedPath.replace(home, '~');
    }
    repoInfo = formattedPath;
  }
  const formattedRepoInfo = chalk.yellow(repoInfo.substring(0, 35).padEnd(35));
  
  // 4. Summary (truncated to fit)
  const summary = chalk.white(transcript.summary.substring(0, 60));
  
  // 5. ID (extract from file path)
  const id = chalk.gray(transcript.path.split('/').pop()?.replace('.jsonl', '') || '');

  return `${modifiedDate} ${messageInfo} ${formattedRepoInfo} ${summary} ${id}`;
}
