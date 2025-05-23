'use client';

import { useState } from 'react';

interface UserMessageProps {
  message: {
    content?: string | Array<{type: string; text?: string; [key: string]: any}>;
    timestamp?: string;
    attachments?: any[];
  };
}

export default function UserMessage({ message }: UserMessageProps) {
  const [expanded, setExpanded] = useState(true);
  
  if (!message.content) return null;
  
  // Function to render content - handles both string and array formats
  const renderContent = () => {
    if (typeof message.content === 'string') {
      return formatContent(message.content);
    }
    
    if (Array.isArray(message.content)) {
      const text = message.content.map((item, idx) => {
        if (item.type === 'text' && item.text) {
          return item.text;
        }
        // Handle other content types if needed
        return '';
      }).join('');
      return formatContent(text);
    }
    
    return '';
  };
  
  // Format content to handle command messages
  const formatContent = (text: string) => {
    // Parse command messages
    const commandMatch = text.match(/<command-message>(.*?)<\/command-message>/s);
    const commandNameMatch = text.match(/<command-name>(.*?)<\/command-name>/s);
    
    if (commandMatch && commandNameMatch) {
      const commandMessage = commandMatch[1];
      const commandName = commandNameMatch[1];
      
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-mono">{commandName}</span>
          </div>
          <div className="italic">{commandMessage}</div>
        </div>
      );
    }
    
    // Regular text
    return text;
  };
  
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">You</span>
          {message.timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {renderContent()}
          </div>
        </div>
        
        {/* Attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, idx) => (
              <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                {attachment.name || 'Attachment'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}