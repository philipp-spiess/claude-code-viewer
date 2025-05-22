export interface ConversationRecord {
  id: string; // UUID from filename
  content: string; // Full JSONL file as string
  uploadedAt: Date;
  projectPath: string; // Parsed from folder name
  summary: string; // Extracted from first few lines
}