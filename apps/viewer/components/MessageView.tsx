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
      return <UserMessage message={message} />;
    
    case 'ai_turn':
      return <AssistantMessage message={message} />;
    
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
    
    case 'summary':
      return null; // Summary is shown in the header
    
    default:
      // For any unknown message type, show a debug view
      if (process.env.NODE_ENV === 'development') {
        return (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">
              Unknown message type: {message.type}
            </div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(message, null, 2)}
            </pre>
          </div>
        );
      }
      return null;
  }
}