import { notFound } from 'next/navigation'
import ClaudeTranscript from '../../components/ClaudeTranscript'
import type { TranscriptMessage } from '@claude-viewer/shared'

interface Transcript {
  id: string
  messages: TranscriptMessage[]
  projectPath?: string
  summary?: string
  uploadedAt: string
  messageCount?: number
}

async function getTranscript(id: string): Promise<Transcript> {
  const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    notFound()
  }

  const data = await response.json()

  // Parse JSONL content into structured messages
  const lines = data.transcript.trim().split('\n')
  const messages: TranscriptMessage[] = []

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line)
      messages.push(parsed)
    } catch (e) {
      console.error('Failed to parse line:', line)
    }
  }

  return {
    id,
    messages,
    projectPath: data.directory,
    summary: data.repo,
    uploadedAt: data.uploaded_at,
    messageCount: messages.length,
  }
}

export default async function TranscriptViewer({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { debug } = await searchParams
  const transcript = await getTranscript(id)

  // Extract summary from the last summary message
  const lastSummaryMessage = transcript.messages.filter((msg) => msg.type === 'summary').pop()
  const summary = lastSummaryMessage?.summary

  // Filter out summary messages from display
  const filteredMessages = transcript.messages.filter((msg) => msg.type !== 'summary')

  return (
    <div className="min-h-screen bg-base font-mono">
      <div className="w-full max-w-[120ch] mx-auto relative pt-[0.5lh]">
        {debug && (
          <div
            className="absolute inset-0 min-h-screen pointer-events-none z-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(to right, rgba(135, 135, 135, 0.1) 0, rgba(135, 135, 135, 0.1) 1px, transparent 1px, transparent 1ch),
                repeating-linear-gradient(to bottom, rgba(135, 135, 135, 0.1) 0, rgba(135, 135, 135, 0.1) 1px, transparent 1px, transparent 1lh),
                linear-gradient(to right, transparent calc(100% - 1px), rgba(135, 135, 135, 0.1) calc(100% - 1px))
              `,
              backgroundSize: '1ch 1lh, 1ch 1lh, 100% 100%',
              backgroundPosition: '0 0, 0 0, 0 0',
            }}
          />
        )}
        <div className="py-[0.5lh] px-[1.5ch] mb-[0.5lh] mx-[0.5ch] outline-peach outline rounded relative z-10">
          <div className="font-bold">
            <span className="text-peach">✻⇡</span> Claude Code Viewer
          </div>
          {summary && <div className="text-subtext-0 ml-[3ch] mt-[1lh]">{summary}</div>}
        </div>

        <div className="mt-[2lh] relative z-10">
          <ClaudeTranscript messages={filteredMessages} />

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
    </div>
  )
}
