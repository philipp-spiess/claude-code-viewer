import { beforeEach, describe, expect, it, vi } from "vitest";

const mockR2Bucket = {
  get: vi.fn(),
  put: vi.fn(),
  list: vi.fn(),
};

const mockEnv = {
  TRANSCRIPTS_BUCKET: mockR2Bucket,
  DEBUG_PASSWORD: "test-password",
} as any;

// Import the worker
import worker from "./index.js";

describe("Storage Worker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /<id>", () => {
    it("should return transcript when it exists", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";
      const storedData = JSON.stringify({
        transcript: {
          id: transcriptId,
          messages: [
            { type: "user", content: "Hello" },
            { type: "assistant", content: "World" }
          ],
          messageCount: 2
        },
        title: "Test Conversation",
        metadata: {
          uploadedAt: "2023-01-01T00:00:00.000Z",
          messageCount: 2,
          lastModified: "2023-01-01T00:00:00.000Z",
          leafMessageId: transcriptId
        }
      });

      mockR2Bucket.get.mockResolvedValue({
        text: () => Promise.resolve(storedData),
        customMetadata: {
          "uploaded-at": "2023-01-01T00:00:00.000Z",
          "title": "Test Conversation"
        }
      });

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData.transcript.id).toBe(transcriptId);
      expect(responseData.title).toBe("Test Conversation");
      expect(responseData.metadata.messageCount).toBe(2);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(mockR2Bucket.get).toHaveBeenCalledWith(transcriptId);
    });

    it("should return 404 when transcript does not exist", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";

      mockR2Bucket.get.mockResolvedValue(null);

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Transcript not found");
    });

    it("should return 400 for invalid UUID format", async () => {
      const request = new Request("https://test.com/invalid-id", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Invalid transcript ID format");
    });
  });

  describe("POST /<id>", () => {
    it("should save conversation with metadata", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";
      const uploadData = {
        transcript: {
          id: transcriptId,
          messages: [
            { type: "user", content: "Hello" },
            { type: "assistant", content: "World" }
          ],
          messageCount: 2
        },
        title: "Test Conversation",
        metadata: {
          uploadedAt: "2023-01-01T00:00:00.000Z",
          messageCount: 2,
          lastModified: "2023-01-01T00:00:00.000Z",
          leafMessageId: transcriptId
        }
      };

      mockR2Bucket.put.mockResolvedValue(undefined);

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(201);

      const responseData = await response.json();
      expect(responseData).toEqual({
        success: true,
        transcriptId,
        title: "Test Conversation",
        messageCount: 2,
        message: "Conversation saved successfully",
      });

      expect(mockR2Bucket.put).toHaveBeenCalledWith(transcriptId, JSON.stringify(uploadData), {
        customMetadata: expect.objectContaining({
          "uploaded-at": expect.any(String),
          "content-type": "application/json",
          "v": "2",
          "title": "Test Conversation",
          "message-count": "2",
          "leaf-message-id": transcriptId,
          "last-modified": "2023-01-01T00:00:00.000Z",
        }),
      });
    });

    it("should return 400 for missing required fields", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";
      const uploadData = {
        transcript: { id: transcriptId, messages: [], messageCount: 0 },
        // Missing title and metadata
      };

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Missing required fields: transcript, title, metadata");
    });

    it("should return 400 for wrong content type", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: "invalid",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Content-Type must be application/json");
    });

    it("should return 400 for invalid JSON body", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "invalid json",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Invalid JSON body");
    });

    it("should return 400 for missing title field", async () => {
      const transcriptId = "123e4567-e89b-12d3-a456-426614174000";

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          transcript: { id: transcriptId, messages: [], messageCount: 0 },
          metadata: { uploadedAt: "2023-01-01T00:00:00.000Z", messageCount: 0, lastModified: "2023-01-01T00:00:00.000Z", leafMessageId: transcriptId }
        }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Missing required fields: transcript, title, metadata");
    });
  });

  describe("GET /debug/list", () => {
    it("should return transcript list with correct password", async () => {
      const mockObjects = {
        objects: [
          { 
            key: "123e4567-e89b-12d3-a456-426614174000",
            customMetadata: {
              title: "Test Conversation 1",
              "message-count": "5",
              "uploaded-at": "2023-01-01T00:00:00.000Z",
              "leaf-message-id": "123e4567-e89b-12d3-a456-426614174000",
              "last-modified": "2023-01-01T00:00:00.000Z"
            }
          },
          { 
            key: "987fcdeb-51d2-43a1-b456-426614174999",
            customMetadata: {
              title: "Test Conversation 2",
              "message-count": "3",
              "uploaded-at": "2023-01-02T00:00:00.000Z",
              "leaf-message-id": "987fcdeb-51d2-43a1-b456-426614174999",
              "last-modified": "2023-01-02T00:00:00.000Z"
            }
          },
        ],
      };

      mockR2Bucket.list.mockResolvedValue(mockObjects);

      const request = new Request("https://test.com/debug/list?password=test-password", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);

      const responseData = await response.json();
      expect(responseData.transcripts).toHaveLength(2);
      expect(responseData.transcripts[0]).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Test Conversation 1",
        uploadedAt: "2023-01-01T00:00:00.000Z",
        messageCount: 5,
        leafMessageId: "123e4567-e89b-12d3-a456-426614174000",
        lastModified: "2023-01-01T00:00:00.000Z"
      });

      expect(mockR2Bucket.list).toHaveBeenCalled();
    });

    it("should return 401 for wrong password", async () => {
      const request = new Request("https://test.com/debug/list?password=wrong-password", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(401);
      expect(await response.text()).toBe("Unauthorized");
      expect(mockR2Bucket.list).not.toHaveBeenCalled();
    });

    it("should return 401 for missing password", async () => {
      const request = new Request("https://test.com/debug/list", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(401);
      expect(await response.text()).toBe("Unauthorized");
    });
  });

  describe("OPTIONS requests", () => {
    it("should handle CORS preflight requests", async () => {
      const request = new Request("https://test.com/123e4567-e89b-12d3-a456-426614174000", {
        method: "OPTIONS",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );
    });
  });

  describe("Unsupported methods", () => {
    it("should return 405 for unsupported methods", async () => {
      const request = new Request("https://test.com/123e4567-e89b-12d3-a456-426614174000", {
        method: "DELETE",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(405);
      expect(await response.text()).toBe("Method not allowed");
    });
  });
});
