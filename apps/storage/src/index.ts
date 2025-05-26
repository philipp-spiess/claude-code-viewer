interface Env {
  TRANSCRIPTS_BUCKET: R2Bucket;
  DEBUG_PASSWORD: string;
}

interface UploadRequest {
  transcript: {
    id: string;
    messages: any[];
    messageCount: number;
  };
  title: string;
  metadata: {
    uploadedAt: string;
    messageCount: number;
    lastModified: string;
    leafMessageId: string;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Debug endpoint to list all transcripts
      if (path === "/debug/list" && request.method === "GET") {
        const password = url.searchParams.get("password");
        if (!password || password !== env.DEBUG_PASSWORD) {
          return new Response("Unauthorized", {
            status: 401,
            headers: corsHeaders,
          });
        }

        const objects = await env.TRANSCRIPTS_BUCKET.list();
        const transcripts = objects.objects.map((obj) => ({
          id: obj.key,
          title: obj.customMetadata?.title || 'Unknown',
          uploadedAt: obj.customMetadata?.['uploaded-at'] || obj.uploaded?.toISOString(),
          messageCount: obj.customMetadata?.['message-count'] ? parseInt(obj.customMetadata['message-count']) : 0,
          leafMessageId: obj.customMetadata?.['leaf-message-id'],
          lastModified: obj.customMetadata?.['last-modified']
        }));

        return new Response(JSON.stringify({ transcripts }), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      // Extract ID from path (format: /<id>)
      const idMatch = path.match(/^\/([a-f0-9-]{36})$/);
      if (!idMatch) {
        return new Response("Invalid transcript ID format", {
          status: 400,
          headers: corsHeaders,
        });
      }

      const transcriptId = idMatch[1];

      // GET /<id> - Retrieve transcript
      if (request.method === "GET") {
        const object = await env.TRANSCRIPTS_BUCKET.get(transcriptId);

        if (!object) {
          return new Response("Transcript not found", {
            status: 404,
            headers: corsHeaders,
          });
        }

        const content = await object.text();

        // Build metadata from custom metadata
        const meta: Record<string, any> = {};
        if (object.customMetadata) {
          for (const [key, value] of Object.entries(object.customMetadata)) {
            meta[key] = value;
          }
        }

        // Add creation date from uploaded-at metadata or object uploaded timestamp
        if (meta["uploaded-at"]) {
          meta.createdAt = meta["uploaded-at"];
        } else if (object.uploaded) {
          meta.createdAt = object.uploaded.toISOString();
        }

        // Parse stored JSON format
        let response;
        try {
          const parsedContent = JSON.parse(content);
          response = {
            transcript: parsedContent.transcript,
            title: parsedContent.title,
            metadata: {
              ...parsedContent.metadata,
              createdAt: meta.createdAt
            }
          };
        } catch (error) {
          return new Response("Stored data is not valid JSON", {
            status: 500,
            headers: corsHeaders,
          });
        }

        return new Response(JSON.stringify(response), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      // POST /<id> - Create/update transcript
      if (request.method === "POST") {
        const contentType = request.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          return new Response("Content-Type must be application/json", {
            status: 400,
            headers: corsHeaders,
          });
        }

        let uploadData: UploadRequest;
        try {
          uploadData = await request.json();
        } catch {
          return new Response("Invalid JSON body", {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Validate required fields
        if (!uploadData.transcript || !uploadData.title || !uploadData.metadata) {
          return new Response("Missing required fields: transcript, title, metadata", {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Store the entire structured data as JSON
        const content = JSON.stringify(uploadData);
        
        const metadata: Record<string, string> = {
          "uploaded-at": new Date().toISOString(),
          "content-type": "application/json",
          "v": "2",
          "title": uploadData.title,
          "message-count": uploadData.transcript.messageCount.toString(),
          "leaf-message-id": uploadData.metadata.leafMessageId,
          "last-modified": uploadData.metadata.lastModified,
        };

        await env.TRANSCRIPTS_BUCKET.put(transcriptId, content, {
          customMetadata: metadata,
        });

        const responseData = {
          success: true,
          transcriptId,
          title: uploadData.title,
          messageCount: uploadData.transcript.messageCount,
          message: "Conversation saved successfully",
        };

        return new Response(JSON.stringify(responseData), {
          status: 201,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response("Internal server error", {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
