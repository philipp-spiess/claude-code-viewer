"use client";

import { useState } from "react";

export function ToolUseDisplay({
  toolUse,
  toolResult,
  cwd,
}: {
  toolUse: any;
  toolResult?: any;
  cwd?: string;
}) {
  const toolName = toolUse.name || toolUse.tool_name || "Unknown Tool";

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

  // Use ReadTool for Read tool type
  if (toolName.toLowerCase() === "read") {
    const toolUseWithResult = {
      ...toolUse,
      result: toolResult,
      output: toolResult,
    };
    return <ReadTool toolUse={toolUseWithResult} cwd={cwd} />;
  }

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
