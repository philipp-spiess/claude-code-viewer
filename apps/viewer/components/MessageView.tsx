'use client'

import UserMessage from './UserMessage'
import AssistantMessage from './AssistantMessage'
import ToolUse from './ToolUse'

interface MessageProps {
  message: any
}

export default function MessageView({ message }: MessageProps) {
  // Handle different message types
  switch (message.type) {
    case 'human_turn':
    case 'user':
      // Handle the nested message structure for user messages
      return <UserMessage message={message.message || message} />

    case 'ai_turn':
    case 'assistant':
      // Handle the nested message structure for assistant messages
      return <AssistantMessage message={message.message || message} />

    case 'tool_use':
      return <ToolUse toolUse={message} />

    case 'command_result':
      return (
        <div className="ml-6 p-3 bg-surface-0 rounded">
          <div className="text-subtext-0 mb-1 text-xs">Command Result</div>
          <pre className="whitespace-pre-wrap text-text">
            {message.output || message.result || JSON.stringify(message, null, 2)}
          </pre>
        </div>
      )

    case 'summary':
      return (
        <div className="p-3 bg-surface-0 rounded">
          <div className="text-mauve">Summary: {message.summary}</div>
          {message.leafUuid && (
            <div className="text-xs text-subtext-1 mt-1">ID: {message.leafUuid}</div>
          )}
        </div>
      )

    case 'project_info':
      return (
        <div className="text-center py-2">
          <div className="inline-flex items-center px-3 py-1 bg-surface-0 text-blue rounded">
            <span className="mr-2">📁</span>
            Project: {message.project_path}
          </div>
        </div>
      )

    default:
      // Show minimal info for other message types
      return (
        <div className="p-3 bg-surface-0 rounded">
          <div className="text-xs text-subtext-0 mb-1">Type: {message.type}</div>
          {message.toolUseResult && (
            <div className="text-text">
              Tool Result:{' '}
              {typeof message.toolUseResult === 'string'
                ? message.toolUseResult
                : JSON.stringify(message.toolUseResult, null, 2)}
            </div>
          )}
        </div>
      )
  }
}
