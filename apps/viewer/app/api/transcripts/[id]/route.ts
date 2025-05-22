import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { transcripts } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Fetch transcript from database
    const [transcript] = await db
      .select()
      .from(transcripts)
      .where(eq(transcripts.id, id))
      .limit(1);
    
    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript not found' },
        { status: 404 }
      );
    }
    
    // Parse JSONL content into structured messages
    const lines = transcript.content.trim().split('\n');
    const messages = [];
    
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        messages.push(data);
      } catch (e) {
        console.error('Failed to parse line:', line);
      }
    }
    
    return NextResponse.json({
      id: transcript.id,
      messages,
      projectPath: transcript.projectPath,
      summary: transcript.summary,
      uploadedAt: transcript.uploadedAt,
      messageCount: transcript.messageCount,
    });
    
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}