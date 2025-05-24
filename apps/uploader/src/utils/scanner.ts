import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { parseTranscript } from "@claude-viewer/shared";

export interface TranscriptInfo {
  path: string;
  projectPath: string;
  summary: string;
  lastModified: Date;
  size: number;
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

          // Extract summary from the transcript
          const summary =
            transcript.metadata?.summary || transcript.title || "No summary available";

          files.push({
            path: fullPath,
            projectPath: relative(baseDir, fullPath),
            summary: summary.substring(0, 100), // Limit summary length
            lastModified: stats.mtime,
            size: stats.size,
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

  // Sort by date, newest first
  return transcripts.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
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
