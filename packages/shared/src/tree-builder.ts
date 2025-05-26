import type { ToolUse, TranscriptMessage } from "./types.js";

export interface LinearMessageNode {
  message: TranscriptMessage;
  toolResult?: Record<string, any>;
}

/**
 * Builds a linear message list with tool result linking
 */
export function buildLinearMessageList(messages: TranscriptMessage[]): LinearMessageNode[] {
  // Create a map to store tool results by tool_use_id
  const toolResultMap = new Map<string, any>();

  // First pass: collect all tool results from user messages
  for (const msg of messages) {
    if (msg.type === "user" && msg.message?.content && Array.isArray(msg.message.content)) {
      for (const item of msg.message.content) {
        if (item.type === "tool_result" && item.tool_use_id) {
          toolResultMap.set(item.tool_use_id, item.content);
        }
      }
    }
  }

  // Create nodes for all messages with tool result linking
  const nodes: LinearMessageNode[] = [];
  for (const msg of messages) {
    if ("uuid" in msg && msg.uuid) {
      const node: LinearMessageNode = {
        message: msg,
      };

      // If this is an assistant message, try to link tool results
      if (msg.type === "assistant" && msg.message?.content) {
        const toolUses = msg.message.content.filter(
          (item): item is ToolUse => item.type === "tool_use",
        );
        if (toolUses.length > 0) {
          // Look for matching tool results
          const toolResults: Record<string, any> = {};
          for (const toolUse of toolUses) {
            if (toolUse.id && toolResultMap.has(toolUse.id)) {
              toolResults[toolUse.id] = toolResultMap.get(toolUse.id);
            }
          }
          if (Object.keys(toolResults).length > 0) {
            node.toolResult = toolResults;
          }
        }
      }

      nodes.push(node);
    }
  }

  // Sort by timestamp for chronological order
  return nodes.sort((a, b) => {
    const timeA = "timestamp" in a.message ? a.message.timestamp : "";
    const timeB = "timestamp" in b.message ? b.message.timestamp : "";
    return timeA.localeCompare(timeB);
  });
}

