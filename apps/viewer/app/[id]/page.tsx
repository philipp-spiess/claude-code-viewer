import type { TranscriptMessage } from "@claude-viewer/shared";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ClaudeTranscript from "../../components/ClaudeTranscript";

export const runtime = "edge";

interface BackendResponse {
  transcript: {
    id: string;
    messages: TranscriptMessage[];
    messageCount: number;
  };
  title: string;
  metadata: {
    uploadedAt: string;
    messageCount: number;
    lastModified: string;
    leafMessageId: string;
    createdAt?: string;
  };
}

interface Transcript {
  id: string;
  messages: TranscriptMessage[];
  title: string;
  uploadedAt: string;
  messageCount: number;
  lastModified: string;
}

async function getTranscript(id: string): Promise<Transcript> {
  const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const data: BackendResponse = await response.json();

  return {
    id: data.transcript.id,
    messages: data.transcript.messages,
    title: data.title,
    uploadedAt: data.metadata.createdAt || data.metadata.uploadedAt,
    messageCount: data.transcript.messageCount,
    lastModified: data.metadata.lastModified,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const transcript = await getTranscript(id);
    return {
      title: `${transcript.title} - Claude Code Viewer`,
      description: `View Claude Code conversation: ${transcript.title}`,
    };
  } catch {
    return {
      title: "Conversation - Claude Code Viewer",
      description: "View Claude Code conversation",
    };
  }
}

export default async function TranscriptViewer({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { debug } = await searchParams;
  const transcript = await getTranscript(id);

  // Filter out summary messages from display
  const filteredMessages = transcript.messages.filter((msg) => msg.type !== "summary");

  return (
    <div className="min-h-screen bg-base font-mono">
      <div className="w-full max-w-[100ch] mx-auto relative pt-[0.5lh]">
        {debug && (
          <div
            className="absolute inset-0 min-h-screen pointer-events-none z-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(to right, rgba(135, 135, 135, 0.1) 0, rgba(135, 135, 135, 0.1) 1px, transparent 1px, transparent 1ch),
                repeating-linear-gradient(to bottom, rgba(135, 135, 135, 0.1) 0, rgba(135, 135, 135, 0.1) 1px, transparent 1px, transparent 1lh),
                linear-gradient(to right, transparent calc(100% - 1px), rgba(135, 135, 135, 0.1) calc(100% - 1px))
              `,
              backgroundSize: "1ch 1lh, 1ch 1lh, 100% 100%",
              backgroundPosition: "0 0, 0 0, 0 0",
            }}
          />
        )}
        <div className="py-[0.5lh] px-[1.5ch] mb-[0.5lh] mx-[0.5ch] outline-peach outline rounded relative z-10">
          <div className="font-bold flex justify-between items-center min-w-0">
            <Link href="https://github.com/philipp-spiess/claude-code-viewer" target="_blank" rel="noopener" className="flex-shrink-0 hover:underline"><span className="text-peach">✻⇡</span> Claude Code Viewer</Link>
            <span className="text-subtext-0 truncate ml-[3ch] font-normal min-w-0 flex-1">{transcript.title}</span>
          </div>
        </div>

        <div className="mt-[1.5lh] pb-[2lh] border-b border-surface-1">
          <ClaudeTranscript messages={filteredMessages} />
        </div>

        <footer className="mt-[1lh] text-subtext-0 flex gap-[3ch] justify-between">
          <span>
            <a
              href="https://github.com/philipp-spiess/claude-code-viewer"
              target="_blank"
              className="hover:underline text-text"
              rel="noopener"
            >
              View Source on GitHub
            </a>
          </span>
          <span>Made by 🤖 in 🇦🇹</span>
        </footer>
        <details className="mt-[1lh] text-subtext-0">
          <summary className="cursor-pointer">Debug View (Raw JSON)</summary>
          <pre className="text-xs text-subtext-0 overflow-auto max-w-full whitespace-pre-wrap">
            {JSON.stringify(transcript, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
