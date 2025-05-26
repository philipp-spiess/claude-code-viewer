import type { TranscriptMessage } from "@claude-viewer/shared";
import { buildLinearMessageList } from "@claude-viewer/shared";
import ClaudeMessage from "./ClaudeMessage";

interface TranscriptProps {
  messages: TranscriptMessage[];
}

export default function ClaudeTranscript({ messages }: TranscriptProps) {
  const linearMessages = buildLinearMessageList(messages);

  return linearMessages.map((messageNode, idx) => {
    return (
      <ClaudeMessage 
        key={idx} 
        message={messageNode}
      />
    );
  });
}
