import type { SessionInfo } from './SessionManager.js';

export interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

const STORAGE_WORKER_URL = "https://claude-code-storage.remote.workers.dev";

export async function uploadConversation(sessionInfo: SessionInfo, serverUrl: string): Promise<UploadResult> {
  try {
    // Prepare the upload data in the new JSON format
    const uploadData = {
      transcript: {
        id: sessionInfo.id,
        messages: sessionInfo.transcript.messages,
        messageCount: sessionInfo.transcript.messages.length
      },
      title: sessionInfo.summary,
      metadata: {
        uploadedAt: new Date().toISOString(),
        messageCount: sessionInfo.transcript.messages.length,
        lastModified: sessionInfo.lastModified.toISOString(),
        leafMessageId: sessionInfo.id
      }
    };

    // Upload to storage worker
    const response = await fetch(`${STORAGE_WORKER_URL}/${sessionInfo.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Storage worker responded with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: `Conversation "${sessionInfo.summary.slice(0, 50)}..." uploaded successfully`,
      url: `${serverUrl}/${sessionInfo.id}`,
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

// Legacy function for backward compatibility in case it's used elsewhere
export async function uploadTranscript(filePath: string, serverUrl: string): Promise<UploadResult> {
  return {
    success: false,
    message: "Legacy uploadTranscript is deprecated. Use uploadConversation instead.",
  };
}
