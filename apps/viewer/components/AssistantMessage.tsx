"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import ToolUse from "./ToolUse";

interface AssistantMessageProps {
  message: {
    content?: string | Array<{ type: string; text?: string; [key: string]: any }>;
    timestamp?: string;
    tool_uses?: any[];
  };
}

export default function AssistantMessage({ message }: AssistantMessageProps) {
  const [_expanded, _setExpanded] = useState(true);

  // Function to extract text and tool uses from content
  const extractContent = () => {
    const textParts: string[] = [];
    const toolUses: any[] = [];

    if (typeof message.content === "string") {
      textParts.push(message.content);
    } else if (Array.isArray(message.content)) {
      for (const item of message.content) {
        if (item.type === "text" && item.text) {
          textParts.push(item.text);
        } else if (item.type === "tool_use") {
          toolUses.push(item);
        }
      }
    }

    return { text: textParts.join(""), toolUses };
  };

  // Function to parse content and identify code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return (
            <CodeBlock key={index} code={code?.trim() || ""} language={language || "plaintext"} />
          );
        }
      }

      // Regular text
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part}
        </div>
      );
    });
  };

  return (
    <div className="py-2">
      {(() => {
        const { text, toolUses } = extractContent();
        return (
          <>
            {text && <div className="text-text leading-relaxed">{renderContent(text)}</div>}

            {/* Tool uses from content or from tool_uses property */}
            {(toolUses.length > 0 || (message.tool_uses && message.tool_uses.length > 0)) && (
              <div className="mt-2 space-y-2">
                {toolUses.map((toolUse, idx) => (
                  <ToolUse key={`content-${idx}`} toolUse={toolUse} />
                ))}
                {message.tool_uses?.map((toolUse, idx) => (
                  <ToolUse key={`prop-${idx}`} toolUse={toolUse} />
                ))}
              </div>
            )}
          </>
        );
      })()}
    </div>
  );
}
