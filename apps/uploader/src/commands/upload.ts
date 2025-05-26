import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { homedir } from "node:os";
import ora from "ora";
import { getCurrentWorkingDir } from "../config.js";
import { formatDate, formatSize, formatRelativeDate } from "../utils/scanner.js";
import { SessionManager, type SessionInfo } from "../utils/SessionManager.js";
import { uploadConversation } from "../utils/uploader.js";

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
      const currentDir = getCurrentWorkingDir();

      const scanSpinner = ora("Scanning for Claude Code conversations...").start();

      try {
        const sessionManager = new SessionManager();
        await sessionManager.loadFromDirectory(currentDir);
        const sessions = sessionManager.getSessionInfos();
        
        scanSpinner.succeed(`Found ${sessions.length} conversations`);

        if (sessions.length === 0) {
          console.log(chalk.yellow("No Claude Code conversations found for current directory."));
          console.log(chalk.gray(`Current directory: ${currentDir}`));
          console.log(chalk.gray(`Looking in: ~/.claude/projects/${currentDir.replace(/\//g, '-')}`));
          console.log(chalk.gray("Make sure you have Claude Code conversations for this project."));
          return;
        }

        // Prepare choices for inquirer
        const choices = sessions.map((session: SessionInfo) => ({
          name: formatSessionLine(session),
          value: session,
          short: session.summary,
        }));

        // Show interactive selection
        const { selected } = await inquirer.prompt([
          {
            type: "list",
            name: "selected",
            message: "Select a conversation to upload:",
            choices,
            pageSize: 30,
            loop: false,
          },
        ]);

        // Show reconstructed conversation data structure that will be uploaded
        console.log(chalk.cyan("\n📋 Complete conversation data structure to upload:"));
        console.log(chalk.gray("─".repeat(80)));
        
        const uploadData = {
          transcript: {
            id: selected.id, // This is the leaf message UUID (final message in conversation)
            messages: selected.transcript.messages,
            messageCount: selected.transcript.messages.length
          },
          title: selected.summary,
          metadata: {
            uploadedAt: new Date().toISOString(),
            messageCount: selected.transcript.messages.length,
            lastModified: selected.lastModified.toISOString(),
            leafMessageId: selected.id // Clarifying this is the leaf message ID
          }
        };
        
        console.log(JSON.stringify(uploadData, null, 2));
        console.log(chalk.gray("─".repeat(80)));
        console.log(chalk.yellow(`📝 Note: ID shown (${selected.id.slice(0, 8)}...) is the leaf message UUID`));
        console.log(chalk.yellow(`💬 This conversation contains ${selected.transcript.messages.length} messages total`));

        // Ask for confirmation
        const { confirm } = await inquirer.prompt([
          {
            type: "confirm",
            name: "confirm",
            message: "Upload this conversation?",
            default: true,
          },
        ]);

        if (!confirm) {
          console.log(chalk.yellow("Upload cancelled."));
          return;
        }

        // Upload selected conversation
        const uploadSpinner = ora("Uploading conversation...").start();
        const result = await uploadConversation(selected, serverUrl);

        if (result.success) {
          uploadSpinner.succeed("Upload complete!");
          if (result.url) {
            console.log(chalk.green(`View at: ${result.url}`));
          }
        } else {
          uploadSpinner.fail("Upload failed");
        }
      } catch (error) {
        scanSpinner.fail("Error scanning conversations");
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
      }
    });

  return command;
}

function formatSessionLine(session: SessionInfo): string {
  // 1. Modified date as relative time (fixed width)
  const modifiedDate = chalk.cyan(formatRelativeDate(session.lastModified).padEnd(8));
  
  // 2. Message count (fixed width)
  const messageCountStr = session.messageCount.toString();
  const messageInfo = chalk.white(messageCountStr.padStart(3) + " msgs".padEnd(6));
  
  // 3. File name (first 8 chars of UUID)
  const fileName = session.filePath.split('/').pop()?.replace('.jsonl', '') || '';
  const shortFileName = fileName.substring(0, 8);
  const formattedFileName = chalk.yellow(shortFileName.padEnd(10));
  
  // 4. Summary (truncated to fit terminal width)
  const summary = chalk.white(session.summary.substring(0, 70));
  
  // 5. Full ID (last 8 chars for uniqueness)
  const id = chalk.gray(session.id.slice(-8));

  return `${modifiedDate} ${messageInfo} ${formattedFileName} ${summary} ${id}`;
}
