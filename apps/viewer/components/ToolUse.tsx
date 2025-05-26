"use client";

import { useState } from "react";

// Format MCP tool names: mcp__playwright__function_name -> playwright:function_name
const formatToolName = (name: string) => {
  const mcpMatch = name.match(/^mcp__([^_]+)__(.+)$/);
  if (mcpMatch) {
    const [, serverName, functionName] = mcpMatch;
    return (
      <>
        <span className="text-subtext-0">{serverName}:</span>{functionName}
      </>
    );
  }
  return name;
};

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


    return (
      <>
        {formatToolName(toolName)}({params.join(", ")}){expanded ? "" : "…"}
      </>
    );
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

  // Use ScreenshotTool for Playwright screenshot tool
  if (toolName === "mcp__playwright__browser_take_screenshot") {
    return <ScreenshotTool toolUse={toolUse} toolResult={toolResult} />;
  }

  return (
    <div>
      <button
        type="button"
        className="flex flex-col text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{getToolDisplay()}</span>
        {!expanded && (
          <span>
            ⎿ Returned {lineCount} JSON lines{" "}
            <span className="text-subtext-0">(Click to expand)</span>
          </span>
        )}
      </button>
      {expanded && (
        <div className="flex gap-[1ch]">
          <div className="text-purple-600 dark:text-purple-400">⎿</div>
          <pre className="text-subtext-0">
            {`Input\n=====\n\n${JSON.stringify(input, null, 2)}\n\nOutput:\n=======\n\n${
              typeof toolResult === "string" ? toolResult : JSON.stringify(toolResult, null, 2)
            }`}
          </pre>
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
    <div>
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
          <pre className=" text-subtext-0 max-w-full whitespace-pre-wrap">{toolResult}</pre>
        </div>
      )}
    </div>
  );
}

interface ScreenshotToolProps {
  toolUse: {
    tool_name?: string;
    name?: string;
    parameters?: any;
    input?: any;
  };
  toolResult: any;
}

function ScreenshotTool({ toolUse, toolResult }: ScreenshotToolProps) {
  const [isLarge, setIsLarge] = useState(false);
  const input = toolUse.input || toolUse.parameters || {};
  const toolName = toolUse.name || toolUse.tool_name || "Unknown Tool";

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

    return (
      <>
        {formatToolName(toolName)}({params.join(", ")})
      </>
    );
  };

  // Check if the result contains image data
  const hasImageData = toolResult && Array.isArray(toolResult) && 
    toolResult.some((item: any) => item.type === "image" && item.source?.data);

  const getImageData = () => {
    if (!hasImageData) return null;
    const imageItem = toolResult.find((item: any) => item.type === "image");
    return imageItem?.source?.data;
  };

  const imageData = getImageData();

  return (
    <div>
      <span>{getToolDisplay()}</span>
      <div className="flex gap-[1ch]">
        <div className="text-purple-600 dark:text-purple-400">⎿</div>
        <div className="flex flex-col gap-4">
          {imageData && (
            <div className="max-w-full">
              <img 
                src={`data:image/jpeg;base64,${imageData}`}
                alt="Screenshot"
                className={`h-auto object-contain cursor-pointer transition-all duration-200 ${
                  isLarge 
                    ? "w-full" 
                    : "max-w-full max-h-[20lh]"
                }`}
                onClick={() => setIsLarge(!isLarge)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
