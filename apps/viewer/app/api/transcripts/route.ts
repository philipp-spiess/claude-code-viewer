import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_WORKER_URL = 'https://claude-code-storage.remote.workers.dev';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();
    
    // Extract UUID from filename (format: transcript-[UUID].jsonl)
    const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\.jsonl/);
    const id = filenameMatch ? filenameMatch[1] : uuidv4();
    
    // Parse JSONL to count messages and extract info
    const lines = content.trim().split('\n');
    let messageCount = 0;
    let projectPath = '';
    let summary = '';
    
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.type === 'human_turn' || data.type === 'ai_turn') {
          messageCount++;
        }
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
    
    // Send to storage worker
    const response = await fetch(`${STORAGE_WORKER_URL}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: content,
        directory: projectPath || undefined,
        repo: summary || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`Storage worker responded with status ${response.status}`);
    }
    
    return NextResponse.json({
      id,
      message: 'Transcript uploaded successfully',
      messageCount,
      projectPath,
    });
    
  } catch (error) {
    console.error('Error uploading transcript:', error);
    return NextResponse.json(
      { error: 'Failed to upload transcript' },
      { status: 500 }
    );
  }
}