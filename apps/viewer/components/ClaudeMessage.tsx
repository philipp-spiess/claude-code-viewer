"use client";

import type { TranscriptMessage } from "@claude-viewer/shared";
import { useState } from "react";

interface MessageProps {
  message: TranscriptMessage;
  toolResults?: Record<string, any>;
}

export default function ClaudeMessage({ message, toolResults }: MessageProps) {
  // Get role display and styling
  const getRoleDisplay = () => {
    if (message.type === "user") {
      return { symbol: ">", color: "text-subtext-0" };
    }
    return { symbol: "⏺", color: "text-purple-600 dark:text-purple-400" };
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

  if (!hasContent && message.type !== "summary") return null;

  return (
    <div className="mb-[1lh]">
      <div className={`flex items-start gap-[1ch] ${isUser ? "text-subtext-0" : ""}`}>
        <span className={`${roleDisplay.color} select-none shrink-0`}>{roleDisplay.symbol}</span>

        <div className="flex-1 min-w-0">
          {/* Main content */}
          {content && (
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {content}
            </div>
          )}
        </div>
      </div>

      {toolUses.length > 0 && (
        <div className="flex items-start gap-[1ch] mt-[1lh]">
          <span className={"text-green select-none shrink-0"}>⏺</span>
          {toolUses.map((toolUse: any, idx: number) => (
            <ToolUseDisplay
              key={idx}
              toolUse={toolUse}
              toolResult={toolResults?.[toolUse.id]}
              cwd={"cwd" in message ? message.cwd : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ToolUseDisplay({
  toolUse,
  toolResult,
  cwd,
}: { toolUse: any; toolResult?: any; cwd?: string }) {
  const toolName = toolUse.name || toolUse.tool_name || "Unknown Tool";

  // Use ReadTool for Read tool type
  if (toolName.toLowerCase() === "read") {
    const toolUseWithResult = {
      ...toolUse,
      result: toolResult,
      output: toolResult,
    };
    return <ReadTool toolUse={toolUseWithResult} cwd={cwd} />;
  }

  // Default tool display for other tools
  const [expanded, setExpanded] = useState(false);
  const input = toolUse.input || toolUse.parameters || {};

  // Format tool name with parameters
  const getToolDisplay = () => {
    const params: string[] = [];
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        if (typeof value === "string" && value.length < 50) {
          params.push(`${key}: "${value}"`);
        } else if (typeof value === "number" || typeof value === "boolean") {
          params.push(`${key}: ${value}`);
        }
      }
    }

    return `${toolName}(${params.join(", ")})${expanded ? "" : "…"}`;
  };

  // Count lines in input
  const getLineCount = () => {
    const jsonStr = JSON.stringify(input, null, 2);
    return jsonStr.split("\n").length;
  };

  const lineCount = getLineCount();
  return (
    <div className="">
      <button
        type="button"
        className="text-purple-700 dark:text-purple-300 font-medium flex items-center gap-2 cursor-pointer hover:text-purple-900 dark:hover:text-purple-100"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-mono">{getToolDisplay()}</span>
      </button>

      {expanded && (
        <div className="mt-2 ml-6">
          <div className="text-purple-600 dark:text-purple-400">⎿</div>

          {/* Tool Input */}
          <div className="ml-4 mt-1">
            <div className="text-xs text-purple-500 dark:text-purple-400 mb-1">Input:</div>
            <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-300 rounded-md overflow-x-auto text-xs font-mono">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>

          {/* Tool Result */}
          {toolResult && (
            <div className="ml-4 mt-3">
              <div className="text-xs text-green-500 dark:text-green-400 mb-1">Result:</div>
              <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-green-300 rounded-md overflow-x-auto text-xs font-mono">
                {typeof toolResult === "string" ? toolResult : JSON.stringify(toolResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="ml-4 text-xs text-purple-500 dark:text-purple-400 mt-2">
            (Click to collapse)
          </div>
        </div>
      )}

      {!expanded && (
        <div className="ml-8 text-xs text-purple-500 dark:text-purple-400 mt-1">
          ⎿ … +{lineCount} lines{toolResult ? " + result" : ""} (Click to expand)
        </div>
      )}
    </div>
  );
}

interface ReadToolProps {
  toolUse: {
    tool_name?: string;
    name?: string;
    parameters?: any;
    input?: any;
    result?: any;
    output?: any;
    error?: any;
    id?: string;
  };
  cwd?: string;
}
function ReadTool({ toolUse, cwd }: ReadToolProps) {
  const [expanded, setExpanded] = useState(false);

  // Get the file path from input
  const filePath = toolUse.input?.file_path || toolUse.parameters?.file_path || "";

  // Convert absolute path to relative path
  const getRelativePath = (absolutePath: string, workingDir?: string) => {
    if (!workingDir || !absolutePath.startsWith(workingDir)) {
      return absolutePath;
    }
    const relativePath = absolutePath.slice(workingDir.length);
    return relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  };

  const relativePath = getRelativePath(filePath, cwd);

  const toolResult = toolUse.result || toolUse.output;
  const lineCount = toolResult?.split("\n").length + 1 || 0;

  return (
    <div className="">
      <button
        type="button"
        className="flex flex-col text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          Read({relativePath || "file"}){expanded ? "" : "…"}
        </span>
        {!expanded && (
          <span>
            ⎿ Read {lineCount} lines <span className="text-subtext-0">(Click to expand)</span>
          </span>
        )}
      </button>

      {expanded && (
        <div className="flex gap-[1ch]">
          <div className="text-purple-600 dark:text-purple-400">⎿</div>
          <pre className=" text-subtext-0 overflow-auto">{toolResult}</pre>
        </div>
      )}
    </div>
  );
}
