import ClaudeMessage from './ClaudeMessage'
import { buildMessageTree, flattenMessageTree } from '@claude-viewer/shared'
import type { TranscriptMessage } from '@claude-viewer/shared'

interface TranscriptProps {
  messages: TranscriptMessage[]
}

export default function ClaudeTranscript({ messages }: TranscriptProps) {
  // Build the tree structure
  const messageTree = buildMessageTree(messages)

  // Flatten for linear rendering while preserving tree info
  const flatMessages = flattenMessageTree(messageTree)

  return (
    <div>
      {flatMessages.map((nodeWithDepth, idx) => (
        <ClaudeMessage
          key={idx}
          message={nodeWithDepth.message}
          toolResults={nodeWithDepth.toolResult}
        />
      ))}
    </div>
  )
}
