import { describe, expect, it } from "vitest";
import { buildLinearMessageList } from "./tree-builder.js";
import type { TranscriptMessage } from "./types.js";

describe("buildLinearMessageList", () => {
  it("should build a linear message list with tool result linking", () => {
    const messages: TranscriptMessage[] = [
      {
        type: "user",
        uuid: "user-1",
        timestamp: "2025-05-25T11:09:49.920Z",
        message: {
          role: "user",
          content: "Hello, can you help me with a task?",
        },
      },
      {
        type: "assistant",
        uuid: "assistant-1", 
        timestamp: "2025-05-25T11:09:50.920Z",
        parentUuid: "user-1",
        message: {
          id: "msg-1",
          type: "message",
          role: "assistant",
          model: "claude-3-5-sonnet-20241022",
          content: [
            {
              type: "text",
              text: "I'll help you with that task."
            },
            {
              type: "tool_use",
              id: "tool-1",
              name: "bash",
              input: { command: "echo 'hello'" }
            }
          ],
          stop_reason: "tool_use",
          usage: {}
        }
      },
      {
        type: "user",
        uuid: "user-2",
        timestamp: "2025-05-25T11:09:51.920Z",
        parentUuid: "assistant-1",
        message: {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool-1",
              content: "hello"
            }
          ]
        }
      }
    ];

    const linearList = buildLinearMessageList(messages);
    
    expect(linearList).toHaveLength(3);
    expect(linearList[0]?.message.type).toBe("user");
    expect(linearList[1]?.message.type).toBe("assistant");
    expect(linearList[2]?.message.type).toBe("user");
    
    // Check tool result linking
    expect(linearList[1]?.toolResult).toBeDefined();
    expect(linearList[1]?.toolResult?.["tool-1"]).toBe("hello");
  });

  it("should sort messages chronologically", () => {
    const messages: TranscriptMessage[] = [
      {
        type: "user",
        uuid: "user-2",
        timestamp: "2025-05-25T11:09:51.920Z",
        message: {
          role: "user", 
          content: "Second message",
        },
      },
      {
        type: "user",
        uuid: "user-1",
        timestamp: "2025-05-25T11:09:49.920Z",
        message: {
          role: "user",
          content: "First message",
        },
      }
    ];

    const linearList = buildLinearMessageList(messages);
    
    expect(linearList[0]?.message).toHaveProperty("uuid", "user-1");
    expect(linearList[1]?.message).toHaveProperty("uuid", "user-2");
  });
});