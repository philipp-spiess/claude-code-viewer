import axios from 'axios';
import { readFile } from 'fs/promises';
import { basename } from 'path';

export interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

export async function uploadTranscript(
  filePath: string,
  serverUrl: string
): Promise<UploadResult> {
  try {
    // Read the file content
    const content = await readFile(filePath, 'utf-8');
    const filename = basename(filePath);

    // Create FormData using native Node.js FormData (available in Node 18+)
    const formData = new FormData();
    const blob = new Blob([content], { type: 'application/jsonl' });
    formData.append('file', blob, filename);

    // Upload to server
    const response = await axios.post(
      `${serverUrl}/api/transcripts`,
      formData,
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    return {
      success: true,
      message: 'Upload successful',
      url: response.data.id ? `${serverUrl}/${response.data.id}` : `${serverUrl}/viewer`
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        return {
          success: false,
          message: `Cannot connect to server at ${serverUrl}. Make sure the viewer server is running.`
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
