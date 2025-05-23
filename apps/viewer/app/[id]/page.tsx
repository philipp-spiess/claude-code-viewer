import { notFound } from 'next/navigation';
import ClaudeTranscript from '../../components/ClaudeTranscript';

interface Message {
  type: string;
  timestamp?: string;
  content?: string;
  tool_use?: any;
  result?: any;
  [key: string]: any;
}

interface Transcript {
  id: string;
  messages: Message[];
  projectPath?: string;
  summary?: string;
  uploadedAt: string;
  messageCount?: number;
}

async function getTranscript(id: string): Promise<Transcript> {
  const response = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/transcripts/${id}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function TranscriptViewer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transcript = await getTranscript(id);

  // Extract summary from the last summary message
  const lastSummaryMessage = transcript.messages
    .filter(msg => msg.type === 'summary')
    .pop();
  const summary = lastSummaryMessage?.summary;

  // Filter out summary messages from display
  const filteredMessages = transcript.messages.filter(msg => msg.type !== 'summary');

  return (
    <div className="min-h-screen bg-base font-mono">
      {/* Header */}
      <div className="w-full max-w-[120ch] mx-auto px-4 py-3">
        <div className="text-text">
          <div>Claude Code Viewer</div>
          {summary && (
            <div className="text-subtext-1 mt-1">
              {summary}
            </div>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="w-full max-w-[120ch] mx-auto px-4 py-4">
        <ClaudeTranscript messages={filteredMessages} />
        
        {/* Debug View */}
        <details className="mt-8 border border-surface-1 rounded">
          <summary className="cursor-pointer p-3 bg-surface-0 hover:bg-surface-1 transition-colors text-subtext-1">
            Debug View (Raw JSON)
          </summary>
          <div className="p-3 bg-base border-t border-surface-1">
            <pre className="text-xs text-subtext-0 overflow-auto max-h-96">
              {JSON.stringify(transcript, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
