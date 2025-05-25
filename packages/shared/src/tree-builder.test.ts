import { describe, expect, it } from "vitest";
import { buildMessageTree } from "./tree-builder.js";
import type { TranscriptMessage } from "./types.js";

describe("buildMessageTree", () => {
  it("should build a proper tree structure from simplified transcript data", () => {
    const messages: TranscriptMessage[] = [
      {
        type: "summary",
        summary: "Esbuild Uploader Bundle: Flat Dependencies Configuration",
        leafUuid: "c4b5584a-ae3d-408d-83a1-c7524a906450",
      },
      {
        type: "summary",
        summary: "NPX Package Install Troubleshooting: Version Not Found",
        leafUuid: "356503ee-c0bb-42df-b5e7-a7ab5baa2cba",
      },
      {
        parentUuid: null,
        isSidechain: false,
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "607cb168-ddd4-41e9-9475-bc58e541e428",
        type: "user",
        message: {
          role: "user",
          content: "what is 1+1?",
        },
        uuid: "f231cf8b-37ac-4ce3-b9aa-813d1d27eb1a",
        timestamp: "2025-05-25T11:09:48.025Z",
      },
      {
        type: "summary",
        summary: "Esbuild Uploader Bundle: Flat Dependencies Configuration",
        leafUuid: "c261fe48-b352-4b59-9af5-578cec01380d",
      },
      {
        type: "summary",
        summary: "Uploader CLI Summary Extraction Heuristics Implemented",
        leafUuid: "20f7ee4a-730d-42fb-b371-9d26054f4733",
      },
      {
        parentUuid: "f231cf8b-37ac-4ce3-b9aa-813d1d27eb1a",
        isSidechain: false,
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "607cb168-ddd4-41e9-9475-bc58e541e428",
        message: {
          id: "msg_018mcqrDMDn2PNoS6dPNCx8V",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "text",
              text: "2",
            },
          ],
          stop_reason: "end_turn",
          stop_sequence: null,
          usage: {} as any,
        },
        costUSD: 0.015171795,
        durationMs: 1683,
        type: "assistant",
        uuid: "67fe174f-90fa-478d-8e64-870a77dd6a85",
        timestamp: "2025-05-25T11:09:49.920Z",
      },
    ];

    const tree = buildMessageTree(messages);

    expect(tree).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "message": {
                "costUSD": 0.015171795,
                "cwd": "/Users/philipp/dev/claude-code-viewer",
                "durationMs": 1683,
                "isSidechain": false,
                "message": {
                  "content": [
                    {
                      "text": "2",
                      "type": "text",
                    },
                  ],
                  "id": "msg_018mcqrDMDn2PNoS6dPNCx8V",
                  "model": "claude-sonnet-4-20250514",
                  "role": "assistant",
                  "stop_reason": "end_turn",
                  "stop_sequence": null,
                  "type": "message",
                  "usage": {},
                },
                "parentUuid": "f231cf8b-37ac-4ce3-b9aa-813d1d27eb1a",
                "sessionId": "607cb168-ddd4-41e9-9475-bc58e541e428",
                "timestamp": "2025-05-25T11:09:49.920Z",
                "type": "assistant",
                "uuid": "67fe174f-90fa-478d-8e64-870a77dd6a85",
              },
            },
          ],
          "message": {
            "cwd": "/Users/philipp/dev/claude-code-viewer",
            "isSidechain": false,
            "message": {
              "content": "what is 1+1?",
              "role": "user",
            },
            "parentUuid": null,
            "sessionId": "607cb168-ddd4-41e9-9475-bc58e541e428",
            "timestamp": "2025-05-25T11:09:48.025Z",
            "type": "user",
            "uuid": "f231cf8b-37ac-4ce3-b9aa-813d1d27eb1a",
          },
        },
      ]
    `);
  });

  it("should build a proper tree structure from a more complex transcript", () => {
    const messages: TranscriptMessage[] = [
      {
        type: "summary",
        summary: "Git Stash Review: Refactor API Routes to Storage Worker",
        leafUuid: "d7c8bc03-968c-444c-8cac-c93eca433b02",
      },
      {
        type: "summary",
        summary: "Cloudflare Worker Update: Metadata and JSON Response",
        leafUuid: "b6fd9262-1e79-4020-b2a4-92c9568f1a2d",
      },
      {
        parentUuid: null,
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content:
            "can you update the home page oif the web app to not allow direct uploading but instead read like a man page for `npx claude-code-uploder`? remove any icons too",
        },
        uuid: "8ee09711-a46a-491e-a8a8-dd8fd20217c4",
        timestamp: "2025-05-23T22:56:33.112Z",
      },
      {
        parentUuid: "8ee09711-a46a-491e-a8a8-dd8fd20217c4",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_01XsyWtfC4sF1EC9ucLNM9fN",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "text",
              text: "I'll update the home page to remove upload functionality and style it like a man page for the CLI tool.",
            },
            {
              type: "tool_use",
              id: "toolu_01PcQ6qvjD4LCVFQsYVRWBaL",
              name: "Read",
              input: {
                file_path: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
              },
            },
          ],
          stop_reason: "tool_use",
          stop_sequence: null,
          usage: {
            input_tokens: 4,
            cache_creation_input_tokens: 4762,
            cache_read_input_tokens: 13212,
            output_tokens: 98,
            service_tier: "standard",
          },
        },
        costUSD: 0.016753169999999998,
        durationMs: 3042,
        type: "assistant",
        uuid: "968420e8-3b3c-42b6-a2e4-7af74cf42be1",
        timestamp: "2025-05-23T22:56:36.327Z",
      },
      {
        parentUuid: "968420e8-3b3c-42b6-a2e4-7af74cf42be1",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content: [
            {
              tool_use_id: "toolu_01PcQ6qvjD4LCVFQsYVRWBaL",
              type: "tool_result",
              content:
                '     1\t\'use client\';\n     2\t\n     3\timport { useState } from \'react\';\n     4\timport { useRouter } from \'next/navigation\';\n     5\t\n     6\texport default function Home() {\n     7\t  const router = useRouter();\n     8\t  const [uploading, setUploading] = useState(false);\n     9\t  const [error, setError] = useState<string | null>(null);\n    10\t  const [dragActive, setDragActive] = useState(false);\n    11\t\n    12\t  const handleDrag = (e: React.DragEvent) => {\n    13\t    e.preventDefault();\n    14\t    e.stopPropagation();\n    15\t    if (e.type === "dragenter" || e.type === "dragover") {\n    16\t      setDragActive(true);\n    17\t    } else if (e.type === "dragleave") {\n    18\t      setDragActive(false);\n    19\t    }\n    20\t  };\n    21\t\n    22\t  const handleDrop = (e: React.DragEvent) => {\n    23\t    e.preventDefault();\n    24\t    e.stopPropagation();\n    25\t    setDragActive(false);\n    26\t    \n    27\t    if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n    28\t      handleFile(e.dataTransfer.files[0]);\n    29\t    }\n    30\t  };\n    31\t\n    32\t  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    33\t    e.preventDefault();\n    34\t    if (e.target.files && e.target.files[0]) {\n    35\t      handleFile(e.target.files[0]);\n    36\t    }\n    37\t  };\n    38\t\n    39\t  const handleFile = async (file: File) => {\n    40\t    if (!file.name.endsWith(\'.jsonl\')) {\n    41\t      setError(\'Please upload a .jsonl file\');\n    42\t      return;\n    43\t    }\n    44\t\n    45\t    setUploading(true);\n    46\t    setError(null);\n    47\t\n    48\t    try {\n    49\t      // Read file content\n    50\t      const content = await file.text();\n    51\t      \n    52\t      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one\n    53\t      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);\n    54\t      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();\n    55\t      \n    56\t      // Parse JSONL to extract metadata\n    57\t      const lines = content.trim().split(\'\\n\');\n    58\t      let projectPath = \'\';\n    59\t      let summary = \'\';\n    60\t      \n    61\t      for (const line of lines) {\n    62\t        try {\n    63\t          const data = JSON.parse(line);\n    64\t          if (data.type === \'project_info\' && data.project_path) {\n    65\t            projectPath = data.project_path;\n    66\t          }\n    67\t          if (data.type === \'summary\' && data.content) {\n    68\t            summary = data.content;\n    69\t          }\n    70\t        } catch (e) {\n    71\t          // Skip invalid JSON lines\n    72\t        }\n    73\t      }\n    74\t\n    75\t      // Upload directly to storage worker\n    76\t      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {\n    77\t        method: \'POST\',\n    78\t        headers: {\n    79\t          \'Content-Type\': \'application/json\',\n    80\t        },\n    81\t        body: JSON.stringify({\n    82\t          transcript: content,\n    83\t          directory: projectPath || undefined,\n    84\t          repo: summary || undefined,\n    85\t        }),\n    86\t      });\n    87\t\n    88\t      if (!response.ok) {\n    89\t        throw new Error(`Upload failed with status ${response.status}`);\n    90\t      }\n    91\t\n    92\t      router.push(`/${id}`);\n    93\t    } catch (err) {\n    94\t      setError(err instanceof Error ? err.message : \'Upload failed\');\n    95\t      setUploading(false);\n    96\t    }\n    97\t  };\n    98\t\n    99\t  return (\n   100\t    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">\n   101\t      <div className="w-full max-w-md">\n   102\t        {/* Header */}\n   103\t        <div className="text-center mb-8">\n   104\t          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">\n   105\t            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n   106\t              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n   107\t            </svg>\n   108\t          </div>\n   109\t          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>\n   110\t          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>\n   111\t        </div>\n   112\t\n   113\t        {/* Upload area */}\n   114\t        <form\n   115\t          onDragEnter={handleDrag}\n   116\t          onSubmit={(e) => e.preventDefault()}\n   117\t        >\n   118\t          <div\n   119\t            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${\n   120\t              dragActive\n   121\t                ? \'border-blue-400 bg-blue-50 dark:bg-blue-900/20\'\n   122\t                : \'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600\'\n   123\t            }`}\n   124\t            onDragEnter={handleDrag}\n   125\t            onDragLeave={handleDrag}\n   126\t            onDragOver={handleDrag}\n   127\t            onDrop={handleDrop}\n   128\t          >\n   129\t            <input\n   130\t              type="file"\n   131\t              id="file-upload"\n   132\t              className="sr-only"\n   133\t              accept=".jsonl"\n   134\t              onChange={handleChange}\n   135\t              disabled={uploading}\n   136\t            />\n   137\t            \n   138\t            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">\n   139\t              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />\n   140\t            </svg>\n   141\t            \n   142\t            <label\n   143\t              htmlFor="file-upload"\n   144\t              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"\n   145\t            >\n   146\t              {uploading ? \'Uploading...\' : \'Choose file\'}\n   147\t            </label>\n   148\t            \n   149\t            <p className="mt-2 text-gray-600 dark:text-gray-400">\n   150\t              or drag and drop your transcript-*.jsonl file here\n   151\t            </p>\n   152\t          </div>\n   153\t        </form>\n   154\t\n   155\t        {/* Error message */}\n   156\t        {error && (\n   157\t          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">\n   158\t            <p className="text-red-600 dark:text-red-400">{error}</p>\n   159\t          </div>\n   160\t        )}\n   161\t\n   162\t        {/* Instructions */}\n   163\t        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">\n   164\t          <p>To get your transcript:</p>\n   165\t          <ol className="mt-2 space-y-1">\n   166\t            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>\n   167\t            <li>2. Find the transcript-*.jsonl file in your save directory</li>\n   168\t            <li>3. Upload it here to view the conversation</li>\n   169\t          </ol>\n   170\t        </div>\n   171\t      </div>\n   172\t    </div>\n   173\t  );\n   174\t}',
            },
          ],
        },
        uuid: "5b061a9b-6d8b-4ae8-bda5-9e8ce42ea024",
        timestamp: "2025-05-23T22:56:36.353Z",
        toolUseResult: {
          type: "text",
          file: {
            filePath: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
            content:
              '\'use client\';\n\nimport { useState } from \'react\';\nimport { useRouter } from \'next/navigation\';\n\nexport default function Home() {\n  const router = useRouter();\n  const [uploading, setUploading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const [dragActive, setDragActive] = useState(false);\n\n  const handleDrag = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    if (e.type === "dragenter" || e.type === "dragover") {\n      setDragActive(true);\n    } else if (e.type === "dragleave") {\n      setDragActive(false);\n    }\n  };\n\n  const handleDrop = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    setDragActive(false);\n    \n    if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n      handleFile(e.dataTransfer.files[0]);\n    }\n  };\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    e.preventDefault();\n    if (e.target.files && e.target.files[0]) {\n      handleFile(e.target.files[0]);\n    }\n  };\n\n  const handleFile = async (file: File) => {\n    if (!file.name.endsWith(\'.jsonl\')) {\n      setError(\'Please upload a .jsonl file\');\n      return;\n    }\n\n    setUploading(true);\n    setError(null);\n\n    try {\n      // Read file content\n      const content = await file.text();\n      \n      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one\n      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);\n      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();\n      \n      // Parse JSONL to extract metadata\n      const lines = content.trim().split(\'\\n\');\n      let projectPath = \'\';\n      let summary = \'\';\n      \n      for (const line of lines) {\n        try {\n          const data = JSON.parse(line);\n          if (data.type === \'project_info\' && data.project_path) {\n            projectPath = data.project_path;\n          }\n          if (data.type === \'summary\' && data.content) {\n            summary = data.content;\n          }\n        } catch (e) {\n          // Skip invalid JSON lines\n        }\n      }\n\n      // Upload directly to storage worker\n      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {\n        method: \'POST\',\n        headers: {\n          \'Content-Type\': \'application/json\',\n        },\n        body: JSON.stringify({\n          transcript: content,\n          directory: projectPath || undefined,\n          repo: summary || undefined,\n        }),\n      });\n\n      if (!response.ok) {\n        throw new Error(`Upload failed with status ${response.status}`);\n      }\n\n      router.push(`/${id}`);\n    } catch (err) {\n      setError(err instanceof Error ? err.message : \'Upload failed\');\n      setUploading(false);\n    }\n  };\n\n  return (\n    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">\n      <div className="w-full max-w-md">\n        {/* Header */}\n        <div className="text-center mb-8">\n          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">\n            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n            </svg>\n          </div>\n          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>\n          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>\n        </div>\n\n        {/* Upload area */}\n        <form\n          onDragEnter={handleDrag}\n          onSubmit={(e) => e.preventDefault()}\n        >\n          <div\n            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${\n              dragActive\n                ? \'border-blue-400 bg-blue-50 dark:bg-blue-900/20\'\n                : \'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600\'\n            }`}\n            onDragEnter={handleDrag}\n            onDragLeave={handleDrag}\n            onDragOver={handleDrag}\n            onDrop={handleDrop}\n          >\n            <input\n              type="file"\n              id="file-upload"\n              className="sr-only"\n              accept=".jsonl"\n              onChange={handleChange}\n              disabled={uploading}\n            />\n            \n            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">\n              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />\n            </svg>\n            \n            <label\n              htmlFor="file-upload"\n              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"\n            >\n              {uploading ? \'Uploading...\' : \'Choose file\'}\n            </label>\n            \n            <p className="mt-2 text-gray-600 dark:text-gray-400">\n              or drag and drop your transcript-*.jsonl file here\n            </p>\n          </div>\n        </form>\n\n        {/* Error message */}\n        {error && (\n          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">\n            <p className="text-red-600 dark:text-red-400">{error}</p>\n          </div>\n        )}\n\n        {/* Instructions */}\n        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">\n          <p>To get your transcript:</p>\n          <ol className="mt-2 space-y-1">\n            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>\n            <li>2. Find the transcript-*.jsonl file in your save directory</li>\n            <li>3. Upload it here to view the conversation</li>\n          </ol>\n        </div>\n      </div>\n    </div>\n  );\n}',
            numLines: 174,
            startLine: 1,
            totalLines: 174,
          },
        },
      },
      {
        parentUuid: "5b061a9b-6d8b-4ae8-bda5-9e8ce42ea024",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_013cNaQWxdm53yfUEARMEfG6",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "tool_use",
              id: "toolu_01NrPwuz5QYKUmQAHVBxTEf2",
              name: "Edit",
              input: {
                file_path: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                old_string:
                  '\'use client\';\n\nimport { useState } from \'react\';\nimport { useRouter } from \'next/navigation\';\n\nexport default function Home() {\n  const router = useRouter();\n  const [uploading, setUploading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const [dragActive, setDragActive] = useState(false);\n\n  const handleDrag = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    if (e.type === "dragenter" || e.type === "dragover") {\n      setDragActive(true);\n    } else if (e.type === "dragleave") {\n      setDragActive(false);\n    }\n  };\n\n  const handleDrop = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    setDragActive(false);\n    \n    if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n      handleFile(e.dataTransfer.files[0]);\n    }\n  };\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    e.preventDefault();\n    if (e.target.files && e.target.files[0]) {\n      handleFile(e.target.files[0]);\n    }\n  };\n\n  const handleFile = async (file: File) => {\n    if (!file.name.endsWith(\'.jsonl\')) {\n      setError(\'Please upload a .jsonl file\');\n      return;\n    }\n\n    setUploading(true);\n    setError(null);\n\n    try {\n      // Read file content\n      const content = await file.text();\n      \n      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one\n      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);\n      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();\n      \n      // Parse JSONL to extract metadata\n      const lines = content.trim().split(\'\\n\');\n      let projectPath = \'\';\n      let summary = \'\';\n      \n      for (const line of lines) {\n        try {\n          const data = JSON.parse(line);\n          if (data.type === \'project_info\' && data.project_path) {\n            projectPath = data.project_path;\n          }\n          if (data.type === \'summary\' && data.content) {\n            summary = data.content;\n          }\n        } catch (e) {\n          // Skip invalid JSON lines\n        }\n      }\n\n      // Upload directly to storage worker\n      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {\n        method: \'POST\',\n        headers: {\n          \'Content-Type\': \'application/json\',\n        },\n        body: JSON.stringify({\n          transcript: content,\n          directory: projectPath || undefined,\n          repo: summary || undefined,\n        }),\n      });\n\n      if (!response.ok) {\n        throw new Error(`Upload failed with status ${response.status}`);\n      }\n\n      router.push(`/${id}`);\n    } catch (err) {\n      setError(err instanceof Error ? err.message : \'Upload failed\');\n      setUploading(false);\n    }\n  };\n\n  return (\n    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">\n      <div className="w-full max-w-md">\n        {/* Header */}\n        <div className="text-center mb-8">\n          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">\n            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n            </svg>\n          </div>\n          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>\n          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>\n        </div>\n\n        {/* Upload area */}\n        <form\n          onDragEnter={handleDrag}\n          onSubmit={(e) => e.preventDefault()}\n        >\n          <div\n            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${\n              dragActive\n                ? \'border-blue-400 bg-blue-50 dark:bg-blue-900/20\'\n                : \'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600\'\n            }`}\n            onDragEnter={handleDrag}\n            onDragLeave={handleDrag}\n            onDragOver={handleDrag}\n            onDrop={handleDrop}\n          >\n            <input\n              type="file"\n              id="file-upload"\n              className="sr-only"\n              accept=".jsonl"\n              onChange={handleChange}\n              disabled={uploading}\n            />\n            \n            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">\n              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />\n            </svg>\n            \n            <label\n              htmlFor="file-upload"\n              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"\n            >\n              {uploading ? \'Uploading...\' : \'Choose file\'}\n            </label>\n            \n            <p className="mt-2 text-gray-600 dark:text-gray-400">\n              or drag and drop your transcript-*.jsonl file here\n            </p>\n          </div>\n        </form>\n\n        {/* Error message */}\n        {error && (\n          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">\n            <p className="text-red-600 dark:text-red-400">{error}</p>\n          </div>\n        )}\n\n        {/* Instructions */}\n        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">\n          <p>To get your transcript:</p>\n          <ol className="mt-2 space-y-1">\n            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>\n            <li>2. Find the transcript-*.jsonl file in your save directory</li>\n            <li>3. Upload it here to view the conversation</li>\n          </ol>\n        </div>\n      </div>\n    </div>\n  );\n}',
                new_string:
                  'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-green-400 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="text-xl font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
              },
            },
          ],
          stop_reason: "tool_use",
          stop_sequence: null,
          usage: {
            input_tokens: 6,
            cache_creation_input_tokens: 2787,
            cache_read_input_tokens: 17974,
            output_tokens: 3363,
            service_tier: "standard",
          },
        },
        costUSD: 0.061548015000000005,
        durationMs: 44066,
        type: "assistant",
        uuid: "0917c46c-6d13-44fd-83ba-784d505be491",
        timestamp: "2025-05-23T22:57:20.440Z",
      },
      {
        parentUuid: "0917c46c-6d13-44fd-83ba-784d505be491",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content: [
            {
              tool_use_id: "toolu_01NrPwuz5QYKUmQAHVBxTEf2",
              type: "tool_result",
              content:
                'The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here\'s the result of running `cat -n` on a snippet of the edited file:\n     1\texport default function Home() {\n     2\t  return (\n     3\t    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n     4\t      <div className="max-w-4xl mx-auto">\n     5\t        <div className="mb-8">\n     6\t          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n     7\t          <div className="border-b border-green-400 mb-4"></div>\n     8\t        </div>\n     9\t\n    10\t        <div className="space-y-6">\n    11\t          <section>\n    12\t            <h2 className="text-xl font-bold mb-2">NAME</h2>\n    13\t            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n    14\t          </section>\n    15\t\n    16\t          <section>\n    17\t            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n    18\t            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n    19\t          </section>\n    20\t\n    21\t          <section>\n    22\t            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n    23\t            <div className="ml-8 space-y-2">\n    24\t              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n    25\t              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n    26\t            </div>\n    27\t          </section>\n    28\t\n    29\t          <section>\n    30\t            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n    31\t            <div className="ml-8 space-y-4">\n    32\t              <div>\n    33\t                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n    34\t                <div className="ml-4 text-gray-400">\n    35\t                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n    36\t                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n    37\t                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n    38\t                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n    39\t                </div>\n    40\t              </div>\n    41\t              <div>\n    42\t                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n    43\t                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n    44\t              </div>\n    45\t            </div>\n    46\t          </section>\n    47\t\n    48\t          <section>\n    49\t            <h2 className="text-xl font-bold mb-2">FILES</h2>\n    50\t            <div className="ml-8">\n    51\t              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n    52\t              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n    53\t            </div>\n    54\t          </section>\n    55\t\n    56\t          <section>\n    57\t            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n    58\t            <div className="ml-8 space-y-1">\n    59\t              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n    60\t              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n    61\t            </div>\n    62\t          </section>\n    63\t\n    64\t          <section>\n    65\t            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n    66\t            <div className="ml-8 space-y-2">\n    67\t              <p>Upload a transcript interactively:</p>\n    68\t              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n    69\t            </div>\n    70\t          </section>\n    71\t\n    72\t          <section>\n    73\t            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n    74\t            <div className="ml-8">\n    75\t              <p>claude(1), git(1)</p>\n    76\t            </div>\n    77\t          </section>\n    78\t        </div>\n    79\t\n    80\t        <div className="mt-12 text-center text-gray-500">\n    81\t          <p>Claude Code Transcript Uploader v1.0.0</p>\n    82\t        </div>\n    83\t      </div>\n    84\t    </div>\n    85\t  );\n    86\t}',
            },
          ],
        },
        uuid: "2b2cd6c6-b0cc-4ad8-a014-66c36956d4f5",
        timestamp: "2025-05-23T22:57:36.696Z",
        toolUseResult: {
          filePath: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
          oldString:
            '\'use client\';\n\nimport { useState } from \'react\';\nimport { useRouter } from \'next/navigation\';\n\nexport default function Home() {\n  const router = useRouter();\n  const [uploading, setUploading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const [dragActive, setDragActive] = useState(false);\n\n  const handleDrag = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    if (e.type === "dragenter" || e.type === "dragover") {\n      setDragActive(true);\n    } else if (e.type === "dragleave") {\n      setDragActive(false);\n    }\n  };\n\n  const handleDrop = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    setDragActive(false);\n    \n    if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n      handleFile(e.dataTransfer.files[0]);\n    }\n  };\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    e.preventDefault();\n    if (e.target.files && e.target.files[0]) {\n      handleFile(e.target.files[0]);\n    }\n  };\n\n  const handleFile = async (file: File) => {\n    if (!file.name.endsWith(\'.jsonl\')) {\n      setError(\'Please upload a .jsonl file\');\n      return;\n    }\n\n    setUploading(true);\n    setError(null);\n\n    try {\n      // Read file content\n      const content = await file.text();\n      \n      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one\n      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);\n      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();\n      \n      // Parse JSONL to extract metadata\n      const lines = content.trim().split(\'\\n\');\n      let projectPath = \'\';\n      let summary = \'\';\n      \n      for (const line of lines) {\n        try {\n          const data = JSON.parse(line);\n          if (data.type === \'project_info\' && data.project_path) {\n            projectPath = data.project_path;\n          }\n          if (data.type === \'summary\' && data.content) {\n            summary = data.content;\n          }\n        } catch (e) {\n          // Skip invalid JSON lines\n        }\n      }\n\n      // Upload directly to storage worker\n      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {\n        method: \'POST\',\n        headers: {\n          \'Content-Type\': \'application/json\',\n        },\n        body: JSON.stringify({\n          transcript: content,\n          directory: projectPath || undefined,\n          repo: summary || undefined,\n        }),\n      });\n\n      if (!response.ok) {\n        throw new Error(`Upload failed with status ${response.status}`);\n      }\n\n      router.push(`/${id}`);\n    } catch (err) {\n      setError(err instanceof Error ? err.message : \'Upload failed\');\n      setUploading(false);\n    }\n  };\n\n  return (\n    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">\n      <div className="w-full max-w-md">\n        {/* Header */}\n        <div className="text-center mb-8">\n          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">\n            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n            </svg>\n          </div>\n          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>\n          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>\n        </div>\n\n        {/* Upload area */}\n        <form\n          onDragEnter={handleDrag}\n          onSubmit={(e) => e.preventDefault()}\n        >\n          <div\n            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${\n              dragActive\n                ? \'border-blue-400 bg-blue-50 dark:bg-blue-900/20\'\n                : \'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600\'\n            }`}\n            onDragEnter={handleDrag}\n            onDragLeave={handleDrag}\n            onDragOver={handleDrag}\n            onDrop={handleDrop}\n          >\n            <input\n              type="file"\n              id="file-upload"\n              className="sr-only"\n              accept=".jsonl"\n              onChange={handleChange}\n              disabled={uploading}\n            />\n            \n            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">\n              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />\n            </svg>\n            \n            <label\n              htmlFor="file-upload"\n              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"\n            >\n              {uploading ? \'Uploading...\' : \'Choose file\'}\n            </label>\n            \n            <p className="mt-2 text-gray-600 dark:text-gray-400">\n              or drag and drop your transcript-*.jsonl file here\n            </p>\n          </div>\n        </form>\n\n        {/* Error message */}\n        {error && (\n          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">\n            <p className="text-red-600 dark:text-red-400">{error}</p>\n          </div>\n        )}\n\n        {/* Instructions */}\n        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">\n          <p>To get your transcript:</p>\n          <ol className="mt-2 space-y-1">\n            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>\n            <li>2. Find the transcript-*.jsonl file in your save directory</li>\n            <li>3. Upload it here to view the conversation</li>\n          </ol>\n        </div>\n      </div>\n    </div>\n  );\n}',
          newString:
            'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-green-400 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="text-xl font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
          originalFile:
            '\'use client\';\n\nimport { useState } from \'react\';\nimport { useRouter } from \'next/navigation\';\n\nexport default function Home() {\n  const router = useRouter();\n  const [uploading, setUploading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const [dragActive, setDragActive] = useState(false);\n\n  const handleDrag = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    if (e.type === "dragenter" || e.type === "dragover") {\n      setDragActive(true);\n    } else if (e.type === "dragleave") {\n      setDragActive(false);\n    }\n  };\n\n  const handleDrop = (e: React.DragEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    setDragActive(false);\n    \n    if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n      handleFile(e.dataTransfer.files[0]);\n    }\n  };\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    e.preventDefault();\n    if (e.target.files && e.target.files[0]) {\n      handleFile(e.target.files[0]);\n    }\n  };\n\n  const handleFile = async (file: File) => {\n    if (!file.name.endsWith(\'.jsonl\')) {\n      setError(\'Please upload a .jsonl file\');\n      return;\n    }\n\n    setUploading(true);\n    setError(null);\n\n    try {\n      // Read file content\n      const content = await file.text();\n      \n      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one\n      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);\n      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();\n      \n      // Parse JSONL to extract metadata\n      const lines = content.trim().split(\'\\n\');\n      let projectPath = \'\';\n      let summary = \'\';\n      \n      for (const line of lines) {\n        try {\n          const data = JSON.parse(line);\n          if (data.type === \'project_info\' && data.project_path) {\n            projectPath = data.project_path;\n          }\n          if (data.type === \'summary\' && data.content) {\n            summary = data.content;\n          }\n        } catch (e) {\n          // Skip invalid JSON lines\n        }\n      }\n\n      // Upload directly to storage worker\n      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {\n        method: \'POST\',\n        headers: {\n          \'Content-Type\': \'application/json\',\n        },\n        body: JSON.stringify({\n          transcript: content,\n          directory: projectPath || undefined,\n          repo: summary || undefined,\n        }),\n      });\n\n      if (!response.ok) {\n        throw new Error(`Upload failed with status ${response.status}`);\n      }\n\n      router.push(`/${id}`);\n    } catch (err) {\n      setError(err instanceof Error ? err.message : \'Upload failed\');\n      setUploading(false);\n    }\n  };\n\n  return (\n    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">\n      <div className="w-full max-w-md">\n        {/* Header */}\n        <div className="text-center mb-8">\n          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">\n            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n            </svg>\n          </div>\n          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>\n          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>\n        </div>\n\n        {/* Upload area */}\n        <form\n          onDragEnter={handleDrag}\n          onSubmit={(e) => e.preventDefault()}\n        >\n          <div\n            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${\n              dragActive\n                ? \'border-blue-400 bg-blue-50 dark:bg-blue-900/20\'\n                : \'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600\'\n            }`}\n            onDragEnter={handleDrag}\n            onDragLeave={handleDrag}\n            onDragOver={handleDrag}\n            onDrop={handleDrop}\n          >\n            <input\n              type="file"\n              id="file-upload"\n              className="sr-only"\n              accept=".jsonl"\n              onChange={handleChange}\n              disabled={uploading}\n            />\n            \n            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">\n              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />\n            </svg>\n            \n            <label\n              htmlFor="file-upload"\n              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"\n            >\n              {uploading ? \'Uploading...\' : \'Choose file\'}\n            </label>\n            \n            <p className="mt-2 text-gray-600 dark:text-gray-400">\n              or drag and drop your transcript-*.jsonl file here\n            </p>\n          </div>\n        </form>\n\n        {/* Error message */}\n        {error && (\n          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">\n            <p className="text-red-600 dark:text-red-400">{error}</p>\n          </div>\n        )}\n\n        {/* Instructions */}\n        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">\n          <p>To get your transcript:</p>\n          <ol className="mt-2 space-y-1">\n            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>\n            <li>2. Find the transcript-*.jsonl file in your save directory</li>\n            <li>3. Upload it here to view the conversation</li>\n          </ol>\n        </div>\n      </div>\n    </div>\n  );\n}',
          structuredPatch: [
            {
              oldStart: 1,
              oldLines: 172,
              newStart: 1,
              newLines: 84,
              lines: [
                "-'use client';",
                "-",
                "-import { useState } from 'react';",
                "-import { useRouter } from 'next/navigation';",
                "-",
                " export default function Home() {",
                "-  const router = useRouter();",
                "-  const [uploading, setUploading] = useState(false);",
                "-  const [error, setError] = useState<string | null>(null);",
                "-  const [dragActive, setDragActive] = useState(false);",
                "+  return (",
                '+    <div className="min-h-screen bg-black text-green-400 font-mono p-8">',
                '+      <div className="max-w-4xl mx-auto">',
                '+        <div className="mb-8">',
                '+          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>',
                '+          <div className="border-b border-green-400 mb-4"></div>',
                "+        </div>",
                " ",
                "-  const handleDrag = (e: React.DragEvent) => {",
                "-    e.preventDefault();",
                "-    e.stopPropagation();",
                '-    if (e.type === "dragenter" || e.type === "dragover") {',
                "-      setDragActive(true);",
                '-    } else if (e.type === "dragleave") {',
                "-      setDragActive(false);",
                "-    }",
                "-  };",
                '+        <div className="space-y-6">',
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">NAME</h2>',
                '+            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>',
                "+          </section>",
                " ",
                "-  const handleDrop = (e: React.DragEvent) => {",
                "-    e.preventDefault();",
                "-    e.stopPropagation();",
                "-    setDragActive(false);",
                "-    ",
                "-    if (e.dataTransfer.files && e.dataTransfer.files[0]) {",
                "-      handleFile(e.dataTransfer.files[0]);",
                "-    }",
                "-  };",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>',
                '+            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>',
                "+          </section>",
                " ",
                "-  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {",
                "-    e.preventDefault();",
                "-    if (e.target.files && e.target.files[0]) {",
                "-      handleFile(e.target.files[0]);",
                "-    }",
                "-  };",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>',
                '+            <div className="ml-8 space-y-2">',
                '+              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>',
                '+              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>',
                "+            </div>",
                "+          </section>",
                " ",
                "-  const handleFile = async (file: File) => {",
                "-    if (!file.name.endsWith('.jsonl')) {",
                "-      setError('Please upload a .jsonl file');",
                "-      return;",
                "-    }",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">USAGE</h2>',
                '+            <div className="ml-8 space-y-4">',
                "+              <div>",
                '+                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>',
                '+                <div className="ml-4 text-gray-400">',
                "+                  <p>? Select a transcript to upload: (Use arrow keys)</p>",
                "+                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>",
                "+                  <p>  project-beta/transcript-2024-01-14.jsonl</p>",
                "+                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>",
                "+                </div>",
                "+              </div>",
                "+              <div>",
                '+                <p className="text-green-300">✓ Uploaded transcript successfully!</p>',
                '+                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>',
                "+              </div>",
                "+            </div>",
                "+          </section>",
                " ",
                "-    setUploading(true);",
                "-    setError(null);",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">FILES</h2>',
                '+            <div className="ml-8">',
                '+              <p><span className="text-cyan-400">~/.claude/projects/</span></p>',
                '+              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>',
                "+            </div>",
                "+          </section>",
                " ",
                "-    try {",
                "-      // Read file content",
                "-      const content = await file.text();",
                "-      ",
                "-      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one",
                "-      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);",
                "-      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();",
                "-      ",
                "-      // Parse JSONL to extract metadata",
                "-      const lines = content.trim().split('\\n');",
                "-      let projectPath = '';",
                "-      let summary = '';",
                "-      ",
                "-      for (const line of lines) {",
                "-        try {",
                "-          const data = JSON.parse(line);",
                "-          if (data.type === 'project_info' && data.project_path) {",
                "-            projectPath = data.project_path;",
                "-          }",
                "-          if (data.type === 'summary' && data.content) {",
                "-            summary = data.content;",
                "-          }",
                "-        } catch (e) {",
                "-          // Skip invalid JSON lines",
                "-        }",
                "-      }",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>',
                '+            <div className="ml-8 space-y-1">',
                '+              <p><span className="text-yellow-400">0</span>   Successful upload</p>',
                '+              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>',
                "+            </div>",
                "+          </section>",
                " ",
                "-      // Upload directly to storage worker",
                "-      const response = await fetch(`https://claude-code-storage.remote.workers.dev/${id}`, {",
                "-        method: 'POST',",
                "-        headers: {",
                "-          'Content-Type': 'application/json',",
                "-        },",
                "-        body: JSON.stringify({",
                "-          transcript: content,",
                "-          directory: projectPath || undefined,",
                "-          repo: summary || undefined,",
                "-        }),",
                "-      });",
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>',
                '+            <div className="ml-8 space-y-2">',
                "+              <p>Upload a transcript interactively:</p>",
                '+              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>',
                "+            </div>",
                "+          </section>",
                " ",
                "-      if (!response.ok) {",
                "-        throw new Error(`Upload failed with status ${response.status}`);",
                "-      }",
                "-",
                "-      router.push(`/${id}`);",
                "-    } catch (err) {",
                "-      setError(err instanceof Error ? err.message : 'Upload failed');",
                "-      setUploading(false);",
                "-    }",
                "-  };",
                "-",
                "-  return (",
                '-    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">',
                '-      <div className="w-full max-w-md">',
                "-        {/* Header */}",
                '-        <div className="text-center mb-8">',
                '-          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">',
                '-            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">',
                '-              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
                "-            </svg>",
                "-          </div>",
                '-          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>',
                '-          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>',
                "+          <section>",
                '+            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>',
                '+            <div className="ml-8">',
                "+              <p>claude(1), git(1)</p>",
                "+            </div>",
                "+          </section>",
                "         </div>",
                " ",
                "-        {/* Upload area */}",
                "-        <form",
                "-          onDragEnter={handleDrag}",
                "-          onSubmit={(e) => e.preventDefault()}",
                "-        >",
                "-          <div",
                "-            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${",
                "-              dragActive",
                "-                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'",
                "-                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'",
                "-            }`}",
                "-            onDragEnter={handleDrag}",
                "-            onDragLeave={handleDrag}",
                "-            onDragOver={handleDrag}",
                "-            onDrop={handleDrop}",
                "-          >",
                "-            <input",
                '-              type="file"',
                '-              id="file-upload"',
                '-              className="sr-only"',
                '-              accept=".jsonl"',
                "-              onChange={handleChange}",
                "-              disabled={uploading}",
                "-            />",
                "-            ",
                '-            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">',
                '-              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />',
                "-            </svg>",
                "-            ",
                "-            <label",
                '-              htmlFor="file-upload"',
                '-              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"',
                "-            >",
                "-              {uploading ? 'Uploading...' : 'Choose file'}",
                "-            </label>",
                "-            ",
                '-            <p className="mt-2 text-gray-600 dark:text-gray-400">',
                "-              or drag and drop your transcript-*.jsonl file here",
                "-            </p>",
                "-          </div>",
                "-        </form>",
                "-",
                "-        {/* Error message */}",
                "-        {error && (",
                '-          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">',
                '-            <p className="text-red-600 dark:text-red-400">{error}</p>',
                "-          </div>",
                "-        )}",
                "-",
                "-        {/* Instructions */}",
                '-        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">',
                "-          <p>To get your transcript:</p>",
                '-          <ol className="mt-2 space-y-1">',
                '-            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>',
                "-            <li>2. Find the transcript-*.jsonl file in your save directory</li>",
                "-            <li>3. Upload it here to view the conversation</li>",
                "-          </ol>",
                '+        <div className="mt-12 text-center text-gray-500">',
                "+          <p>Claude Code Transcript Uploader v1.0.0</p>",
                "         </div>",
                "       </div>",
                "     </div>",
              ],
            },
          ],
        },
      },
      {
        parentUuid: "2b2cd6c6-b0cc-4ad8-a014-66c36956d4f5",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_01Bd2fahuVMgsGKc7MHW1k3U",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "text",
              text: "Updated the home page to display as a man page for `npx claude-code-uploader`. Removed all upload functionality, icons, and modernized the styling to match traditional Unix manual pages with terminal colors and monospace font.",
            },
          ],
          stop_reason: "end_turn",
          stop_sequence: null,
          usage: {
            input_tokens: 5,
            cache_creation_input_tokens: 4802,
            cache_read_input_tokens: 20761,
            output_tokens: 51,
            service_tier: "standard",
          },
        },
        costUSD: 0.017740560000000002,
        durationMs: 3433,
        type: "assistant",
        uuid: "119a9b51-6a16-4c22-82b8-dc5b2a9ca87f",
        timestamp: "2025-05-23T22:57:40.207Z",
      },
      {
        parentUuid: "119a9b51-6a16-4c22-82b8-dc5b2a9ca87f",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content:
            "can you make the all fonts the same size (default so no text-* size modifiers) and use a different less bright color for the border-bottom. You can look at the thing in http://localhost:3000/. ",
        },
        uuid: "288e575c-41d9-4ef1-af3a-f9f4530022fc",
        timestamp: "2025-05-23T22:59:30.258Z",
      },
      {
        parentUuid: "288e575c-41d9-4ef1-af3a-f9f4530022fc",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_01Q1yr1XZ2v7pxbpQMuLAyh6",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "tool_use",
              id: "toolu_01JiZoTTJyESKMKhnhLku4Hv",
              name: "mcp__playwright__browser_navigate",
              input: {
                url: "http://localhost:3000/",
              },
            },
          ],
          stop_reason: "tool_use",
          stop_sequence: null,
          usage: {
            input_tokens: 2,
            cache_creation_input_tokens: 106,
            cache_read_input_tokens: 25563,
            output_tokens: 64,
            service_tier: "standard",
          },
        },
        costUSD: 0.00661068,
        durationMs: 2339,
        type: "assistant",
        uuid: "f3747c27-0890-4b7a-a0c5-5cee982f983c",
        timestamp: "2025-05-23T22:59:32.781Z",
      },
      {
        parentUuid: "f3747c27-0890-4b7a-a0c5-5cee982f983c",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content: [
            {
              tool_use_id: "toolu_01JiZoTTJyESKMKhnhLku4Hv",
              type: "tool_result",
              content: [
                {
                  type: "text",
                  text: '- Ran Playwright code:\n```js\n// Navigate to http://localhost:3000/\nawait page.goto(\'http://localhost:3000/\');\n```\n\n- Page URL: http://localhost:3000/\n- Page Title: Claude Transcript Viewer\n- Page Snapshot\n```yaml\n- generic [ref=e1]:\n  - generic [ref=e3]:\n    - heading "CLAUDE-CODE-UPLOADER(1)" [level=1] [ref=e5]\n    - generic [ref=e7]:\n      - generic [ref=e8]:\n        - heading "NAME" [level=2] [ref=e9]\n        - paragraph [ref=e10]: claude-code-uploader - upload Claude Code transcripts to web viewer\n      - generic [ref=e11]:\n        - heading "SYNOPSIS" [level=2] [ref=e12]\n        - paragraph [ref=e13]: npx claude-code-uploader\n      - generic [ref=e14]:\n        - heading "DESCRIPTION" [level=2] [ref=e15]\n        - generic [ref=e16]:\n          - paragraph [ref=e17]:\n            - text: The\n            - generic [ref=e18]: claude-code-uploader\n            - text: utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.\n          - paragraph [ref=e19]:\n            - text: It automatically discovers transcript files in\n            - generic [ref=e20]: ~/.claude/projects/\n            - text: and provides an interactive interface for selecting and uploading transcripts.\n      - generic [ref=e21]:\n        - heading "USAGE" [level=2] [ref=e22]\n        - generic [ref=e23]:\n          - generic [ref=e24]:\n            - paragraph [ref=e25]: $ npx claude-code-uploader\n            - generic [ref=e26]:\n              - paragraph [ref=e27]: "? Select a transcript to upload: (Use arrow keys)"\n              - paragraph [ref=e28]: ❯ project-alpha/transcript-2024-01-15.jsonl\n              - paragraph [ref=e29]: project-beta/transcript-2024-01-14.jsonl\n              - paragraph [ref=e30]: project-gamma/transcript-2024-01-13.jsonl\n          - generic [ref=e31]:\n            - paragraph [ref=e32]: ✓ Uploaded transcript successfully!\n            - paragraph [ref=e33]: "View at: https://claude-code-viewer.vercel.app/abc123..."\n      - generic [ref=e34]:\n        - heading "FILES" [level=2] [ref=e35]\n        - generic [ref=e36]:\n          - paragraph [ref=e37]:\n            - generic [ref=e38]: ~/.claude/projects/\n          - paragraph [ref=e39]: Default directory where Claude Code stores project transcripts\n      - generic [ref=e40]:\n        - heading "EXIT STATUS" [level=2] [ref=e41]\n        - generic [ref=e42]:\n          - paragraph [ref=e43]:\n            - generic [ref=e44]: "0"\n            - text: Successful upload\n          - paragraph [ref=e45]:\n            - generic [ref=e46]: "1"\n            - text: Upload failed or user cancelled\n      - generic [ref=e47]:\n        - heading "EXAMPLES" [level=2] [ref=e48]\n        - generic [ref=e49]:\n          - paragraph [ref=e50]: "Upload a transcript interactively:"\n          - paragraph [ref=e51]: $ npx claude-code-uploader\n      - generic [ref=e52]:\n        - heading "SEE ALSO" [level=2] [ref=e53]\n        - paragraph [ref=e55]: claude(1), git(1)\n    - paragraph [ref=e57]: Claude Code Transcript Uploader v1.0.0\n  - status [ref=e59]:\n    - generic [ref=e60]:\n      - img [ref=e62]\n      - generic [ref=e64]:\n        - text: Static route\n        - button "Hide static indicator" [ref=e65] [cursor=pointer]:\n          - img [ref=e66] [cursor=pointer]\n  - alert [ref=e70]\n```',
                },
              ],
            },
          ],
        },
        uuid: "afd8d4d0-e8eb-4714-bea9-40ae3d1f507b",
        timestamp: "2025-05-23T22:59:33.447Z",
        toolUseResult: [
          {
            type: "text",
            text: '- Ran Playwright code:\n```js\n// Navigate to http://localhost:3000/\nawait page.goto(\'http://localhost:3000/\');\n```\n\n- Page URL: http://localhost:3000/\n- Page Title: Claude Transcript Viewer\n- Page Snapshot\n```yaml\n- generic [ref=e1]:\n  - generic [ref=e3]:\n    - heading "CLAUDE-CODE-UPLOADER(1)" [level=1] [ref=e5]\n    - generic [ref=e7]:\n      - generic [ref=e8]:\n        - heading "NAME" [level=2] [ref=e9]\n        - paragraph [ref=e10]: claude-code-uploader - upload Claude Code transcripts to web viewer\n      - generic [ref=e11]:\n        - heading "SYNOPSIS" [level=2] [ref=e12]\n        - paragraph [ref=e13]: npx claude-code-uploader\n      - generic [ref=e14]:\n        - heading "DESCRIPTION" [level=2] [ref=e15]\n        - generic [ref=e16]:\n          - paragraph [ref=e17]:\n            - text: The\n            - generic [ref=e18]: claude-code-uploader\n            - text: utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.\n          - paragraph [ref=e19]:\n            - text: It automatically discovers transcript files in\n            - generic [ref=e20]: ~/.claude/projects/\n            - text: and provides an interactive interface for selecting and uploading transcripts.\n      - generic [ref=e21]:\n        - heading "USAGE" [level=2] [ref=e22]\n        - generic [ref=e23]:\n          - generic [ref=e24]:\n            - paragraph [ref=e25]: $ npx claude-code-uploader\n            - generic [ref=e26]:\n              - paragraph [ref=e27]: "? Select a transcript to upload: (Use arrow keys)"\n              - paragraph [ref=e28]: ❯ project-alpha/transcript-2024-01-15.jsonl\n              - paragraph [ref=e29]: project-beta/transcript-2024-01-14.jsonl\n              - paragraph [ref=e30]: project-gamma/transcript-2024-01-13.jsonl\n          - generic [ref=e31]:\n            - paragraph [ref=e32]: ✓ Uploaded transcript successfully!\n            - paragraph [ref=e33]: "View at: https://claude-code-viewer.vercel.app/abc123..."\n      - generic [ref=e34]:\n        - heading "FILES" [level=2] [ref=e35]\n        - generic [ref=e36]:\n          - paragraph [ref=e37]:\n            - generic [ref=e38]: ~/.claude/projects/\n          - paragraph [ref=e39]: Default directory where Claude Code stores project transcripts\n      - generic [ref=e40]:\n        - heading "EXIT STATUS" [level=2] [ref=e41]\n        - generic [ref=e42]:\n          - paragraph [ref=e43]:\n            - generic [ref=e44]: "0"\n            - text: Successful upload\n          - paragraph [ref=e45]:\n            - generic [ref=e46]: "1"\n            - text: Upload failed or user cancelled\n      - generic [ref=e47]:\n        - heading "EXAMPLES" [level=2] [ref=e48]\n        - generic [ref=e49]:\n          - paragraph [ref=e50]: "Upload a transcript interactively:"\n          - paragraph [ref=e51]: $ npx claude-code-uploader\n      - generic [ref=e52]:\n        - heading "SEE ALSO" [level=2] [ref=e53]\n        - paragraph [ref=e55]: claude(1), git(1)\n    - paragraph [ref=e57]: Claude Code Transcript Uploader v1.0.0\n  - status [ref=e59]:\n    - generic [ref=e60]:\n      - img [ref=e62]\n      - generic [ref=e64]:\n        - text: Static route\n        - button "Hide static indicator" [ref=e65] [cursor=pointer]:\n          - img [ref=e66] [cursor=pointer]\n  - alert [ref=e70]\n```',
          },
        ],
      },
      {
        parentUuid: "afd8d4d0-e8eb-4714-bea9-40ae3d1f507b",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_01VKq7hYwqNWAk3SX9y2QEfz",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "tool_use",
              id: "toolu_017hNt5KnNkb3XYN4qWpzJz1",
              name: "Edit",
              input: {
                file_path: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                old_string:
                  'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-green-400 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="text-xl font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
                new_string:
                  'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-gray-600 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
              },
            },
          ],
          stop_reason: "tool_use",
          stop_sequence: null,
          usage: {
            input_tokens: 5,
            cache_creation_input_tokens: 1115,
            cache_read_input_tokens: 25669,
            output_tokens: 2303,
            service_tier: "standard",
          },
        },
        costUSD: 0.042872864999999996,
        durationMs: 26074,
        type: "assistant",
        uuid: "90c0c0b5-727d-4220-afb9-69ec13b024f0",
        timestamp: "2025-05-23T22:59:59.540Z",
      },
      {
        parentUuid: "90c0c0b5-727d-4220-afb9-69ec13b024f0",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        type: "user",
        message: {
          role: "user",
          content: [
            {
              tool_use_id: "toolu_017hNt5KnNkb3XYN4qWpzJz1",
              type: "tool_result",
              content:
                'The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here\'s the result of running `cat -n` on a snippet of the edited file:\n     1\texport default function Home() {\n     2\t  return (\n     3\t    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n     4\t      <div className="max-w-4xl mx-auto">\n     5\t        <div className="mb-8">\n     6\t          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n     7\t          <div className="border-b border-gray-600 mb-4"></div>\n     8\t        </div>\n     9\t\n    10\t        <div className="space-y-6">\n    11\t          <section>\n    12\t            <h2 className="font-bold mb-2">NAME</h2>\n    13\t            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n    14\t          </section>\n    15\t\n    16\t          <section>\n    17\t            <h2 className="font-bold mb-2">SYNOPSIS</h2>\n    18\t            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n    19\t          </section>\n    20\t\n    21\t          <section>\n    22\t            <h2 className="font-bold mb-2">DESCRIPTION</h2>\n    23\t            <div className="ml-8 space-y-2">\n    24\t              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n    25\t              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n    26\t            </div>\n    27\t          </section>\n    28\t\n    29\t          <section>\n    30\t            <h2 className="font-bold mb-2">USAGE</h2>\n    31\t            <div className="ml-8 space-y-4">\n    32\t              <div>\n    33\t                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n    34\t                <div className="ml-4 text-gray-400">\n    35\t                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n    36\t                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n    37\t                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n    38\t                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n    39\t                </div>\n    40\t              </div>\n    41\t              <div>\n    42\t                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n    43\t                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n    44\t              </div>\n    45\t            </div>\n    46\t          </section>\n    47\t\n    48\t          <section>\n    49\t            <h2 className="font-bold mb-2">FILES</h2>\n    50\t            <div className="ml-8">\n    51\t              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n    52\t              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n    53\t            </div>\n    54\t          </section>\n    55\t\n    56\t          <section>\n    57\t            <h2 className="font-bold mb-2">EXIT STATUS</h2>\n    58\t            <div className="ml-8 space-y-1">\n    59\t              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n    60\t              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n    61\t            </div>\n    62\t          </section>\n    63\t\n    64\t          <section>\n    65\t            <h2 className="font-bold mb-2">EXAMPLES</h2>\n    66\t            <div className="ml-8 space-y-2">\n    67\t              <p>Upload a transcript interactively:</p>\n    68\t              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n    69\t            </div>\n    70\t          </section>\n    71\t\n    72\t          <section>\n    73\t            <h2 className="font-bold mb-2">SEE ALSO</h2>\n    74\t            <div className="ml-8">\n    75\t              <p>claude(1), git(1)</p>\n    76\t            </div>\n    77\t          </section>\n    78\t        </div>\n    79\t\n    80\t        <div className="mt-12 text-center text-gray-500">\n    81\t          <p>Claude Code Transcript Uploader v1.0.0</p>\n    82\t        </div>\n    83\t      </div>\n    84\t    </div>\n    85\t  );\n    86\t}',
            },
          ],
        },
        uuid: "fc8ead34-c498-4bfd-936f-dac3de9fd33e",
        timestamp: "2025-05-23T22:59:59.558Z",
        toolUseResult: {
          filePath: "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
          oldString:
            'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-green-400 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="text-xl font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
          newString:
            'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-gray-600 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
          originalFile:
            'export default function Home() {\n  return (\n    <div className="min-h-screen bg-black text-green-400 font-mono p-8">\n      <div className="max-w-4xl mx-auto">\n        <div className="mb-8">\n          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>\n          <div className="border-b border-green-400 mb-4"></div>\n        </div>\n\n        <div className="space-y-6">\n          <section>\n            <h2 className="text-xl font-bold mb-2">NAME</h2>\n            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>\n            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>\n            <div className="ml-8 space-y-2">\n              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>\n              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">USAGE</h2>\n            <div className="ml-8 space-y-4">\n              <div>\n                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>\n                <div className="ml-4 text-gray-400">\n                  <p>? Select a transcript to upload: (Use arrow keys)</p>\n                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>\n                  <p>  project-beta/transcript-2024-01-14.jsonl</p>\n                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>\n                </div>\n              </div>\n              <div>\n                <p className="text-green-300">✓ Uploaded transcript successfully!</p>\n                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>\n              </div>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">FILES</h2>\n            <div className="ml-8">\n              <p><span className="text-cyan-400">~/.claude/projects/</span></p>\n              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>\n            <div className="ml-8 space-y-1">\n              <p><span className="text-yellow-400">0</span>   Successful upload</p>\n              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>\n            <div className="ml-8 space-y-2">\n              <p>Upload a transcript interactively:</p>\n              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>\n            </div>\n          </section>\n\n          <section>\n            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>\n            <div className="ml-8">\n              <p>claude(1), git(1)</p>\n            </div>\n          </section>\n        </div>\n\n        <div className="mt-12 text-center text-gray-500">\n          <p>Claude Code Transcript Uploader v1.0.0</p>\n        </div>\n      </div>\n    </div>\n  );\n}',
          structuredPatch: [
            {
              oldStart: 3,
              oldLines: 23,
              newStart: 3,
              newLines: 23,
              lines: [
                '     <div className="min-h-screen bg-black text-green-400 font-mono p-8">',
                '       <div className="max-w-4xl mx-auto">',
                '         <div className="mb-8">',
                '-          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>',
                '-          <div className="border-b border-green-400 mb-4"></div>',
                '+          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>',
                '+          <div className="border-b border-gray-600 mb-4"></div>',
                "         </div>",
                " ",
                '         <div className="space-y-6">',
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">NAME</h2>',
                '+            <h2 className="font-bold mb-2">NAME</h2>',
                '             <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>',
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>',
                '+            <h2 className="font-bold mb-2">SYNOPSIS</h2>',
                '             <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>',
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>',
                '+            <h2 className="font-bold mb-2">DESCRIPTION</h2>',
                '             <div className="ml-8 space-y-2">',
                '               <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>',
                '               <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>',
              ],
            },
            {
              oldStart: 27,
              oldLines: 7,
              newStart: 27,
              newLines: 7,
              lines: [
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">USAGE</h2>',
                '+            <h2 className="font-bold mb-2">USAGE</h2>',
                '             <div className="ml-8 space-y-4">',
                "               <div>",
                '                 <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>',
              ],
            },
            {
              oldStart: 46,
              oldLines: 7,
              newStart: 46,
              newLines: 7,
              lines: [
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">FILES</h2>',
                '+            <h2 className="font-bold mb-2">FILES</h2>',
                '             <div className="ml-8">',
                '               <p><span className="text-cyan-400">~/.claude/projects/</span></p>',
                '               <p className="ml-8">Default directory where Claude Code stores project transcripts</p>',
              ],
            },
            {
              oldStart: 54,
              oldLines: 7,
              newStart: 54,
              newLines: 7,
              lines: [
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>',
                '+            <h2 className="font-bold mb-2">EXIT STATUS</h2>',
                '             <div className="ml-8 space-y-1">',
                '               <p><span className="text-yellow-400">0</span>   Successful upload</p>',
                '               <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>',
              ],
            },
            {
              oldStart: 62,
              oldLines: 7,
              newStart: 62,
              newLines: 7,
              lines: [
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>',
                '+            <h2 className="font-bold mb-2">EXAMPLES</h2>',
                '             <div className="ml-8 space-y-2">',
                "               <p>Upload a transcript interactively:</p>",
                '               <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>',
              ],
            },
            {
              oldStart: 70,
              oldLines: 7,
              newStart: 70,
              newLines: 7,
              lines: [
                "           </section>",
                " ",
                "           <section>",
                '-            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>',
                '+            <h2 className="font-bold mb-2">SEE ALSO</h2>',
                '             <div className="ml-8">',
                "               <p>claude(1), git(1)</p>",
                "             </div>",
              ],
            },
          ],
        },
      },
      {
        parentUuid: "fc8ead34-c498-4bfd-936f-dac3de9fd33e",
        isSidechain: false,
        userType: "external",
        cwd: "/Users/philipp/dev/claude-code-viewer",
        sessionId: "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
        version: "1.0.3",
        message: {
          id: "msg_01329kAtxZ5dYKwhQfDY9qtQ",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-20250514",
          content: [
            {
              type: "text",
              text: "Made all fonts the same default size by removing `text-2xl` and `text-xl` size modifiers, and changed the border color from bright `border-green-400` to a more subdued `border-gray-600`.",
            },
          ],
          stop_reason: "end_turn",
          stop_sequence: null,
          usage: {
            input_tokens: 4,
            cache_creation_input_tokens: 3714,
            cache_read_input_tokens: 26784,
            output_tokens: 54,
            service_tier: "standard",
          },
        },
        costUSD: 0.016192289999999998,
        durationMs: 3500,
        type: "assistant",
        uuid: "264d57dc-6c1f-4449-8476-49bddb027b98",
        timestamp: "2025-05-23T23:00:03.089Z",
      },
    ];

    expect(buildMessageTree(messages)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "children": [
                                    {
                                      "children": [
                                        {
                                          "children": [
                                            {
                                              "children": [
                                                {
                                                  "children": [
                                                    {
                                                      "children": [],
                                                      "message": {
                                                        "costUSD": 0.016192289999999998,
                                                        "cwd": "/Users/philipp/dev/claude-code-viewer",
                                                        "durationMs": 3500,
                                                        "isSidechain": false,
                                                        "message": {
                                                          "content": [
                                                            {
                                                              "text": "Made all fonts the same default size by removing \`text-2xl\` and \`text-xl\` size modifiers, and changed the border color from bright \`border-green-400\` to a more subdued \`border-gray-600\`.",
                                                              "type": "text",
                                                            },
                                                          ],
                                                          "id": "msg_01329kAtxZ5dYKwhQfDY9qtQ",
                                                          "model": "claude-sonnet-4-20250514",
                                                          "role": "assistant",
                                                          "stop_reason": "end_turn",
                                                          "stop_sequence": null,
                                                          "type": "message",
                                                          "usage": {
                                                            "cache_creation_input_tokens": 3714,
                                                            "cache_read_input_tokens": 26784,
                                                            "input_tokens": 4,
                                                            "output_tokens": 54,
                                                            "service_tier": "standard",
                                                          },
                                                        },
                                                        "parentUuid": "fc8ead34-c498-4bfd-936f-dac3de9fd33e",
                                                        "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                                        "timestamp": "2025-05-23T23:00:03.089Z",
                                                        "type": "assistant",
                                                        "userType": "external",
                                                        "uuid": "264d57dc-6c1f-4449-8476-49bddb027b98",
                                                        "version": "1.0.3",
                                                      },
                                                    },
                                                  ],
                                                  "message": {
                                                    "cwd": "/Users/philipp/dev/claude-code-viewer",
                                                    "isSidechain": false,
                                                    "message": {
                                                      "content": [
                                                        {
                                                          "content": "The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
           1	export default function Home() {
           2	  return (
           3	    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
           4	      <div className="max-w-4xl mx-auto">
           5	        <div className="mb-8">
           6	          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
           7	          <div className="border-b border-gray-600 mb-4"></div>
           8	        </div>
           9	
          10	        <div className="space-y-6">
          11	          <section>
          12	            <h2 className="font-bold mb-2">NAME</h2>
          13	            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
          14	          </section>
          15	
          16	          <section>
          17	            <h2 className="font-bold mb-2">SYNOPSIS</h2>
          18	            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
          19	          </section>
          20	
          21	          <section>
          22	            <h2 className="font-bold mb-2">DESCRIPTION</h2>
          23	            <div className="ml-8 space-y-2">
          24	              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
          25	              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
          26	            </div>
          27	          </section>
          28	
          29	          <section>
          30	            <h2 className="font-bold mb-2">USAGE</h2>
          31	            <div className="ml-8 space-y-4">
          32	              <div>
          33	                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
          34	                <div className="ml-4 text-gray-400">
          35	                  <p>? Select a transcript to upload: (Use arrow keys)</p>
          36	                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
          37	                  <p>  project-beta/transcript-2024-01-14.jsonl</p>
          38	                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>
          39	                </div>
          40	              </div>
          41	              <div>
          42	                <p className="text-green-300">✓ Uploaded transcript successfully!</p>
          43	                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
          44	              </div>
          45	            </div>
          46	          </section>
          47	
          48	          <section>
          49	            <h2 className="font-bold mb-2">FILES</h2>
          50	            <div className="ml-8">
          51	              <p><span className="text-cyan-400">~/.claude/projects/</span></p>
          52	              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
          53	            </div>
          54	          </section>
          55	
          56	          <section>
          57	            <h2 className="font-bold mb-2">EXIT STATUS</h2>
          58	            <div className="ml-8 space-y-1">
          59	              <p><span className="text-yellow-400">0</span>   Successful upload</p>
          60	              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
          61	            </div>
          62	          </section>
          63	
          64	          <section>
          65	            <h2 className="font-bold mb-2">EXAMPLES</h2>
          66	            <div className="ml-8 space-y-2">
          67	              <p>Upload a transcript interactively:</p>
          68	              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
          69	            </div>
          70	          </section>
          71	
          72	          <section>
          73	            <h2 className="font-bold mb-2">SEE ALSO</h2>
          74	            <div className="ml-8">
          75	              <p>claude(1), git(1)</p>
          76	            </div>
          77	          </section>
          78	        </div>
          79	
          80	        <div className="mt-12 text-center text-gray-500">
          81	          <p>Claude Code Transcript Uploader v1.0.0</p>
          82	        </div>
          83	      </div>
          84	    </div>
          85	  );
          86	}",
                                                          "tool_use_id": "toolu_017hNt5KnNkb3XYN4qWpzJz1",
                                                          "type": "tool_result",
                                                        },
                                                      ],
                                                      "role": "user",
                                                    },
                                                    "parentUuid": "90c0c0b5-727d-4220-afb9-69ec13b024f0",
                                                    "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                                    "timestamp": "2025-05-23T22:59:59.558Z",
                                                    "toolUseResult": {
                                                      "filePath": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                                                      "newString": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-gray-600 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                                      "oldString": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-green-400 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                                      "originalFile": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-green-400 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                                      "structuredPatch": [
                                                        {
                                                          "lines": [
                                                            "     <div className="min-h-screen bg-black text-green-400 font-mono p-8">",
                                                            "       <div className="max-w-4xl mx-auto">",
                                                            "         <div className="mb-8">",
                                                            "-          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>",
                                                            "-          <div className="border-b border-green-400 mb-4"></div>",
                                                            "+          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>",
                                                            "+          <div className="border-b border-gray-600 mb-4"></div>",
                                                            "         </div>",
                                                            " ",
                                                            "         <div className="space-y-6">",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">NAME</h2>",
                                                            "+            <h2 className="font-bold mb-2">NAME</h2>",
                                                            "             <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>",
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>",
                                                            "+            <h2 className="font-bold mb-2">SYNOPSIS</h2>",
                                                            "             <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>",
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>",
                                                            "+            <h2 className="font-bold mb-2">DESCRIPTION</h2>",
                                                            "             <div className="ml-8 space-y-2">",
                                                            "               <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>",
                                                            "               <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>",
                                                          ],
                                                          "newLines": 23,
                                                          "newStart": 3,
                                                          "oldLines": 23,
                                                          "oldStart": 3,
                                                        },
                                                        {
                                                          "lines": [
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">USAGE</h2>",
                                                            "+            <h2 className="font-bold mb-2">USAGE</h2>",
                                                            "             <div className="ml-8 space-y-4">",
                                                            "               <div>",
                                                            "                 <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>",
                                                          ],
                                                          "newLines": 7,
                                                          "newStart": 27,
                                                          "oldLines": 7,
                                                          "oldStart": 27,
                                                        },
                                                        {
                                                          "lines": [
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">FILES</h2>",
                                                            "+            <h2 className="font-bold mb-2">FILES</h2>",
                                                            "             <div className="ml-8">",
                                                            "               <p><span className="text-cyan-400">~/.claude/projects/</span></p>",
                                                            "               <p className="ml-8">Default directory where Claude Code stores project transcripts</p>",
                                                          ],
                                                          "newLines": 7,
                                                          "newStart": 46,
                                                          "oldLines": 7,
                                                          "oldStart": 46,
                                                        },
                                                        {
                                                          "lines": [
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>",
                                                            "+            <h2 className="font-bold mb-2">EXIT STATUS</h2>",
                                                            "             <div className="ml-8 space-y-1">",
                                                            "               <p><span className="text-yellow-400">0</span>   Successful upload</p>",
                                                            "               <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>",
                                                          ],
                                                          "newLines": 7,
                                                          "newStart": 54,
                                                          "oldLines": 7,
                                                          "oldStart": 54,
                                                        },
                                                        {
                                                          "lines": [
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>",
                                                            "+            <h2 className="font-bold mb-2">EXAMPLES</h2>",
                                                            "             <div className="ml-8 space-y-2">",
                                                            "               <p>Upload a transcript interactively:</p>",
                                                            "               <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>",
                                                          ],
                                                          "newLines": 7,
                                                          "newStart": 62,
                                                          "oldLines": 7,
                                                          "oldStart": 62,
                                                        },
                                                        {
                                                          "lines": [
                                                            "           </section>",
                                                            " ",
                                                            "           <section>",
                                                            "-            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>",
                                                            "+            <h2 className="font-bold mb-2">SEE ALSO</h2>",
                                                            "             <div className="ml-8">",
                                                            "               <p>claude(1), git(1)</p>",
                                                            "             </div>",
                                                          ],
                                                          "newLines": 7,
                                                          "newStart": 70,
                                                          "oldLines": 7,
                                                          "oldStart": 70,
                                                        },
                                                      ],
                                                    },
                                                    "type": "user",
                                                    "userType": "external",
                                                    "uuid": "fc8ead34-c498-4bfd-936f-dac3de9fd33e",
                                                    "version": "1.0.3",
                                                  },
                                                },
                                              ],
                                              "message": {
                                                "costUSD": 0.042872864999999996,
                                                "cwd": "/Users/philipp/dev/claude-code-viewer",
                                                "durationMs": 26074,
                                                "isSidechain": false,
                                                "message": {
                                                  "content": [
                                                    {
                                                      "id": "toolu_017hNt5KnNkb3XYN4qWpzJz1",
                                                      "input": {
                                                        "file_path": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                                                        "new_string": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-gray-600 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                                        "old_string": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-green-400 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                                      },
                                                      "name": "Edit",
                                                      "type": "tool_use",
                                                    },
                                                  ],
                                                  "id": "msg_01VKq7hYwqNWAk3SX9y2QEfz",
                                                  "model": "claude-sonnet-4-20250514",
                                                  "role": "assistant",
                                                  "stop_reason": "tool_use",
                                                  "stop_sequence": null,
                                                  "type": "message",
                                                  "usage": {
                                                    "cache_creation_input_tokens": 1115,
                                                    "cache_read_input_tokens": 25669,
                                                    "input_tokens": 5,
                                                    "output_tokens": 2303,
                                                    "service_tier": "standard",
                                                  },
                                                },
                                                "parentUuid": "afd8d4d0-e8eb-4714-bea9-40ae3d1f507b",
                                                "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                                "timestamp": "2025-05-23T22:59:59.540Z",
                                                "type": "assistant",
                                                "userType": "external",
                                                "uuid": "90c0c0b5-727d-4220-afb9-69ec13b024f0",
                                                "version": "1.0.3",
                                              },
                                              "toolResult": {
                                                "toolu_017hNt5KnNkb3XYN4qWpzJz1": "The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
           1	export default function Home() {
           2	  return (
           3	    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
           4	      <div className="max-w-4xl mx-auto">
           5	        <div className="mb-8">
           6	          <h1 className="font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
           7	          <div className="border-b border-gray-600 mb-4"></div>
           8	        </div>
           9	
          10	        <div className="space-y-6">
          11	          <section>
          12	            <h2 className="font-bold mb-2">NAME</h2>
          13	            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
          14	          </section>
          15	
          16	          <section>
          17	            <h2 className="font-bold mb-2">SYNOPSIS</h2>
          18	            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
          19	          </section>
          20	
          21	          <section>
          22	            <h2 className="font-bold mb-2">DESCRIPTION</h2>
          23	            <div className="ml-8 space-y-2">
          24	              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
          25	              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
          26	            </div>
          27	          </section>
          28	
          29	          <section>
          30	            <h2 className="font-bold mb-2">USAGE</h2>
          31	            <div className="ml-8 space-y-4">
          32	              <div>
          33	                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
          34	                <div className="ml-4 text-gray-400">
          35	                  <p>? Select a transcript to upload: (Use arrow keys)</p>
          36	                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
          37	                  <p>  project-beta/transcript-2024-01-14.jsonl</p>
          38	                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>
          39	                </div>
          40	              </div>
          41	              <div>
          42	                <p className="text-green-300">✓ Uploaded transcript successfully!</p>
          43	                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
          44	              </div>
          45	            </div>
          46	          </section>
          47	
          48	          <section>
          49	            <h2 className="font-bold mb-2">FILES</h2>
          50	            <div className="ml-8">
          51	              <p><span className="text-cyan-400">~/.claude/projects/</span></p>
          52	              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
          53	            </div>
          54	          </section>
          55	
          56	          <section>
          57	            <h2 className="font-bold mb-2">EXIT STATUS</h2>
          58	            <div className="ml-8 space-y-1">
          59	              <p><span className="text-yellow-400">0</span>   Successful upload</p>
          60	              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
          61	            </div>
          62	          </section>
          63	
          64	          <section>
          65	            <h2 className="font-bold mb-2">EXAMPLES</h2>
          66	            <div className="ml-8 space-y-2">
          67	              <p>Upload a transcript interactively:</p>
          68	              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
          69	            </div>
          70	          </section>
          71	
          72	          <section>
          73	            <h2 className="font-bold mb-2">SEE ALSO</h2>
          74	            <div className="ml-8">
          75	              <p>claude(1), git(1)</p>
          76	            </div>
          77	          </section>
          78	        </div>
          79	
          80	        <div className="mt-12 text-center text-gray-500">
          81	          <p>Claude Code Transcript Uploader v1.0.0</p>
          82	        </div>
          83	      </div>
          84	    </div>
          85	  );
          86	}",
                                              },
                                            },
                                          ],
                                          "message": {
                                            "cwd": "/Users/philipp/dev/claude-code-viewer",
                                            "isSidechain": false,
                                            "message": {
                                              "content": [
                                                {
                                                  "content": [
                                                    {
                                                      "text": "- Ran Playwright code:
      \`\`\`js
      // Navigate to http://localhost:3000/
      await page.goto('http://localhost:3000/');
      \`\`\`

      - Page URL: http://localhost:3000/
      - Page Title: Claude Transcript Viewer
      - Page Snapshot
      \`\`\`yaml
      - generic [ref=e1]:
        - generic [ref=e3]:
          - heading "CLAUDE-CODE-UPLOADER(1)" [level=1] [ref=e5]
          - generic [ref=e7]:
            - generic [ref=e8]:
              - heading "NAME" [level=2] [ref=e9]
              - paragraph [ref=e10]: claude-code-uploader - upload Claude Code transcripts to web viewer
            - generic [ref=e11]:
              - heading "SYNOPSIS" [level=2] [ref=e12]
              - paragraph [ref=e13]: npx claude-code-uploader
            - generic [ref=e14]:
              - heading "DESCRIPTION" [level=2] [ref=e15]
              - generic [ref=e16]:
                - paragraph [ref=e17]:
                  - text: The
                  - generic [ref=e18]: claude-code-uploader
                  - text: utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.
                - paragraph [ref=e19]:
                  - text: It automatically discovers transcript files in
                  - generic [ref=e20]: ~/.claude/projects/
                  - text: and provides an interactive interface for selecting and uploading transcripts.
            - generic [ref=e21]:
              - heading "USAGE" [level=2] [ref=e22]
              - generic [ref=e23]:
                - generic [ref=e24]:
                  - paragraph [ref=e25]: $ npx claude-code-uploader
                  - generic [ref=e26]:
                    - paragraph [ref=e27]: "? Select a transcript to upload: (Use arrow keys)"
                    - paragraph [ref=e28]: ❯ project-alpha/transcript-2024-01-15.jsonl
                    - paragraph [ref=e29]: project-beta/transcript-2024-01-14.jsonl
                    - paragraph [ref=e30]: project-gamma/transcript-2024-01-13.jsonl
                - generic [ref=e31]:
                  - paragraph [ref=e32]: ✓ Uploaded transcript successfully!
                  - paragraph [ref=e33]: "View at: https://claude-code-viewer.vercel.app/abc123..."
            - generic [ref=e34]:
              - heading "FILES" [level=2] [ref=e35]
              - generic [ref=e36]:
                - paragraph [ref=e37]:
                  - generic [ref=e38]: ~/.claude/projects/
                - paragraph [ref=e39]: Default directory where Claude Code stores project transcripts
            - generic [ref=e40]:
              - heading "EXIT STATUS" [level=2] [ref=e41]
              - generic [ref=e42]:
                - paragraph [ref=e43]:
                  - generic [ref=e44]: "0"
                  - text: Successful upload
                - paragraph [ref=e45]:
                  - generic [ref=e46]: "1"
                  - text: Upload failed or user cancelled
            - generic [ref=e47]:
              - heading "EXAMPLES" [level=2] [ref=e48]
              - generic [ref=e49]:
                - paragraph [ref=e50]: "Upload a transcript interactively:"
                - paragraph [ref=e51]: $ npx claude-code-uploader
            - generic [ref=e52]:
              - heading "SEE ALSO" [level=2] [ref=e53]
              - paragraph [ref=e55]: claude(1), git(1)
          - paragraph [ref=e57]: Claude Code Transcript Uploader v1.0.0
        - status [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e64]:
              - text: Static route
              - button "Hide static indicator" [ref=e65] [cursor=pointer]:
                - img [ref=e66] [cursor=pointer]
        - alert [ref=e70]
      \`\`\`",
                                                      "type": "text",
                                                    },
                                                  ],
                                                  "tool_use_id": "toolu_01JiZoTTJyESKMKhnhLku4Hv",
                                                  "type": "tool_result",
                                                },
                                              ],
                                              "role": "user",
                                            },
                                            "parentUuid": "f3747c27-0890-4b7a-a0c5-5cee982f983c",
                                            "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                            "timestamp": "2025-05-23T22:59:33.447Z",
                                            "toolUseResult": [
                                              {
                                                "text": "- Ran Playwright code:
      \`\`\`js
      // Navigate to http://localhost:3000/
      await page.goto('http://localhost:3000/');
      \`\`\`

      - Page URL: http://localhost:3000/
      - Page Title: Claude Transcript Viewer
      - Page Snapshot
      \`\`\`yaml
      - generic [ref=e1]:
        - generic [ref=e3]:
          - heading "CLAUDE-CODE-UPLOADER(1)" [level=1] [ref=e5]
          - generic [ref=e7]:
            - generic [ref=e8]:
              - heading "NAME" [level=2] [ref=e9]
              - paragraph [ref=e10]: claude-code-uploader - upload Claude Code transcripts to web viewer
            - generic [ref=e11]:
              - heading "SYNOPSIS" [level=2] [ref=e12]
              - paragraph [ref=e13]: npx claude-code-uploader
            - generic [ref=e14]:
              - heading "DESCRIPTION" [level=2] [ref=e15]
              - generic [ref=e16]:
                - paragraph [ref=e17]:
                  - text: The
                  - generic [ref=e18]: claude-code-uploader
                  - text: utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.
                - paragraph [ref=e19]:
                  - text: It automatically discovers transcript files in
                  - generic [ref=e20]: ~/.claude/projects/
                  - text: and provides an interactive interface for selecting and uploading transcripts.
            - generic [ref=e21]:
              - heading "USAGE" [level=2] [ref=e22]
              - generic [ref=e23]:
                - generic [ref=e24]:
                  - paragraph [ref=e25]: $ npx claude-code-uploader
                  - generic [ref=e26]:
                    - paragraph [ref=e27]: "? Select a transcript to upload: (Use arrow keys)"
                    - paragraph [ref=e28]: ❯ project-alpha/transcript-2024-01-15.jsonl
                    - paragraph [ref=e29]: project-beta/transcript-2024-01-14.jsonl
                    - paragraph [ref=e30]: project-gamma/transcript-2024-01-13.jsonl
                - generic [ref=e31]:
                  - paragraph [ref=e32]: ✓ Uploaded transcript successfully!
                  - paragraph [ref=e33]: "View at: https://claude-code-viewer.vercel.app/abc123..."
            - generic [ref=e34]:
              - heading "FILES" [level=2] [ref=e35]
              - generic [ref=e36]:
                - paragraph [ref=e37]:
                  - generic [ref=e38]: ~/.claude/projects/
                - paragraph [ref=e39]: Default directory where Claude Code stores project transcripts
            - generic [ref=e40]:
              - heading "EXIT STATUS" [level=2] [ref=e41]
              - generic [ref=e42]:
                - paragraph [ref=e43]:
                  - generic [ref=e44]: "0"
                  - text: Successful upload
                - paragraph [ref=e45]:
                  - generic [ref=e46]: "1"
                  - text: Upload failed or user cancelled
            - generic [ref=e47]:
              - heading "EXAMPLES" [level=2] [ref=e48]
              - generic [ref=e49]:
                - paragraph [ref=e50]: "Upload a transcript interactively:"
                - paragraph [ref=e51]: $ npx claude-code-uploader
            - generic [ref=e52]:
              - heading "SEE ALSO" [level=2] [ref=e53]
              - paragraph [ref=e55]: claude(1), git(1)
          - paragraph [ref=e57]: Claude Code Transcript Uploader v1.0.0
        - status [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e64]:
              - text: Static route
              - button "Hide static indicator" [ref=e65] [cursor=pointer]:
                - img [ref=e66] [cursor=pointer]
        - alert [ref=e70]
      \`\`\`",
                                                "type": "text",
                                              },
                                            ],
                                            "type": "user",
                                            "userType": "external",
                                            "uuid": "afd8d4d0-e8eb-4714-bea9-40ae3d1f507b",
                                            "version": "1.0.3",
                                          },
                                        },
                                      ],
                                      "message": {
                                        "costUSD": 0.00661068,
                                        "cwd": "/Users/philipp/dev/claude-code-viewer",
                                        "durationMs": 2339,
                                        "isSidechain": false,
                                        "message": {
                                          "content": [
                                            {
                                              "id": "toolu_01JiZoTTJyESKMKhnhLku4Hv",
                                              "input": {
                                                "url": "http://localhost:3000/",
                                              },
                                              "name": "mcp__playwright__browser_navigate",
                                              "type": "tool_use",
                                            },
                                          ],
                                          "id": "msg_01Q1yr1XZ2v7pxbpQMuLAyh6",
                                          "model": "claude-sonnet-4-20250514",
                                          "role": "assistant",
                                          "stop_reason": "tool_use",
                                          "stop_sequence": null,
                                          "type": "message",
                                          "usage": {
                                            "cache_creation_input_tokens": 106,
                                            "cache_read_input_tokens": 25563,
                                            "input_tokens": 2,
                                            "output_tokens": 64,
                                            "service_tier": "standard",
                                          },
                                        },
                                        "parentUuid": "288e575c-41d9-4ef1-af3a-f9f4530022fc",
                                        "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                        "timestamp": "2025-05-23T22:59:32.781Z",
                                        "type": "assistant",
                                        "userType": "external",
                                        "uuid": "f3747c27-0890-4b7a-a0c5-5cee982f983c",
                                        "version": "1.0.3",
                                      },
                                      "toolResult": {
                                        "toolu_01JiZoTTJyESKMKhnhLku4Hv": [
                                          {
                                            "text": "- Ran Playwright code:
      \`\`\`js
      // Navigate to http://localhost:3000/
      await page.goto('http://localhost:3000/');
      \`\`\`

      - Page URL: http://localhost:3000/
      - Page Title: Claude Transcript Viewer
      - Page Snapshot
      \`\`\`yaml
      - generic [ref=e1]:
        - generic [ref=e3]:
          - heading "CLAUDE-CODE-UPLOADER(1)" [level=1] [ref=e5]
          - generic [ref=e7]:
            - generic [ref=e8]:
              - heading "NAME" [level=2] [ref=e9]
              - paragraph [ref=e10]: claude-code-uploader - upload Claude Code transcripts to web viewer
            - generic [ref=e11]:
              - heading "SYNOPSIS" [level=2] [ref=e12]
              - paragraph [ref=e13]: npx claude-code-uploader
            - generic [ref=e14]:
              - heading "DESCRIPTION" [level=2] [ref=e15]
              - generic [ref=e16]:
                - paragraph [ref=e17]:
                  - text: The
                  - generic [ref=e18]: claude-code-uploader
                  - text: utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.
                - paragraph [ref=e19]:
                  - text: It automatically discovers transcript files in
                  - generic [ref=e20]: ~/.claude/projects/
                  - text: and provides an interactive interface for selecting and uploading transcripts.
            - generic [ref=e21]:
              - heading "USAGE" [level=2] [ref=e22]
              - generic [ref=e23]:
                - generic [ref=e24]:
                  - paragraph [ref=e25]: $ npx claude-code-uploader
                  - generic [ref=e26]:
                    - paragraph [ref=e27]: "? Select a transcript to upload: (Use arrow keys)"
                    - paragraph [ref=e28]: ❯ project-alpha/transcript-2024-01-15.jsonl
                    - paragraph [ref=e29]: project-beta/transcript-2024-01-14.jsonl
                    - paragraph [ref=e30]: project-gamma/transcript-2024-01-13.jsonl
                - generic [ref=e31]:
                  - paragraph [ref=e32]: ✓ Uploaded transcript successfully!
                  - paragraph [ref=e33]: "View at: https://claude-code-viewer.vercel.app/abc123..."
            - generic [ref=e34]:
              - heading "FILES" [level=2] [ref=e35]
              - generic [ref=e36]:
                - paragraph [ref=e37]:
                  - generic [ref=e38]: ~/.claude/projects/
                - paragraph [ref=e39]: Default directory where Claude Code stores project transcripts
            - generic [ref=e40]:
              - heading "EXIT STATUS" [level=2] [ref=e41]
              - generic [ref=e42]:
                - paragraph [ref=e43]:
                  - generic [ref=e44]: "0"
                  - text: Successful upload
                - paragraph [ref=e45]:
                  - generic [ref=e46]: "1"
                  - text: Upload failed or user cancelled
            - generic [ref=e47]:
              - heading "EXAMPLES" [level=2] [ref=e48]
              - generic [ref=e49]:
                - paragraph [ref=e50]: "Upload a transcript interactively:"
                - paragraph [ref=e51]: $ npx claude-code-uploader
            - generic [ref=e52]:
              - heading "SEE ALSO" [level=2] [ref=e53]
              - paragraph [ref=e55]: claude(1), git(1)
          - paragraph [ref=e57]: Claude Code Transcript Uploader v1.0.0
        - status [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e64]:
              - text: Static route
              - button "Hide static indicator" [ref=e65] [cursor=pointer]:
                - img [ref=e66] [cursor=pointer]
        - alert [ref=e70]
      \`\`\`",
                                            "type": "text",
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                  "message": {
                                    "cwd": "/Users/philipp/dev/claude-code-viewer",
                                    "isSidechain": false,
                                    "message": {
                                      "content": "can you make the all fonts the same size (default so no text-* size modifiers) and use a different less bright color for the border-bottom. You can look at the thing in http://localhost:3000/. ",
                                      "role": "user",
                                    },
                                    "parentUuid": "119a9b51-6a16-4c22-82b8-dc5b2a9ca87f",
                                    "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                    "timestamp": "2025-05-23T22:59:30.258Z",
                                    "type": "user",
                                    "userType": "external",
                                    "uuid": "288e575c-41d9-4ef1-af3a-f9f4530022fc",
                                    "version": "1.0.3",
                                  },
                                },
                              ],
                              "message": {
                                "costUSD": 0.017740560000000002,
                                "cwd": "/Users/philipp/dev/claude-code-viewer",
                                "durationMs": 3433,
                                "isSidechain": false,
                                "message": {
                                  "content": [
                                    {
                                      "text": "Updated the home page to display as a man page for \`npx claude-code-uploader\`. Removed all upload functionality, icons, and modernized the styling to match traditional Unix manual pages with terminal colors and monospace font.",
                                      "type": "text",
                                    },
                                  ],
                                  "id": "msg_01Bd2fahuVMgsGKc7MHW1k3U",
                                  "model": "claude-sonnet-4-20250514",
                                  "role": "assistant",
                                  "stop_reason": "end_turn",
                                  "stop_sequence": null,
                                  "type": "message",
                                  "usage": {
                                    "cache_creation_input_tokens": 4802,
                                    "cache_read_input_tokens": 20761,
                                    "input_tokens": 5,
                                    "output_tokens": 51,
                                    "service_tier": "standard",
                                  },
                                },
                                "parentUuid": "2b2cd6c6-b0cc-4ad8-a014-66c36956d4f5",
                                "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                                "timestamp": "2025-05-23T22:57:40.207Z",
                                "type": "assistant",
                                "userType": "external",
                                "uuid": "119a9b51-6a16-4c22-82b8-dc5b2a9ca87f",
                                "version": "1.0.3",
                              },
                            },
                          ],
                          "message": {
                            "cwd": "/Users/philipp/dev/claude-code-viewer",
                            "isSidechain": false,
                            "message": {
                              "content": [
                                {
                                  "content": "The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
           1	export default function Home() {
           2	  return (
           3	    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
           4	      <div className="max-w-4xl mx-auto">
           5	        <div className="mb-8">
           6	          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
           7	          <div className="border-b border-green-400 mb-4"></div>
           8	        </div>
           9	
          10	        <div className="space-y-6">
          11	          <section>
          12	            <h2 className="text-xl font-bold mb-2">NAME</h2>
          13	            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
          14	          </section>
          15	
          16	          <section>
          17	            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
          18	            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
          19	          </section>
          20	
          21	          <section>
          22	            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
          23	            <div className="ml-8 space-y-2">
          24	              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
          25	              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
          26	            </div>
          27	          </section>
          28	
          29	          <section>
          30	            <h2 className="text-xl font-bold mb-2">USAGE</h2>
          31	            <div className="ml-8 space-y-4">
          32	              <div>
          33	                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
          34	                <div className="ml-4 text-gray-400">
          35	                  <p>? Select a transcript to upload: (Use arrow keys)</p>
          36	                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
          37	                  <p>  project-beta/transcript-2024-01-14.jsonl</p>
          38	                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>
          39	                </div>
          40	              </div>
          41	              <div>
          42	                <p className="text-green-300">✓ Uploaded transcript successfully!</p>
          43	                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
          44	              </div>
          45	            </div>
          46	          </section>
          47	
          48	          <section>
          49	            <h2 className="text-xl font-bold mb-2">FILES</h2>
          50	            <div className="ml-8">
          51	              <p><span className="text-cyan-400">~/.claude/projects/</span></p>
          52	              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
          53	            </div>
          54	          </section>
          55	
          56	          <section>
          57	            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
          58	            <div className="ml-8 space-y-1">
          59	              <p><span className="text-yellow-400">0</span>   Successful upload</p>
          60	              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
          61	            </div>
          62	          </section>
          63	
          64	          <section>
          65	            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
          66	            <div className="ml-8 space-y-2">
          67	              <p>Upload a transcript interactively:</p>
          68	              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
          69	            </div>
          70	          </section>
          71	
          72	          <section>
          73	            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
          74	            <div className="ml-8">
          75	              <p>claude(1), git(1)</p>
          76	            </div>
          77	          </section>
          78	        </div>
          79	
          80	        <div className="mt-12 text-center text-gray-500">
          81	          <p>Claude Code Transcript Uploader v1.0.0</p>
          82	        </div>
          83	      </div>
          84	    </div>
          85	  );
          86	}",
                                  "tool_use_id": "toolu_01NrPwuz5QYKUmQAHVBxTEf2",
                                  "type": "tool_result",
                                },
                              ],
                              "role": "user",
                            },
                            "parentUuid": "0917c46c-6d13-44fd-83ba-784d505be491",
                            "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                            "timestamp": "2025-05-23T22:57:36.696Z",
                            "toolUseResult": {
                              "filePath": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                              "newString": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-green-400 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                              "oldString": "'use client';

      import { useState } from 'react';
      import { useRouter } from 'next/navigation';

      export default function Home() {
        const router = useRouter();
        const [uploading, setUploading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [dragActive, setDragActive] = useState(false);

        const handleDrag = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        };

        const handleFile = async (file: File) => {
          if (!file.name.endsWith('.jsonl')) {
            setError('Please upload a .jsonl file');
            return;
          }

          setUploading(true);
          setError(null);

          try {
            // Read file content
            const content = await file.text();
            
            // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
            const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
            const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
            
            // Parse JSONL to extract metadata
            const lines = content.trim().split('\\n');
            let projectPath = '';
            let summary = '';
            
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.type === 'project_info' && data.project_path) {
                  projectPath = data.project_path;
                }
                if (data.type === 'summary' && data.content) {
                  summary = data.content;
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }

            // Upload directly to storage worker
            const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transcript: content,
                directory: projectPath || undefined,
                repo: summary || undefined,
              }),
            });

            if (!response.ok) {
              throw new Error(\`Upload failed with status \${response.status}\`);
            }

            router.push(\`/\${id}\`);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            setUploading(false);
          }
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
              </div>

              {/* Upload area */}
              <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }\`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".jsonl"
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <label
                    htmlFor="file-upload"
                    className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Choose file'}
                  </label>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    or drag and drop your transcript-*.jsonl file here
                  </p>
                </div>
              </form>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                <p>To get your transcript:</p>
                <ol className="mt-2 space-y-1">
                  <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
                  <li>2. Find the transcript-*.jsonl file in your save directory</li>
                  <li>3. Upload it here to view the conversation</li>
                </ol>
              </div>
            </div>
          </div>
        );
      }",
                              "originalFile": "'use client';

      import { useState } from 'react';
      import { useRouter } from 'next/navigation';

      export default function Home() {
        const router = useRouter();
        const [uploading, setUploading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [dragActive, setDragActive] = useState(false);

        const handleDrag = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        };

        const handleFile = async (file: File) => {
          if (!file.name.endsWith('.jsonl')) {
            setError('Please upload a .jsonl file');
            return;
          }

          setUploading(true);
          setError(null);

          try {
            // Read file content
            const content = await file.text();
            
            // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
            const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
            const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
            
            // Parse JSONL to extract metadata
            const lines = content.trim().split('\\n');
            let projectPath = '';
            let summary = '';
            
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.type === 'project_info' && data.project_path) {
                  projectPath = data.project_path;
                }
                if (data.type === 'summary' && data.content) {
                  summary = data.content;
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }

            // Upload directly to storage worker
            const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transcript: content,
                directory: projectPath || undefined,
                repo: summary || undefined,
              }),
            });

            if (!response.ok) {
              throw new Error(\`Upload failed with status \${response.status}\`);
            }

            router.push(\`/\${id}\`);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            setUploading(false);
          }
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
              </div>

              {/* Upload area */}
              <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }\`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".jsonl"
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <label
                    htmlFor="file-upload"
                    className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Choose file'}
                  </label>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    or drag and drop your transcript-*.jsonl file here
                  </p>
                </div>
              </form>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                <p>To get your transcript:</p>
                <ol className="mt-2 space-y-1">
                  <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
                  <li>2. Find the transcript-*.jsonl file in your save directory</li>
                  <li>3. Upload it here to view the conversation</li>
                </ol>
              </div>
            </div>
          </div>
        );
      }",
                              "structuredPatch": [
                                {
                                  "lines": [
                                    "-'use client';",
                                    "-",
                                    "-import { useState } from 'react';",
                                    "-import { useRouter } from 'next/navigation';",
                                    "-",
                                    " export default function Home() {",
                                    "-  const router = useRouter();",
                                    "-  const [uploading, setUploading] = useState(false);",
                                    "-  const [error, setError] = useState<string | null>(null);",
                                    "-  const [dragActive, setDragActive] = useState(false);",
                                    "+  return (",
                                    "+    <div className="min-h-screen bg-black text-green-400 font-mono p-8">",
                                    "+      <div className="max-w-4xl mx-auto">",
                                    "+        <div className="mb-8">",
                                    "+          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>",
                                    "+          <div className="border-b border-green-400 mb-4"></div>",
                                    "+        </div>",
                                    " ",
                                    "-  const handleDrag = (e: React.DragEvent) => {",
                                    "-    e.preventDefault();",
                                    "-    e.stopPropagation();",
                                    "-    if (e.type === "dragenter" || e.type === "dragover") {",
                                    "-      setDragActive(true);",
                                    "-    } else if (e.type === "dragleave") {",
                                    "-      setDragActive(false);",
                                    "-    }",
                                    "-  };",
                                    "+        <div className="space-y-6">",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">NAME</h2>",
                                    "+            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>",
                                    "+          </section>",
                                    " ",
                                    "-  const handleDrop = (e: React.DragEvent) => {",
                                    "-    e.preventDefault();",
                                    "-    e.stopPropagation();",
                                    "-    setDragActive(false);",
                                    "-    ",
                                    "-    if (e.dataTransfer.files && e.dataTransfer.files[0]) {",
                                    "-      handleFile(e.dataTransfer.files[0]);",
                                    "-    }",
                                    "-  };",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>",
                                    "+            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>",
                                    "+          </section>",
                                    " ",
                                    "-  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {",
                                    "-    e.preventDefault();",
                                    "-    if (e.target.files && e.target.files[0]) {",
                                    "-      handleFile(e.target.files[0]);",
                                    "-    }",
                                    "-  };",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>",
                                    "+            <div className="ml-8 space-y-2">",
                                    "+              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>",
                                    "+              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>",
                                    "+            </div>",
                                    "+          </section>",
                                    " ",
                                    "-  const handleFile = async (file: File) => {",
                                    "-    if (!file.name.endsWith('.jsonl')) {",
                                    "-      setError('Please upload a .jsonl file');",
                                    "-      return;",
                                    "-    }",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">USAGE</h2>",
                                    "+            <div className="ml-8 space-y-4">",
                                    "+              <div>",
                                    "+                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>",
                                    "+                <div className="ml-4 text-gray-400">",
                                    "+                  <p>? Select a transcript to upload: (Use arrow keys)</p>",
                                    "+                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>",
                                    "+                  <p>  project-beta/transcript-2024-01-14.jsonl</p>",
                                    "+                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>",
                                    "+                </div>",
                                    "+              </div>",
                                    "+              <div>",
                                    "+                <p className="text-green-300">✓ Uploaded transcript successfully!</p>",
                                    "+                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>",
                                    "+              </div>",
                                    "+            </div>",
                                    "+          </section>",
                                    " ",
                                    "-    setUploading(true);",
                                    "-    setError(null);",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">FILES</h2>",
                                    "+            <div className="ml-8">",
                                    "+              <p><span className="text-cyan-400">~/.claude/projects/</span></p>",
                                    "+              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>",
                                    "+            </div>",
                                    "+          </section>",
                                    " ",
                                    "-    try {",
                                    "-      // Read file content",
                                    "-      const content = await file.text();",
                                    "-      ",
                                    "-      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one",
                                    "-      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);",
                                    "-      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();",
                                    "-      ",
                                    "-      // Parse JSONL to extract metadata",
                                    "-      const lines = content.trim().split('\\n');",
                                    "-      let projectPath = '';",
                                    "-      let summary = '';",
                                    "-      ",
                                    "-      for (const line of lines) {",
                                    "-        try {",
                                    "-          const data = JSON.parse(line);",
                                    "-          if (data.type === 'project_info' && data.project_path) {",
                                    "-            projectPath = data.project_path;",
                                    "-          }",
                                    "-          if (data.type === 'summary' && data.content) {",
                                    "-            summary = data.content;",
                                    "-          }",
                                    "-        } catch (e) {",
                                    "-          // Skip invalid JSON lines",
                                    "-        }",
                                    "-      }",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>",
                                    "+            <div className="ml-8 space-y-1">",
                                    "+              <p><span className="text-yellow-400">0</span>   Successful upload</p>",
                                    "+              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>",
                                    "+            </div>",
                                    "+          </section>",
                                    " ",
                                    "-      // Upload directly to storage worker",
                                    "-      const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {",
                                    "-        method: 'POST',",
                                    "-        headers: {",
                                    "-          'Content-Type': 'application/json',",
                                    "-        },",
                                    "-        body: JSON.stringify({",
                                    "-          transcript: content,",
                                    "-          directory: projectPath || undefined,",
                                    "-          repo: summary || undefined,",
                                    "-        }),",
                                    "-      });",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>",
                                    "+            <div className="ml-8 space-y-2">",
                                    "+              <p>Upload a transcript interactively:</p>",
                                    "+              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>",
                                    "+            </div>",
                                    "+          </section>",
                                    " ",
                                    "-      if (!response.ok) {",
                                    "-        throw new Error(\`Upload failed with status \${response.status}\`);",
                                    "-      }",
                                    "-",
                                    "-      router.push(\`/\${id}\`);",
                                    "-    } catch (err) {",
                                    "-      setError(err instanceof Error ? err.message : 'Upload failed');",
                                    "-      setUploading(false);",
                                    "-    }",
                                    "-  };",
                                    "-",
                                    "-  return (",
                                    "-    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">",
                                    "-      <div className="w-full max-w-md">",
                                    "-        {/* Header */}",
                                    "-        <div className="text-center mb-8">",
                                    "-          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">",
                                    "-            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">",
                                    "-              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />",
                                    "-            </svg>",
                                    "-          </div>",
                                    "-          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>",
                                    "-          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>",
                                    "+          <section>",
                                    "+            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>",
                                    "+            <div className="ml-8">",
                                    "+              <p>claude(1), git(1)</p>",
                                    "+            </div>",
                                    "+          </section>",
                                    "         </div>",
                                    " ",
                                    "-        {/* Upload area */}",
                                    "-        <form",
                                    "-          onDragEnter={handleDrag}",
                                    "-          onSubmit={(e) => e.preventDefault()}",
                                    "-        >",
                                    "-          <div",
                                    "-            className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${",
                                    "-              dragActive",
                                    "-                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'",
                                    "-                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'",
                                    "-            }\`}",
                                    "-            onDragEnter={handleDrag}",
                                    "-            onDragLeave={handleDrag}",
                                    "-            onDragOver={handleDrag}",
                                    "-            onDrop={handleDrop}",
                                    "-          >",
                                    "-            <input",
                                    "-              type="file"",
                                    "-              id="file-upload"",
                                    "-              className="sr-only"",
                                    "-              accept=".jsonl"",
                                    "-              onChange={handleChange}",
                                    "-              disabled={uploading}",
                                    "-            />",
                                    "-            ",
                                    "-            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">",
                                    "-              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />",
                                    "-            </svg>",
                                    "-            ",
                                    "-            <label",
                                    "-              htmlFor="file-upload"",
                                    "-              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"",
                                    "-            >",
                                    "-              {uploading ? 'Uploading...' : 'Choose file'}",
                                    "-            </label>",
                                    "-            ",
                                    "-            <p className="mt-2 text-gray-600 dark:text-gray-400">",
                                    "-              or drag and drop your transcript-*.jsonl file here",
                                    "-            </p>",
                                    "-          </div>",
                                    "-        </form>",
                                    "-",
                                    "-        {/* Error message */}",
                                    "-        {error && (",
                                    "-          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">",
                                    "-            <p className="text-red-600 dark:text-red-400">{error}</p>",
                                    "-          </div>",
                                    "-        )}",
                                    "-",
                                    "-        {/* Instructions */}",
                                    "-        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">",
                                    "-          <p>To get your transcript:</p>",
                                    "-          <ol className="mt-2 space-y-1">",
                                    "-            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>",
                                    "-            <li>2. Find the transcript-*.jsonl file in your save directory</li>",
                                    "-            <li>3. Upload it here to view the conversation</li>",
                                    "-          </ol>",
                                    "+        <div className="mt-12 text-center text-gray-500">",
                                    "+          <p>Claude Code Transcript Uploader v1.0.0</p>",
                                    "         </div>",
                                    "       </div>",
                                    "     </div>",
                                  ],
                                  "newLines": 84,
                                  "newStart": 1,
                                  "oldLines": 172,
                                  "oldStart": 1,
                                },
                              ],
                            },
                            "type": "user",
                            "userType": "external",
                            "uuid": "2b2cd6c6-b0cc-4ad8-a014-66c36956d4f5",
                            "version": "1.0.3",
                          },
                        },
                      ],
                      "message": {
                        "costUSD": 0.061548015000000005,
                        "cwd": "/Users/philipp/dev/claude-code-viewer",
                        "durationMs": 44066,
                        "isSidechain": false,
                        "message": {
                          "content": [
                            {
                              "id": "toolu_01NrPwuz5QYKUmQAHVBxTEf2",
                              "input": {
                                "file_path": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                                "new_string": "export default function Home() {
        return (
          <div className="min-h-screen bg-black text-green-400 font-mono p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
                <div className="border-b border-green-400 mb-4"></div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-2">NAME</h2>
                  <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
                  <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
                  <div className="ml-8 space-y-2">
                    <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
                    <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">USAGE</h2>
                  <div className="ml-8 space-y-4">
                    <div>
                      <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
                      <div className="ml-4 text-gray-400">
                        <p>? Select a transcript to upload: (Use arrow keys)</p>
                        <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
                        <p>  project-beta/transcript-2024-01-14.jsonl</p>
                        <p>  project-gamma/transcript-2024-01-13.jsonl</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-300">✓ Uploaded transcript successfully!</p>
                      <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">FILES</h2>
                  <div className="ml-8">
                    <p><span className="text-cyan-400">~/.claude/projects/</span></p>
                    <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
                  <div className="ml-8 space-y-1">
                    <p><span className="text-yellow-400">0</span>   Successful upload</p>
                    <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
                  <div className="ml-8 space-y-2">
                    <p>Upload a transcript interactively:</p>
                    <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
                  <div className="ml-8">
                    <p>claude(1), git(1)</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p>Claude Code Transcript Uploader v1.0.0</p>
              </div>
            </div>
          </div>
        );
      }",
                                "old_string": "'use client';

      import { useState } from 'react';
      import { useRouter } from 'next/navigation';

      export default function Home() {
        const router = useRouter();
        const [uploading, setUploading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [dragActive, setDragActive] = useState(false);

        const handleDrag = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        };

        const handleFile = async (file: File) => {
          if (!file.name.endsWith('.jsonl')) {
            setError('Please upload a .jsonl file');
            return;
          }

          setUploading(true);
          setError(null);

          try {
            // Read file content
            const content = await file.text();
            
            // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
            const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
            const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
            
            // Parse JSONL to extract metadata
            const lines = content.trim().split('\\n');
            let projectPath = '';
            let summary = '';
            
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.type === 'project_info' && data.project_path) {
                  projectPath = data.project_path;
                }
                if (data.type === 'summary' && data.content) {
                  summary = data.content;
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }

            // Upload directly to storage worker
            const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transcript: content,
                directory: projectPath || undefined,
                repo: summary || undefined,
              }),
            });

            if (!response.ok) {
              throw new Error(\`Upload failed with status \${response.status}\`);
            }

            router.push(\`/\${id}\`);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            setUploading(false);
          }
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
              </div>

              {/* Upload area */}
              <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }\`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".jsonl"
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <label
                    htmlFor="file-upload"
                    className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Choose file'}
                  </label>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    or drag and drop your transcript-*.jsonl file here
                  </p>
                </div>
              </form>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                <p>To get your transcript:</p>
                <ol className="mt-2 space-y-1">
                  <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
                  <li>2. Find the transcript-*.jsonl file in your save directory</li>
                  <li>3. Upload it here to view the conversation</li>
                </ol>
              </div>
            </div>
          </div>
        );
      }",
                              },
                              "name": "Edit",
                              "type": "tool_use",
                            },
                          ],
                          "id": "msg_013cNaQWxdm53yfUEARMEfG6",
                          "model": "claude-sonnet-4-20250514",
                          "role": "assistant",
                          "stop_reason": "tool_use",
                          "stop_sequence": null,
                          "type": "message",
                          "usage": {
                            "cache_creation_input_tokens": 2787,
                            "cache_read_input_tokens": 17974,
                            "input_tokens": 6,
                            "output_tokens": 3363,
                            "service_tier": "standard",
                          },
                        },
                        "parentUuid": "5b061a9b-6d8b-4ae8-bda5-9e8ce42ea024",
                        "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                        "timestamp": "2025-05-23T22:57:20.440Z",
                        "type": "assistant",
                        "userType": "external",
                        "uuid": "0917c46c-6d13-44fd-83ba-784d505be491",
                        "version": "1.0.3",
                      },
                      "toolResult": {
                        "toolu_01NrPwuz5QYKUmQAHVBxTEf2": "The file /Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
           1	export default function Home() {
           2	  return (
           3	    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
           4	      <div className="max-w-4xl mx-auto">
           5	        <div className="mb-8">
           6	          <h1 className="text-2xl font-bold mb-4">CLAUDE-CODE-UPLOADER(1)</h1>
           7	          <div className="border-b border-green-400 mb-4"></div>
           8	        </div>
           9	
          10	        <div className="space-y-6">
          11	          <section>
          12	            <h2 className="text-xl font-bold mb-2">NAME</h2>
          13	            <p className="ml-8">claude-code-uploader - upload Claude Code transcripts to web viewer</p>
          14	          </section>
          15	
          16	          <section>
          17	            <h2 className="text-xl font-bold mb-2">SYNOPSIS</h2>
          18	            <p className="ml-8 text-yellow-400">npx claude-code-uploader</p>
          19	          </section>
          20	
          21	          <section>
          22	            <h2 className="text-xl font-bold mb-2">DESCRIPTION</h2>
          23	            <div className="ml-8 space-y-2">
          24	              <p>The <span className="text-yellow-400">claude-code-uploader</span> utility scans your local Claude Code project directories for transcript files and uploads them to a web-based viewer.</p>
          25	              <p>It automatically discovers transcript files in <span className="text-cyan-400">~/.claude/projects/</span> and provides an interactive interface for selecting and uploading transcripts.</p>
          26	            </div>
          27	          </section>
          28	
          29	          <section>
          30	            <h2 className="text-xl font-bold mb-2">USAGE</h2>
          31	            <div className="ml-8 space-y-4">
          32	              <div>
          33	                <p className="text-yellow-400 mb-2">$ npx claude-code-uploader</p>
          34	                <div className="ml-4 text-gray-400">
          35	                  <p>? Select a transcript to upload: (Use arrow keys)</p>
          36	                  <p>❯ project-alpha/transcript-2024-01-15.jsonl</p>
          37	                  <p>  project-beta/transcript-2024-01-14.jsonl</p>
          38	                  <p>  project-gamma/transcript-2024-01-13.jsonl</p>
          39	                </div>
          40	              </div>
          41	              <div>
          42	                <p className="text-green-300">✓ Uploaded transcript successfully!</p>
          43	                <p className="text-blue-400">View at: https://claude-code-viewer.vercel.app/abc123...</p>
          44	              </div>
          45	            </div>
          46	          </section>
          47	
          48	          <section>
          49	            <h2 className="text-xl font-bold mb-2">FILES</h2>
          50	            <div className="ml-8">
          51	              <p><span className="text-cyan-400">~/.claude/projects/</span></p>
          52	              <p className="ml-8">Default directory where Claude Code stores project transcripts</p>
          53	            </div>
          54	          </section>
          55	
          56	          <section>
          57	            <h2 className="text-xl font-bold mb-2">EXIT STATUS</h2>
          58	            <div className="ml-8 space-y-1">
          59	              <p><span className="text-yellow-400">0</span>   Successful upload</p>
          60	              <p><span className="text-yellow-400">1</span>   Upload failed or user cancelled</p>
          61	            </div>
          62	          </section>
          63	
          64	          <section>
          65	            <h2 className="text-xl font-bold mb-2">EXAMPLES</h2>
          66	            <div className="ml-8 space-y-2">
          67	              <p>Upload a transcript interactively:</p>
          68	              <p className="ml-4 text-yellow-400">$ npx claude-code-uploader</p>
          69	            </div>
          70	          </section>
          71	
          72	          <section>
          73	            <h2 className="text-xl font-bold mb-2">SEE ALSO</h2>
          74	            <div className="ml-8">
          75	              <p>claude(1), git(1)</p>
          76	            </div>
          77	          </section>
          78	        </div>
          79	
          80	        <div className="mt-12 text-center text-gray-500">
          81	          <p>Claude Code Transcript Uploader v1.0.0</p>
          82	        </div>
          83	      </div>
          84	    </div>
          85	  );
          86	}",
                      },
                    },
                  ],
                  "message": {
                    "cwd": "/Users/philipp/dev/claude-code-viewer",
                    "isSidechain": false,
                    "message": {
                      "content": [
                        {
                          "content": "     1	'use client';
           2	
           3	import { useState } from 'react';
           4	import { useRouter } from 'next/navigation';
           5	
           6	export default function Home() {
           7	  const router = useRouter();
           8	  const [uploading, setUploading] = useState(false);
           9	  const [error, setError] = useState<string | null>(null);
          10	  const [dragActive, setDragActive] = useState(false);
          11	
          12	  const handleDrag = (e: React.DragEvent) => {
          13	    e.preventDefault();
          14	    e.stopPropagation();
          15	    if (e.type === "dragenter" || e.type === "dragover") {
          16	      setDragActive(true);
          17	    } else if (e.type === "dragleave") {
          18	      setDragActive(false);
          19	    }
          20	  };
          21	
          22	  const handleDrop = (e: React.DragEvent) => {
          23	    e.preventDefault();
          24	    e.stopPropagation();
          25	    setDragActive(false);
          26	    
          27	    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          28	      handleFile(e.dataTransfer.files[0]);
          29	    }
          30	  };
          31	
          32	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          33	    e.preventDefault();
          34	    if (e.target.files && e.target.files[0]) {
          35	      handleFile(e.target.files[0]);
          36	    }
          37	  };
          38	
          39	  const handleFile = async (file: File) => {
          40	    if (!file.name.endsWith('.jsonl')) {
          41	      setError('Please upload a .jsonl file');
          42	      return;
          43	    }
          44	
          45	    setUploading(true);
          46	    setError(null);
          47	
          48	    try {
          49	      // Read file content
          50	      const content = await file.text();
          51	      
          52	      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
          53	      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
          54	      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
          55	      
          56	      // Parse JSONL to extract metadata
          57	      const lines = content.trim().split('\\n');
          58	      let projectPath = '';
          59	      let summary = '';
          60	      
          61	      for (const line of lines) {
          62	        try {
          63	          const data = JSON.parse(line);
          64	          if (data.type === 'project_info' && data.project_path) {
          65	            projectPath = data.project_path;
          66	          }
          67	          if (data.type === 'summary' && data.content) {
          68	            summary = data.content;
          69	          }
          70	        } catch (e) {
          71	          // Skip invalid JSON lines
          72	        }
          73	      }
          74	
          75	      // Upload directly to storage worker
          76	      const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
          77	        method: 'POST',
          78	        headers: {
          79	          'Content-Type': 'application/json',
          80	        },
          81	        body: JSON.stringify({
          82	          transcript: content,
          83	          directory: projectPath || undefined,
          84	          repo: summary || undefined,
          85	        }),
          86	      });
          87	
          88	      if (!response.ok) {
          89	        throw new Error(\`Upload failed with status \${response.status}\`);
          90	      }
          91	
          92	      router.push(\`/\${id}\`);
          93	    } catch (err) {
          94	      setError(err instanceof Error ? err.message : 'Upload failed');
          95	      setUploading(false);
          96	    }
          97	  };
          98	
          99	  return (
         100	    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
         101	      <div className="w-full max-w-md">
         102	        {/* Header */}
         103	        <div className="text-center mb-8">
         104	          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
         105	            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         106	              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
         107	            </svg>
         108	          </div>
         109	          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
         110	          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
         111	        </div>
         112	
         113	        {/* Upload area */}
         114	        <form
         115	          onDragEnter={handleDrag}
         116	          onSubmit={(e) => e.preventDefault()}
         117	        >
         118	          <div
         119	            className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
         120	              dragActive
         121	                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
         122	                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
         123	            }\`}
         124	            onDragEnter={handleDrag}
         125	            onDragLeave={handleDrag}
         126	            onDragOver={handleDrag}
         127	            onDrop={handleDrop}
         128	          >
         129	            <input
         130	              type="file"
         131	              id="file-upload"
         132	              className="sr-only"
         133	              accept=".jsonl"
         134	              onChange={handleChange}
         135	              disabled={uploading}
         136	            />
         137	            
         138	            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
         139	              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
         140	            </svg>
         141	            
         142	            <label
         143	              htmlFor="file-upload"
         144	              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
         145	            >
         146	              {uploading ? 'Uploading...' : 'Choose file'}
         147	            </label>
         148	            
         149	            <p className="mt-2 text-gray-600 dark:text-gray-400">
         150	              or drag and drop your transcript-*.jsonl file here
         151	            </p>
         152	          </div>
         153	        </form>
         154	
         155	        {/* Error message */}
         156	        {error && (
         157	          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
         158	            <p className="text-red-600 dark:text-red-400">{error}</p>
         159	          </div>
         160	        )}
         161	
         162	        {/* Instructions */}
         163	        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
         164	          <p>To get your transcript:</p>
         165	          <ol className="mt-2 space-y-1">
         166	            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
         167	            <li>2. Find the transcript-*.jsonl file in your save directory</li>
         168	            <li>3. Upload it here to view the conversation</li>
         169	          </ol>
         170	        </div>
         171	      </div>
         172	    </div>
         173	  );
         174	}",
                          "tool_use_id": "toolu_01PcQ6qvjD4LCVFQsYVRWBaL",
                          "type": "tool_result",
                        },
                      ],
                      "role": "user",
                    },
                    "parentUuid": "968420e8-3b3c-42b6-a2e4-7af74cf42be1",
                    "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                    "timestamp": "2025-05-23T22:56:36.353Z",
                    "toolUseResult": {
                      "file": {
                        "content": "'use client';

      import { useState } from 'react';
      import { useRouter } from 'next/navigation';

      export default function Home() {
        const router = useRouter();
        const [uploading, setUploading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [dragActive, setDragActive] = useState(false);

        const handleDrag = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        };

        const handleFile = async (file: File) => {
          if (!file.name.endsWith('.jsonl')) {
            setError('Please upload a .jsonl file');
            return;
          }

          setUploading(true);
          setError(null);

          try {
            // Read file content
            const content = await file.text();
            
            // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
            const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
            const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
            
            // Parse JSONL to extract metadata
            const lines = content.trim().split('\\n');
            let projectPath = '';
            let summary = '';
            
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.type === 'project_info' && data.project_path) {
                  projectPath = data.project_path;
                }
                if (data.type === 'summary' && data.content) {
                  summary = data.content;
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }

            // Upload directly to storage worker
            const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transcript: content,
                directory: projectPath || undefined,
                repo: summary || undefined,
              }),
            });

            if (!response.ok) {
              throw new Error(\`Upload failed with status \${response.status}\`);
            }

            router.push(\`/\${id}\`);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            setUploading(false);
          }
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
              </div>

              {/* Upload area */}
              <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }\`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".jsonl"
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <label
                    htmlFor="file-upload"
                    className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Choose file'}
                  </label>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    or drag and drop your transcript-*.jsonl file here
                  </p>
                </div>
              </form>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                <p>To get your transcript:</p>
                <ol className="mt-2 space-y-1">
                  <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
                  <li>2. Find the transcript-*.jsonl file in your save directory</li>
                  <li>3. Upload it here to view the conversation</li>
                </ol>
              </div>
            </div>
          </div>
        );
      }",
                        "filePath": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                        "numLines": 174,
                        "startLine": 1,
                        "totalLines": 174,
                      },
                      "type": "text",
                    },
                    "type": "user",
                    "userType": "external",
                    "uuid": "5b061a9b-6d8b-4ae8-bda5-9e8ce42ea024",
                    "version": "1.0.3",
                  },
                },
              ],
              "message": {
                "costUSD": 0.016753169999999998,
                "cwd": "/Users/philipp/dev/claude-code-viewer",
                "durationMs": 3042,
                "isSidechain": false,
                "message": {
                  "content": [
                    {
                      "text": "I'll update the home page to remove upload functionality and style it like a man page for the CLI tool.",
                      "type": "text",
                    },
                    {
                      "id": "toolu_01PcQ6qvjD4LCVFQsYVRWBaL",
                      "input": {
                        "file_path": "/Users/philipp/dev/claude-code-viewer/apps/viewer/app/page.tsx",
                      },
                      "name": "Read",
                      "type": "tool_use",
                    },
                  ],
                  "id": "msg_01XsyWtfC4sF1EC9ucLNM9fN",
                  "model": "claude-sonnet-4-20250514",
                  "role": "assistant",
                  "stop_reason": "tool_use",
                  "stop_sequence": null,
                  "type": "message",
                  "usage": {
                    "cache_creation_input_tokens": 4762,
                    "cache_read_input_tokens": 13212,
                    "input_tokens": 4,
                    "output_tokens": 98,
                    "service_tier": "standard",
                  },
                },
                "parentUuid": "8ee09711-a46a-491e-a8a8-dd8fd20217c4",
                "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
                "timestamp": "2025-05-23T22:56:36.327Z",
                "type": "assistant",
                "userType": "external",
                "uuid": "968420e8-3b3c-42b6-a2e4-7af74cf42be1",
                "version": "1.0.3",
              },
              "toolResult": {
                "toolu_01PcQ6qvjD4LCVFQsYVRWBaL": "     1	'use client';
           2	
           3	import { useState } from 'react';
           4	import { useRouter } from 'next/navigation';
           5	
           6	export default function Home() {
           7	  const router = useRouter();
           8	  const [uploading, setUploading] = useState(false);
           9	  const [error, setError] = useState<string | null>(null);
          10	  const [dragActive, setDragActive] = useState(false);
          11	
          12	  const handleDrag = (e: React.DragEvent) => {
          13	    e.preventDefault();
          14	    e.stopPropagation();
          15	    if (e.type === "dragenter" || e.type === "dragover") {
          16	      setDragActive(true);
          17	    } else if (e.type === "dragleave") {
          18	      setDragActive(false);
          19	    }
          20	  };
          21	
          22	  const handleDrop = (e: React.DragEvent) => {
          23	    e.preventDefault();
          24	    e.stopPropagation();
          25	    setDragActive(false);
          26	    
          27	    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          28	      handleFile(e.dataTransfer.files[0]);
          29	    }
          30	  };
          31	
          32	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          33	    e.preventDefault();
          34	    if (e.target.files && e.target.files[0]) {
          35	      handleFile(e.target.files[0]);
          36	    }
          37	  };
          38	
          39	  const handleFile = async (file: File) => {
          40	    if (!file.name.endsWith('.jsonl')) {
          41	      setError('Please upload a .jsonl file');
          42	      return;
          43	    }
          44	
          45	    setUploading(true);
          46	    setError(null);
          47	
          48	    try {
          49	      // Read file content
          50	      const content = await file.text();
          51	      
          52	      // Extract UUID from filename (format: transcript-[UUID].jsonl) or generate new one
          53	      const filenameMatch = file.name.match(/transcript-([a-f0-9-]+)\\.jsonl/);
          54	      const id = filenameMatch ? filenameMatch[1] : crypto.randomUUID();
          55	      
          56	      // Parse JSONL to extract metadata
          57	      const lines = content.trim().split('\\n');
          58	      let projectPath = '';
          59	      let summary = '';
          60	      
          61	      for (const line of lines) {
          62	        try {
          63	          const data = JSON.parse(line);
          64	          if (data.type === 'project_info' && data.project_path) {
          65	            projectPath = data.project_path;
          66	          }
          67	          if (data.type === 'summary' && data.content) {
          68	            summary = data.content;
          69	          }
          70	        } catch (e) {
          71	          // Skip invalid JSON lines
          72	        }
          73	      }
          74	
          75	      // Upload directly to storage worker
          76	      const response = await fetch(\`https://claude-code-storage.remote.workers.dev/\${id}\`, {
          77	        method: 'POST',
          78	        headers: {
          79	          'Content-Type': 'application/json',
          80	        },
          81	        body: JSON.stringify({
          82	          transcript: content,
          83	          directory: projectPath || undefined,
          84	          repo: summary || undefined,
          85	        }),
          86	      });
          87	
          88	      if (!response.ok) {
          89	        throw new Error(\`Upload failed with status \${response.status}\`);
          90	      }
          91	
          92	      router.push(\`/\${id}\`);
          93	    } catch (err) {
          94	      setError(err instanceof Error ? err.message : 'Upload failed');
          95	      setUploading(false);
          96	    }
          97	  };
          98	
          99	  return (
         100	    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
         101	      <div className="w-full max-w-md">
         102	        {/* Header */}
         103	        <div className="text-center mb-8">
         104	          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
         105	            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         106	              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
         107	            </svg>
         108	          </div>
         109	          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">✻⇡ Claude Transcript Viewer</h1>
         110	          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your Claude conversation transcript to view it in a beautiful interface</p>
         111	        </div>
         112	
         113	        {/* Upload area */}
         114	        <form
         115	          onDragEnter={handleDrag}
         116	          onSubmit={(e) => e.preventDefault()}
         117	        >
         118	          <div
         119	            className={\`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors \${
         120	              dragActive
         121	                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
         122	                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
         123	            }\`}
         124	            onDragEnter={handleDrag}
         125	            onDragLeave={handleDrag}
         126	            onDragOver={handleDrag}
         127	            onDrop={handleDrop}
         128	          >
         129	            <input
         130	              type="file"
         131	              id="file-upload"
         132	              className="sr-only"
         133	              accept=".jsonl"
         134	              onChange={handleChange}
         135	              disabled={uploading}
         136	            />
         137	            
         138	            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
         139	              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
         140	            </svg>
         141	            
         142	            <label
         143	              htmlFor="file-upload"
         144	              className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
         145	            >
         146	              {uploading ? 'Uploading...' : 'Choose file'}
         147	            </label>
         148	            
         149	            <p className="mt-2 text-gray-600 dark:text-gray-400">
         150	              or drag and drop your transcript-*.jsonl file here
         151	            </p>
         152	          </div>
         153	        </form>
         154	
         155	        {/* Error message */}
         156	        {error && (
         157	          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
         158	            <p className="text-red-600 dark:text-red-400">{error}</p>
         159	          </div>
         160	        )}
         161	
         162	        {/* Instructions */}
         163	        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
         164	          <p>To get your transcript:</p>
         165	          <ol className="mt-2 space-y-1">
         166	            <li>1. Use Claude with the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-sm">--save-dir</code> flag</li>
         167	            <li>2. Find the transcript-*.jsonl file in your save directory</li>
         168	            <li>3. Upload it here to view the conversation</li>
         169	          </ol>
         170	        </div>
         171	      </div>
         172	    </div>
         173	  );
         174	}",
              },
            },
          ],
          "message": {
            "cwd": "/Users/philipp/dev/claude-code-viewer",
            "isSidechain": false,
            "message": {
              "content": "can you update the home page oif the web app to not allow direct uploading but instead read like a man page for \`npx claude-code-uploder\`? remove any icons too",
              "role": "user",
            },
            "parentUuid": null,
            "sessionId": "8a5937a4-d1f9-4b5e-80b0-cd3c059f2b59",
            "timestamp": "2025-05-23T22:56:33.112Z",
            "type": "user",
            "userType": "external",
            "uuid": "8ee09711-a46a-491e-a8a8-dd8fd20217c4",
            "version": "1.0.3",
          },
        },
      ]
    `);
  });
});
