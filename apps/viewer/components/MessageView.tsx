'use client';

import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import ToolUse from './ToolUse';

interface MessageProps {
  message: any;
}

export default function MessageView({ message }: MessageProps) {
  // Handle different message types
  switch (message.type) {
    case 'human_turn':
    case 'user':
      // Handle the nested message structure for user messages
      return <UserMessage message={message.message || message} />;
    
    case 'ai_turn':
    case 'assistant':
      // Handle the nested message structure for assistant messages
      return <AssistantMessage message={message.message || message} />;
    
    case 'tool_use':
      return <ToolUse toolUse={message} />;
    
    case 'command_result':
      return (
        <div className="ml-8 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Command Result</div>
          <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {message.output || message.result || JSON.stringify(message, null, 2)}
          </pre>
        </div>
      );
    
    case 'summary':
      return (
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
            Summary: {message.summary}
          </div>
          {message.leafUuid && (
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              ID: {message.leafUuid}
            </div>
          )}
        </div>
      );
    
    case 'project_info':
      return (
        <div className="text-center py-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Project: {message.project_path}
          </div>
        </div>
      );
    
    default:
      // Show minimal info for other message types
      return (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Type: {message.type}
          </div>
          {message.toolUseResult && (
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Tool Result: {typeof message.toolUseResult === 'string' 
                ? message.toolUseResult 
                : JSON.stringify(message.toolUseResult, null, 2)}
            </div>
          )}
        </div>
      );
  }
}