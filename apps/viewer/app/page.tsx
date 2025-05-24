import Link from "next/link";

export default function Home() {
  return (
    <div className="py-[1lh]">
      <div className="max-w-[120ch] mx-auto">
        <div className="mb-[1lh]">
          <h1 className="font-bold mb-[0.5lh]">
            <span className="text-peach">✻⇡</span> CLAUDE-CODE-UPLOADER(1)
          </h1>
          <div className="border-b border-surface-1 mb-[0.5lh]" />
        </div>

        <div className="space-y-[1lh]">
          <section>
            <h2 className="font-bold">NAME</h2>
            <p className="ml-[7ch]">Claude Code Uploader</p>
          </section>

          <section>
            <h2 className="font-bold">SYNOPSIS</h2>
            <p className="ml-[7ch] font-bold text-peach">npx claude-code-uploader</p>
          </section>

          <section>
            <h2 className="font-bold">DESCRIPTION</h2>
            <div className="ml-[7ch] space-y-[1lh]">
              <p>
                The <span className="font-bold">npx claude-code-uploader</span> utility scans your
                local Claude Code project directories for transcript files and uploads them to a
                web-based viewer.
              </p>
              <p>
                It automatically discovers transcript files in{" "}
                <span className="text-cyan-400">~/.claude/projects/</span> and provides an
                interactive interface for selecting and uploading transcripts.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bold">USAGE</h2>
            <div className="ml-[7ch] space-y-4">
              <div>
                <p className="font-bold">$ npx claude-code-uploader</p>
                <div className="text-subtext-0 mt-[1lh]">
                  <p>? Select a transcript to upload: (Use arrow keys)</p>
                  <p className="mt-[1lh]">❯ project-alpha/transcript-2024-01-15.jsonl</p>
                  <p className="ml-[2ch]">project-beta/transcript-2024-01-14.jsonl</p>
                  <p className="ml-[2ch]">project-gamma/transcript-2024-01-13.jsonl</p>
                </div>
              </div>
              <div>
                <p className="text-subtext-0">✓ Uploaded transcript successfully!</p>
                <p className="mt-[1lh]">
                  <span className="text-subtext-0">View at:</span>{" "}
                  <Link href="/15831a8e-aade-42be-a0b3-1397e06afdca" className="hover:underline">
                    https://claude-code-viewer.vercel.app/abcd1234
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bold">FILES</h2>
            <div className="ml-[7ch]">
              <p>
                <span className="text-subtext-0">~/.claude/projects/</span>
              </p>
              <p className="ml-[7ch]">
                Default directory where Claude Code stores project transcripts
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bold">EXIT STATUS</h2>
            <div className="ml-[7ch] space-y-1">
              <p>
                <span className="text-subtext-0">0</span> Successful upload
              </p>
              <p>
                <span className="text-subtext-0">1</span> Upload failed or user cancelled
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bold">EXAMPLES</h2>
            <div className="ml-[7ch]">
              <p>Upload a transcript interactively:</p>
              <p className="ml-[7ch] text-peach">$ npx claude-code-uploader</p>
            </div>
          </section>

          <section>
            <h2 className="font-bold">SEE ALSO</h2>
            <div className="ml-[7ch]">
              <p>
                <Link
                  className="hover:underline"
                  href="https://docs.anthropic.com/en/docs/claude-code/overview"
                >
                  claude
                </Link>
                (1)
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center text-subtext-0">
          <p>Claude Code Uploader</p>
        </div>
      </div>
    </div>
  );
}
