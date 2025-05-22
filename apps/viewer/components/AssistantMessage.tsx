'use client';

import { useState } from 'react';
import CodeBlock from './CodeBlock';
import ToolUse from './ToolUse';

interface AssistantMessageProps {
  message: {
    content?: string;
    timestamp?: string;
    tool_uses?: any[];
  };
}

export default function AssistantMessage({ message }: AssistantMessageProps) {
  const [expanded, setExpanded] = useState(true);
  
  // Function to parse content and identify code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return <CodeBlock key={index} code={code.trim()} language={language || 'plaintext'} />;
        }
      }
      
      // Regular text
      return (
        <div key={index} className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
          {part}
        </div>
      );
    });
  };
  
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">Claude</span>
          {message.timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        
        {message.content && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {renderContent(message.content)}
          </div>
        )}
        
        {/* Tool uses */}
        {message.tool_uses && message.tool_uses.length > 0 && (
          <div className="mt-4 space-y-3">
            {message.tool_uses.map((toolUse, idx) => (
              <ToolUse key={idx} toolUse={toolUse} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}