import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockR2Bucket = {
  get: vi.fn(),
  put: vi.fn(),
  list: vi.fn(),
};

const mockEnv = {
  TRANSCRIPTS_BUCKET: mockR2Bucket,
  DEBUG_PASSWORD: 'test-password',
} as any;

// Import the worker
import worker from './index.js';

describe('Storage Worker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /<id>', () => {
    it('should return transcript when it exists', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';
      const transcriptContent = '{"type":"message","content":"Hello"}\n{"type":"message","content":"World"}';

      mockR2Bucket.get.mockResolvedValue({
        text: () => Promise.resolve(transcriptContent),
      });

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe(transcriptContent);
      expect(response.headers.get('Content-Type')).toBe('application/jsonl');
      expect(mockR2Bucket.get).toHaveBeenCalledWith(transcriptId);
    });

    it('should return 404 when transcript does not exist', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';

      mockR2Bucket.get.mockResolvedValue(null);

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Transcript not found');
    });

    it('should return 400 for invalid UUID format', async () => {
      const request = new Request('https://test.com/invalid-id', {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid transcript ID format');
    });
  });

  describe('POST /<id>', () => {
    it('should save transcript with metadata', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';
      const uploadData = {
        directory: '/home/user/project',
        repo: 'my-repo',
        transcript: '{"type":"message","content":"Hello"}\n{"type":"message","content":"World"}',
      };

      mockR2Bucket.put.mockResolvedValue(undefined);

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(201);

      const responseData = await response.json() as {
        success: boolean;
        transcriptId: string;
        directory?: string;
        repo?: string;
        message: string;
      };
      expect(responseData).toEqual({
        success: true,
        transcriptId,
        directory: uploadData.directory,
        repo: uploadData.repo,
        message: 'Transcript saved successfully',
      });

      expect(mockR2Bucket.put).toHaveBeenCalledWith(
        transcriptId,
        uploadData.transcript,
        {
          customMetadata: expect.objectContaining({
            'uploaded-at': expect.any(String),
            'content-type': 'application/jsonl',
            'directory': uploadData.directory,
            'repo': uploadData.repo,
          }),
        }
      );
    });

    it('should save transcript without optional metadata', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';
      const uploadData = {
        transcript: '{"type":"message","content":"Hello"}',
      };

      mockR2Bucket.put.mockResolvedValue(undefined);

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(201);

      const responseData = await response.json() as {
        success: boolean;
        transcriptId: string;
        directory?: string;
        repo?: string;
        message: string;
      };
      expect(responseData.success).toBe(true);
      expect(responseData.directory).toBeUndefined();
      expect(responseData.repo).toBeUndefined();

      expect(mockR2Bucket.put).toHaveBeenCalledWith(
        transcriptId,
        uploadData.transcript,
        {
          customMetadata: {
            'uploaded-at': expect.any(String),
            'content-type': 'application/jsonl',
          },
        }
      );
    });

    it('should return 400 for wrong content type', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: 'invalid',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Content-Type must be application/json');
    });

    it('should return 400 for invalid JSON body', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid JSON body');
    });

    it('should return 400 for missing transcript field', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ directory: '/home/user' }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Missing required field: transcript');
    });

    it('should return 400 for invalid JSONL format', async () => {
      const transcriptId = '123e4567-e89b-12d3-a456-426614174000';

      const request = new Request(`https://test.com/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: 'invalid json line\n{"valid": "json"}',
        }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid JSONL format in transcript field');
    });
  });

  describe('GET /debug/list', () => {
    it('should return transcript list with correct password', async () => {
      const mockObjects = {
        objects: [
          { key: '123e4567-e89b-12d3-a456-426614174000' },
          { key: '987fcdeb-51d2-43a1-b456-426614174999' },
        ],
      };

      mockR2Bucket.list.mockResolvedValue(mockObjects);

      const request = new Request('https://test.com/debug/list?password=test-password', {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);

      const responseData = await response.json() as {
        transcripts: string[];
      };
      expect(responseData).toEqual({
        transcripts: ['123e4567-e89b-12d3-a456-426614174000', '987fcdeb-51d2-43a1-b456-426614174999'],
      });

      expect(mockR2Bucket.list).toHaveBeenCalled();
    });

    it('should return 401 for wrong password', async () => {
      const request = new Request('https://test.com/debug/list?password=wrong-password', {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(401);
      expect(await response.text()).toBe('Unauthorized');
      expect(mockR2Bucket.list).not.toHaveBeenCalled();
    });

    it('should return 401 for missing password', async () => {
      const request = new Request('https://test.com/debug/list', {
        method: 'GET',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(401);
      expect(await response.text()).toBe('Unauthorized');
    });
  });

  describe('OPTIONS requests', () => {
    it('should handle CORS preflight requests', async () => {
      const request = new Request('https://test.com/123e4567-e89b-12d3-a456-426614174000', {
        method: 'OPTIONS',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS');
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization');
    });
  });

  describe('Unsupported methods', () => {
    it('should return 405 for unsupported methods', async () => {
      const request = new Request('https://test.com/123e4567-e89b-12d3-a456-426614174000', {
        method: 'DELETE',
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(405);
      expect(await response.text()).toBe('Method not allowed');
    });
  });
});
