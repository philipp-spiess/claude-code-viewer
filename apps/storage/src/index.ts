interface Env {
  TRANSCRIPTS_BUCKET: R2Bucket;
  DEBUG_PASSWORD: string;
}

interface UploadRequest {
  directory?: string;
  repo?: string;
  transcript: string; // JSONL content
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Debug endpoint to list all transcripts
      if (path === '/debug/list' && request.method === 'GET') {
        const password = url.searchParams.get('password');
        if (!password || password !== env.DEBUG_PASSWORD) {
          return new Response('Unauthorized', { 
            status: 401,
            headers: corsHeaders 
          });
        }

        const objects = await env.TRANSCRIPTS_BUCKET.list();
        const transcriptIds = objects.objects.map(obj => obj.key);
        
        return new Response(JSON.stringify({ transcripts: transcriptIds }), {
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          },
        });
      }

      // Extract ID from path (format: /<id>)
      const idMatch = path.match(/^\/([a-f0-9-]{36})$/);
      if (!idMatch) {
        return new Response('Invalid transcript ID format', { 
          status: 400,
          headers: corsHeaders 
        });
      }

      const transcriptId = idMatch[1];

      // GET /<id> - Retrieve transcript
      if (request.method === 'GET') {
        const object = await env.TRANSCRIPTS_BUCKET.get(transcriptId);
        
        if (!object) {
          return new Response('Transcript not found', { 
            status: 404,
            headers: corsHeaders 
          });
        }

        const transcript = await object.text();
        
        return new Response(transcript, {
          headers: { 
            'Content-Type': 'application/jsonl',
            ...corsHeaders 
          },
        });
      }

      // POST /<id> - Create/update transcript
      if (request.method === 'POST') {
        const contentType = request.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          return new Response('Content-Type must be application/json', { 
            status: 400,
            headers: corsHeaders 
          });
        }

        let uploadData: UploadRequest;
        try {
          uploadData = await request.json();
        } catch {
          return new Response('Invalid JSON body', { 
            status: 400,
            headers: corsHeaders 
          });
        }

        // Validate required fields
        if (!uploadData.transcript) {
          return new Response('Missing required field: transcript', { 
            status: 400,
            headers: corsHeaders 
          });
        }

        // Validate that transcript is valid JSONL (each line should be valid JSON)
        const lines = uploadData.transcript.trim().split('\n');
        for (const line of lines) {
          if (line.trim()) {
            try {
              JSON.parse(line);
            } catch {
              return new Response('Invalid JSONL format in transcript field', { 
                status: 400,
                headers: corsHeaders 
              });
            }
          }
        }

        // Prepare metadata
        const metadata: Record<string, string> = {
          'uploaded-at': new Date().toISOString(),
          'content-type': 'application/jsonl',
        };

        if (uploadData.directory) {
          metadata['directory'] = uploadData.directory;
        }

        if (uploadData.repo) {
          metadata['repo'] = uploadData.repo;
        }

        await env.TRANSCRIPTS_BUCKET.put(transcriptId, uploadData.transcript, {
          customMetadata: metadata,
        });

        return new Response(JSON.stringify({ 
          success: true, 
          transcriptId,
          directory: uploadData.directory,
          repo: uploadData.repo,
          message: 'Transcript saved successfully' 
        }), {
          status: 201,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          },
        });
      }

      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal server error', { 
        status: 500,
        headers: corsHeaders 
      });
    }
  },
};