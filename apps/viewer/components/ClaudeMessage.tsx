import type { MessageNode, TranscriptMessage } from "@claude-viewer/shared";
import { ToolUseDisplay } from "./ToolUse";

interface MessageProps {
  message: MessageNode;
  nextMessage?: TranscriptMessage;
  depth: number;
}

export default function ClaudeMessage({
  message: { message, toolResult },
  nextMessage,
  depth,
}: MessageProps) {

  const getRoleDisplay = () => {
    if (message.type === "user") {
      return { symbol: ">", color: "text-subtext-0" };
    }
    return { symbol: "⏺" };
  };

  // Get message content based on type
  const getMessageContent = () => {
    switch (message.type) {
      case "user":
        if (message.message?.content) {
          if (Array.isArray(message.message.content)) {
            return message.message.content
              .filter((c: any) => c.type === "text")
              .map((c: any) => c.text)
              .join("");
          }
          return message.message.content as string;
        }
        return "";

      case "assistant":
        if (message.message?.content) {
          if (Array.isArray(message.message.content)) {
            const textContent = message.message.content
              .filter((c: any) => c.type === "text")
              .map((c: any) => c.text)
              .join("");
            return textContent;
          }
          return message.message.content as string;
        }
        return "";

      case "summary":
        return message.summary || "";

      default:
        return JSON.stringify(message, null, 2);
    }
  };

  // Get tool uses from message
  const getToolUses = () => {
    const toolUses = [];

    if (
      message.type === "assistant" &&
      message.message?.content &&
      Array.isArray(message.message.content)
    ) {
      for (const item of message.message.content) {
        if (item.type === "tool_use") {
          toolUses.push(item);
        }
      }
    }

    if (message.type === "assistant" && (message.message as any)?.tool_uses) {
      toolUses.push(...(message.message as any).tool_uses);
    }

    return toolUses;
  };

  const content = getMessageContent();
  const toolUses = getToolUses();
  const hasContent = content || toolUses.length > 0;
  const roleDisplay = getRoleDisplay();
  const isUser = message.type === "user";

  // Don't render if no content and not a summary
  if (!hasContent && message.type !== "summary") return null;

  return (
    <div className="mb-[1lh]">
      {content && (
        <div className={`flex items-start gap-[1ch] ${isUser ? "text-subtext-0" : ""}`}>
          <span className={`${roleDisplay.color} select-none shrink-0`}>
            {roleDisplay.symbol}
          </span>

          <div className="flex-1 min-w-0">
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {content}
            </div>
          </div>
        </div>
      )}

      {toolUses.length > 0 &&
        toolUses.map((toolUse: any, idx: number) => (
          <div className="flex items-start gap-[1ch] mt-[1lh]" key={idx}>
            <span className={"text-green select-none shrink-0"}>⏺</span>
            <ToolUseDisplay
              key={idx}
              toolUse={toolUse}
              toolResult={toolResult?.[toolUse.id]}
              cwd={"cwd" in message ? message.cwd : undefined}
            />
          </div>
        ))}
    </div>
  );
}
