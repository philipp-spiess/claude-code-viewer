import axios from 'axios';
import { readFile } from 'fs/promises';
import { basename } from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

const STORAGE_WORKER_URL = 'https://claude-code-storage.remote.workers.dev';

export async function uploadTranscript(
  filePath: string,
  serverUrl: string
): Promise<UploadResult> {
  try {
    // Read the file content
    const content = await readFile(filePath, 'utf-8');
    const filename = basename(filePath);

    // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
    const filenameMatch = filename.match(/transcript-([a-f0-9-]+)\.jsonl/);
    const id = filenameMatch ? filenameMatch[1] : uuidv4();
    
    // Parse JSONL to extract metadata
    const lines = content.trim().split('\n');
    let projectPath = '';
    let summary = '';
    
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.type === 'project_info' && data.project_path) {
          projectPath = data.project_path;
        }
        if (data.type === 'summary' && data.content) {
          summary = data.content;
        }
      } catch (e) {
        // Skip invalid JSON lines
      }
    }

    // Upload directly to storage worker
    await axios.post(
      `${STORAGE_WORKER_URL}/${id}`,
      {
        transcript: content,
        directory: projectPath || undefined,
        repo: summary || undefined,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    return {
      success: true,
      message: 'Upload successful',
      url: `${serverUrl}/${id}`
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        return {
          success: false,
          message: `Cannot connect to storage service. Please check your internet connection.`
        };
      }

      const message = error.response?.data?.message || error.message;
      return {
        success: false,
        message: `Upload failed: ${message}`
      };
    }

    return {
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
