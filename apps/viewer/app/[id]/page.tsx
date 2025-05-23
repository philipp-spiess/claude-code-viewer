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
  params: { id: string };
}) {
  const transcript = await getTranscript(params.id);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                    Claude Transcript
                  </h1>
                  {transcript.projectPath && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transcript.projectPath}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {transcript.messages.length} messages
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(transcript.uploadedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
          {transcript.summary && (
            <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  {transcript.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6">
            <ClaudeTranscript messages={transcript.messages} />
          </div>
        </div>
      </div>
    </div>
  );
}
