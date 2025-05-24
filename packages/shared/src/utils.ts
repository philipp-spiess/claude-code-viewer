/**
 * Converts a sanitized folder name back to a file path
 * e.g., "-home-philipp-dev-thgt" -> "/home/philipp/dev/thgt"
 */
export function parseProjectPath(folderName: string): string {
  // Replace hyphens with slashes, but preserve the leading slash
  return folderName.replace(/-/g, "/");
}

/**
 * Extracts a summary from the first few lines of a JSONL conversation file
 * Looks for the thread summary in the metadata
 */
export function extractSummary(jsonlContent: string): string {
  try {
    const lines = jsonlContent.split("\n").filter((line) => line.trim());

    // Parse first few lines to find metadata
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      try {
        const data = JSON.parse(lines[i]!);

        // Check for thread summary in metadata
        if (data.metadata?.thread_summary) {
          return data.metadata.thread_summary;
        }

        // Check for summary in other common locations
        if (data.summary) {
          return data.summary;
        }

        // If it's a user message, use the first part as summary
        if (data.type === "human_turn" && data.content) {
          const content = Array.isArray(data.content) ? data.content[0]?.text || "" : data.content;
          return content.slice(0, 100) + (content.length > 100 ? "..." : "");
        }
      } catch {}
    }

    return "Untitled conversation";
  } catch {
    return "Untitled conversation";
  }
}

/**
 * Parse a Claude transcript JSONL file and extract metadata
 */
export interface TranscriptMetadata {
  summary: string;
  title?: string;
  metadata?: any;
}

export function parseTranscript(jsonlContent: string): TranscriptMetadata {
  const summary = extractSummary(jsonlContent);
  let title: string | undefined;
  let metadata: any;

  try {
    const lines = jsonlContent.split("\n").filter((line) => line.trim());

    // Try to find title and metadata in the first few lines
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      try {
        const data = JSON.parse(lines[i]!);

        if (data.title && !title) {
          title = data.title;
        }

        if (data.metadata && !metadata) {
          metadata = data.metadata;
        }

        // If we found both, we can stop
        if (title && metadata) {
          break;
        }
      } catch {}
    }
  } catch {
    // Ignore parsing errors
  }

  return {
    summary,
    title,
    metadata,
  };
}
