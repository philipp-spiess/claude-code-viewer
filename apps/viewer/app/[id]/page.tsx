'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MessageView from '@/components/MessageView';

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

export default function TranscriptViewer() {
  const params = useParams();
  const id = params.id as string;
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTranscript() {
      try {
        const response = await fetch(`/api/transcripts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transcript');
        }
        const data = await response.json();
        setTranscript(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchTranscript();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading transcript...</p>
        </div>
      </div>
    );
  }

  if (error || !transcript) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
            {error || 'Transcript not found'}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Claude Transcript
              </h1>
              {transcript.projectPath && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {transcript.projectPath}
                </p>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {transcript.messageCount} messages • {new Date(transcript.uploadedAt).toLocaleDateString()}
            </div>
          </div>
          {transcript.summary && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {transcript.summary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {transcript.messages.map((message, index) => (
            <MessageView key={index} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}