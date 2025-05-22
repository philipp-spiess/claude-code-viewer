import { pgTable, text, timestamp, uuid, integer, varchar } from "drizzle-orm/pg-core";

// Transcripts table for storing Claude conversation transcripts
export const transcripts = pgTable("transcripts", {
  id: uuid("id").primaryKey(), // UUID from filename
  content: text("content").notNull(), // Full JSONL file content
  projectPath: varchar("project_path", { length: 500 }), // Parsed project path
  summary: text("summary"), // Extracted summary
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(), // When it was uploaded
  fileSize: integer("file_size").notNull(), // Size in bytes
  messageCount: integer("message_count"), // Number of messages (optional)
});