import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { homedir } from "node:os";
import { parseTranscript } from "@claude-viewer/shared";

export interface TranscriptInfo {
  path: string;
  projectPath: string;
  summary: string;
  lastModified: Date;
  createdDate: Date;
  size: number;
  messageCount: number;
  workingDirectory: string;
  repositoryName?: string;
}

async function findJsonlFiles(dir: string, baseDir: string): Promise<TranscriptInfo[]> {
  const files: TranscriptInfo[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subFiles = await findJsonlFiles(fullPath, baseDir);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith(".jsonl")) {
        try {
          const stats = await stat(fullPath);
          const content = await readFile(fullPath, "utf-8");
          const transcript = parseTranscript(content);

          // Parse JSONL content into messages to find last summary message
          const lines = content.trim().split("\n");
          const messages: any[] = [];

          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              messages.push(parsed);
            } catch {
              // Skip unparseable lines
            }
          }

          // Extract summary from the last summary message (same as viewer logic)
          const lastSummaryMessage = messages.filter((msg) => msg.type === "summary").pop();
          const summary =
            lastSummaryMessage?.summary ||
            transcript.metadata?.summary ||
            transcript.title ||
            "No summary available";

          // Extract working directory from the first message with cwd
          const firstMessageWithCwd = messages.find((msg) => msg.cwd);
          const workingDirectory = firstMessageWithCwd?.cwd || "Unknown";

          // Get repository name from git config
          const repositoryName = await getGitRepositoryName(workingDirectory);

          // Count messages (excluding system reminders and meta messages)
          const messageCount = messages.filter(
            (msg) => msg.type === "user" || msg.type === "assistant"
          ).length;

          files.push({
            path: fullPath,
            projectPath: relative(baseDir, fullPath),
            summary: summary.substring(0, 100), // Limit summary length
            lastModified: stats.mtime,
            createdDate: stats.birthtime || stats.mtime,
            size: stats.size,
            messageCount,
            workingDirectory,
            repositoryName,
          });
        } catch (error) {
          // Skip files that can't be read or parsed
          console.error(`Error processing ${fullPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return files;
}

export async function scanTranscripts(projectsDir: string): Promise<TranscriptInfo[]> {
  if (!existsSync(projectsDir)) {
    throw new Error(`Claude projects directory not found: ${projectsDir}`);
  }

  const transcripts = await findJsonlFiles(projectsDir, projectsDir);

  // Filter out transcripts with 0 messages and sort by date, newest first
  return transcripts
    .filter((transcript) => transcript.messageCount > 0)
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes ago`;
    }
    return `${hours} hours ago`;
  }
  if (days === 1) {
    return "Yesterday";
  }
  if (days < 7) {
    return `${days} days ago`;
  }
  return date.toLocaleDateString();
}

export function formatSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}mo`;
  if (weeks > 0) return `${weeks}w`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

async function getGitRepositoryName(workingDir: string): Promise<string | undefined> {
  try {
    const gitConfigPath = join(workingDir, ".git", "config");
    if (!existsSync(gitConfigPath)) {
      return undefined;
    }

    const configContent = await readFile(gitConfigPath, "utf-8");
    const remoteMatch = configContent.match(/url\s*=\s*(?:git@github\.com:|https:\/\/github\.com\/)([^\s\/]+)\/([^\s\/\.]+)(?:\.git)?/);
    
    if (remoteMatch) {
      return `${remoteMatch[1]}/${remoteMatch[2]}`;
    }

    const gitlabMatch = configContent.match(/url\s*=\s*(?:git@gitlab\.com:|https:\/\/gitlab\.com\/)([^\s\/]+)\/([^\s\/\.]+)(?:\.git)?/);
    if (gitlabMatch) {
      return `${gitlabMatch[1]}/${gitlabMatch[2]}`;
    }

    return undefined;
  } catch {
    return undefined;
  }
}
