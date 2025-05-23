import { NextRequest, NextResponse } from 'next/server';

const STORAGE_WORKER_URL = 'https://claude-code-storage.remote.workers.dev';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch transcript from storage worker
    const response = await fetch(`${STORAGE_WORKER_URL}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Transcript not found' },
          { status: 404 }
        );
      }
      throw new Error(`Storage worker responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse JSONL content into structured messages
    const lines = data.transcript.trim().split('\n');
    const messages = [];
    
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        messages.push(parsed);
      } catch (e) {
        console.error('Failed to parse line:', line);
      }
    }
    
    return NextResponse.json({
      id,
      messages,
      projectPath: data.directory,
      summary: data.repo,
      uploadedAt: data.uploaded_at,
      messageCount: messages.length,
    });
    
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}