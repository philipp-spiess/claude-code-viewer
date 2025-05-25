import type { TranscriptMessage } from "@claude-viewer/shared";
import { buildMessageTree } from "@claude-viewer/shared";
import ClaudeMessage from "./ClaudeMessage";

interface TranscriptProps {
  messages: TranscriptMessage[];
}

export default function ClaudeTranscript({ messages }: TranscriptProps) {
  const messageTree = buildMessageTree(messages);

  console.log({ messageTree });

  return messageTree.map((message, idx) => <ClaudeMessage key={idx} message={message} />);
}
