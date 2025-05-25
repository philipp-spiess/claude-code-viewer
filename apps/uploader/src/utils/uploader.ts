import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { v4 as uuidv4 } from "uuid";

export interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

const STORAGE_WORKER_URL = "https://claude-code-storage.remote.workers.dev";

export async function uploadTranscript(filePath: string, serverUrl: string): Promise<UploadResult> {
  try {
    // Read the file content
    const content = await readFile(filePath, "utf-8");
    const filename = basename(filePath);

    // Extract UUID from filename (format: [path/]UUID.jsonl) or generate new one
    const filenameMatch = filename.match(/([a-f0-9-]{36})\.jsonl$/);
    const id = filenameMatch ? filenameMatch[1] : uuidv4();

    // Parse JSONL to extract metadata
    const lines = content.trim().split("\n");
    let projectPath = "";
    let summary = "";

    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.type === "project_info" && data.project_path) {
          projectPath = data.project_path;
        }
        if (data.type === "summary" && data.content) {
          summary = data.content;
        }
      } catch (_e) {
        // Skip invalid JSON lines
      }
    }

    // Upload directly to storage worker
    const response = await fetch(`${STORAGE_WORKER_URL}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript: content,
        directory: projectPath || undefined,
        repo: summary || undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Storage worker responded with status ${response.status}: ${errorText}`);
    }

    return {
      success: true,
      message: "Upload successful",
      url: `${serverUrl}/${id}`,
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        message: "Cannot connect to storage service. Please check your internet connection.",
      };
    }

    return {
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
