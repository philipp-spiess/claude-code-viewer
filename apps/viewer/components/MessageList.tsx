'use client';

import { useState } from 'react';
import MessageView from './MessageView';

interface Message {
  type: string;
  timestamp?: string;
  isSidechain?: boolean;
  parentUuid?: string;
  uuid?: string;
  message?: any;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  // Group messages by parent for visual organization
  const messageGroups: { parent: Message | null; children: Message[] }[] = [];
  const processedUuids = new Set<string>();
  
  messages.forEach((msg) => {
    if (msg.uuid && processedUuids.has(msg.uuid)) return;
    
    // If it's a root message (no parent)
    if (!msg.parentUuid) {
      const children = messages.filter(m => m.parentUuid === msg.uuid);
      messageGroups.push({ parent: msg, children });
      
      if (msg.uuid) processedUuids.add(msg.uuid);
      children.forEach(c => c.uuid && processedUuids.add(c.uuid));
    }
  });
  
  // Add any orphaned messages
  messages.forEach((msg) => {
    if (msg.uuid && !processedUuids.has(msg.uuid)) {
      messageGroups.push({ parent: msg, children: [] });
    }
  });
  
  return (
    <div className="space-y-6">
      {messageGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.parent && (
            <MessageItem message={group.parent} />
          )}
          {group.children.length > 0 && (
            <div className="ml-8 border-l-2 border-gray-300 dark:border-gray-600 pl-4 mt-4 space-y-4">
              {group.children.map((child, childIndex) => (
                <MessageItem key={childIndex} message={child} isSidechain={true} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface MessageItemProps {
  message: Message;
  isSidechain?: boolean;
}

function MessageItem({ message, isSidechain = false }: MessageItemProps) {
  const [expanded, setExpanded] = useState(true);
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Get model info
  const getModelInfo = () => {
    if (message.message?.model) {
      return message.message.model;
    }
    return null;
  };
  
  return (
    <div>
      {/* Message Header */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {message.timestamp && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(message.timestamp)}
              </span>
            )}
            {(isSidechain || message.isSidechain) && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-sm">
                Sidechain
              </span>
            )}
          </div>
          {getModelInfo() && (
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-sm">
              {getModelInfo()}
            </span>
          )}
        </div>
      </div>
      
      {/* Message Content */}
      {expanded && (
        <details open className="mb-4">
          <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            {message.type} message
            {message.message?.role && ` (${message.message.role})`}
          </summary>
          <div className="mt-2 pl-4">
            <MessageView message={message} />
          </div>
        </details>
      )}
    </div>
  );
}