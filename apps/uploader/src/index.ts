#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { createUploadCommand } from './commands/upload.js';
import { createConfigCommand } from './commands/config.js';

// ASCII art banner
const banner = chalk.blue(`
 ╭──────────────────────────────╮
 │     Claude Code Uploader     │
 ╰──────────────────────────────╯
`);

console.log(banner);

program
  .name('claude-upload')
  .description('CLI tool for uploading Claude Code transcripts to the viewer')
  .version('0.1.0');

// Add commands
program.addCommand(createUploadCommand());
program.addCommand(createConfigCommand());

// Default action (same as upload command)
program.action(async () => {
  await program.commands.find(cmd => cmd.name() === 'upload')?.parseAsync(process.argv);
});

// Parse arguments
program.parse();
