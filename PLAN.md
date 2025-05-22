# Claude History Viewer

Buckle up, buddy. We two are going on an epic journey now. I want you to help me create a new Claude History Viewer. This is a web app using Next.js, Tailwind CSS 4 and Drizzle to view your Claude Code transcripts online. The architecture is split up in two parts:

1. The Uploader: A CLI app that reads your claude history files from ~/.claude/ and uploads them to our server backend, using the already existing UUID as the key to share and store the transcript. The folder contains sub-folders which eventually contain transcripts in files like `~/.claude/projects/-home-philipp-dev-thgt/3003d7ea-39b2-4b18-95eb-469b6614ea3e.jsonl`. The CLI, when started, should give you a chronically sorted list of all recent transcripts and allow you to select one to upload. When presenting this list, include the date of the last message, the folder name of which project claude was run on, and the transcript summary as the title (can be found in the document).
2. The Viewer: A Next.js app that has an endpoint to receive chats from the CLI and that can serve all transcripts via `/:id`. The format of the files uploaded is jsonl, exactly the same file that the transcripts are presered in! I want you to read through a few local examples and figure out how to best render them. Note that this will likely be a chat style conversation but do ensure to include information like the prompts and tools being used etc. Note that this is VIEW ONLY so there should be no input box. You only render these transcripts.

The project should use an pnpm workplace setup and do everything in one repo. (so we have `/viewer` and `/uploader`) and some shared Vitest and TypeScript setup. Use biome for linting. Use this folder as the root of that project.

Before you begin, here are the rules:

1. Create a comprehensive plan first using the sub-agent Task feature. The plan that is returned should give you a detailed task list that you store as todos.
2. For each sub-task, ensure that you use sub-agent Tasks to implement them. ALWAYS make sure that the individual components are functioning (ideally via spawning additional sub-tasks to verify). Note that within these Tasks, you are free to use playwright to access the websites and make screenshots and all other tools you need to make sure this functions.
3. Iterate over it until you can demonstrate a working prototype.
