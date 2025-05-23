export interface ConversationRecord {
  id: string // UUID from filename
  content: string // Full JSONL file as string
  uploadedAt: Date
  projectPath: string // Parsed from folder name
  summary: string // Extracted from first few lines
}

// Base message interface with common properties
interface BaseMessage {
  uuid: string
  timestamp: string
  parentUuid?: string | null
  isSidechain?: boolean
  userType?: string
  cwd?: string
  sessionId?: string
  version?: string
}

// Summary message type
export interface SummaryMessage {
  type: 'summary'
  summary: string
  leafUuid: string
}

// User message type
export interface UserMessage extends BaseMessage {
  type: 'user'
  message: {
    role: 'user'
    content: string | ToolResult[]
  }
}

// Tool use content
export interface ToolUse {
  type: 'tool_use'
  id: string
  name: string
  input: Record<string, any>
}

// Text content
export interface TextContent {
  type: 'text'
  text: string
}

// Tool result for user messages
export interface ToolResult {
  tool_use_id: string
  type: 'tool_result'
  content: string | any[]
}

// Assistant message content union
export type AssistantContent = TextContent | ToolUse

// Usage statistics
export interface Usage {
  input_tokens: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
  output_tokens: number
  service_tier?: string
}

// Assistant message type
export interface AssistantMessage extends BaseMessage {
  type: 'assistant'
  message: {
    id: string
    type: 'message'
    role: 'assistant'
    model: string
    content: AssistantContent[]
    stop_reason: string | null
    stop_sequence?: string | null
    usage: Usage
  }
  costUSD?: number
  durationMs?: number
  toolUseResult?: any
}

// Union of all message types
export type TranscriptMessage = SummaryMessage | UserMessage | AssistantMessage

// Tree node structure for messages with parent-child relationships
export interface MessageNode {
  message: TranscriptMessage
  children: MessageNode[]
  toolResult?: any // Tool result from child messages that match tool_use_id
}

// Main transcript structure
export interface Transcript {
  id: string
  messages: TranscriptMessage[]
  messageCount?: number
  messageTree?: MessageNode[] // Optional tree structure
}
