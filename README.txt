CLAUDE-CODE-UPLOADER(1)                                    CLAUDE-CODE-UPLOADER(1)

NAME
     claude-code-uploader - upload Claude Code transcripts to web viewer

SYNOPSIS
     npx claude-code-uploader

DESCRIPTION
     The npx claude-code-uploader utility scans your local Claude Code project
     directories for transcript files and uploads them to a web-based viewer.

     It automatically discovers transcript files in ~/.claude/projects/ and
     provides an interactive interface for selecting and uploading transcripts.

USAGE
     $ npx claude-code-uploader

     ? Select a transcript to upload: (Use arrow keys)
     ❯ project-alpha/transcript-2024-01-15.jsonl
       project-beta/transcript-2024-01-14.jsonl
       project-gamma/transcript-2024-01-13.jsonl

     ✓ Uploaded transcript successfully!
     View at: https://claude-code-viewer.pages.dev/abcd1234

FILES
     ~/.claude/projects/
             Default directory where Claude Code stores project transcripts

EXIT STATUS
     The claude-code-uploader utility exits 0 on success, and >0 if an error
     occurs.

     0       Successful upload
     1       Upload failed or user cancelled

EXAMPLES
     Upload a transcript interactively:

           $ npx claude-code-uploader

SEE ALSO
     claude(1)

                                                         CLAUDE-CODE-UPLOADER(1)
