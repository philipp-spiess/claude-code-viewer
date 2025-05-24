#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import { createUploadCommand } from "./commands/upload.js";

// ASCII art banner
const _banner = chalk.blue(`
 ╭──────────────────────────────╮
 │     Claude Code Uploader     │
 ╰──────────────────────────────╯
`);

program
  .name("claude-upload")
  .description("CLI tool for uploading Claude Code transcripts to the viewer")
  .version("0.1.0");

// Add commands
program.addCommand(createUploadCommand());

// Default action (same as upload command)
program.action(async () => {
  await program.commands.find((cmd) => cmd.name() === "upload")?.parseAsync(process.argv);
});

// Parse arguments
program.parse();
