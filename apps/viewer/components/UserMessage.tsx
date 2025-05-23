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
  const [_expanded, _setExpanded] = useState(true);
  
  if (!message.content) return null;
  
  // Function to render content - handles both string and array formats
  const renderContent = () => {
    if (typeof message.content === 'string') {
      return formatContent(message.content);
    }
    
    if (Array.isArray(message.content)) {
      const text = message.content.map((item) => {
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
    const commandMatch = text.match(/<command-message>([\s\S]*?)<\/command-message>/);
    const commandNameMatch = text.match(/<command-name>([\s\S]*?)<\/command-name>/);
    
    if (commandMatch && commandNameMatch) {
      const commandMessage = commandMatch[1];
      const commandName = commandNameMatch[1];
      
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
    <div className="py-2">
      <div className="flex items-start gap-2">
        <span className="text-blue shrink-0 select-none">❯</span>
        <div className="flex-1">
          <div className="text-text whitespace-pre-wrap leading-relaxed">
            {renderContent()}
          </div>
          
          {/* Attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment, idx) => (
                <div key={idx} className="text-subtext-1 flex items-center gap-1">
                  <span>📎</span>
                  {attachment.name || 'Attachment'}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}