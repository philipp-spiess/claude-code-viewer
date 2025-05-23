'use client';

import { useState } from 'react';

interface MessageProps {
  message: any;
  isChild?: boolean;
}

export default function ClaudeMessage({ message, isChild = false }: MessageProps) {
  const [expanded, setExpanded] = useState(true);
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };
  
  // Get role display and styling
  const getRoleDisplay = () => {
    if (message.type === 'user' || message.type === 'human_turn') {
      return { symbol: '>', color: 'text-blue-600 dark:text-blue-400' };
    }
    return { symbol: '⏺', color: 'text-purple-600 dark:text-purple-400' };
  };
  
  // Get message content based on type
  const getMessageContent = () => {
    switch (message.type) {
      case 'user':
      case 'human_turn':
        if (message.message?.content) {
          if (Array.isArray(message.message.content)) {
            return message.message.content
              .filter((c: any) => c.type === 'text')
              .map((c: any) => c.text)
              .join('');
          }
          return message.message.content;
        }
        return '';
        
      case 'assistant':
      case 'ai_turn':
        if (message.message?.content) {
          if (Array.isArray(message.message.content)) {
            const textContent = message.message.content
              .filter((c: any) => c.type === 'text')
              .map((c: any) => c.text)
              .join('');
            return textContent;
          }
          return message.message.content;
        }
        return '';
        
      case 'summary':
        return message.summary || '';
        
      default:
        return JSON.stringify(message, null, 2);
    }
  };
  
  // Get tool uses from message
  const getToolUses = () => {
    const toolUses = [];
    
    if (message.message?.content && Array.isArray(message.message.content)) {
      message.message.content.forEach((item: any) => {
        if (item.type === 'tool_use') {
          toolUses.push(item);
        }
      });
    }
    
    if (message.message?.tool_uses) {
      toolUses.push(...message.message.tool_uses);
    }
    
    return toolUses;
  };
  
  const content = getMessageContent();
  const toolUses = getToolUses();
  const hasContent = content || toolUses.length > 0;
  const roleDisplay = getRoleDisplay();
  const isUser = message.type === 'user' || message.type === 'human_turn';
  
  if (!hasContent && message.type !== 'summary') return null;
  
  return (
    <div className={`${isChild ? 'ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : ''} mb-4`}>
      <div className={`flex items-start gap-3 p-4 rounded-lg ${
        isUser 
          ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800' 
          : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
      }`}>
        <span className={`${roleDisplay.color} font-mono text-lg select-none flex-shrink-0`}>
          {roleDisplay.symbol}
        </span>
        
        <div className="flex-1 min-w-0">
          {/* Main content */}
          {content && (
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {content}
            </div>
          )}
          
          {/* Tool uses */}
          {toolUses.length > 0 && (
            <div className="mt-3 space-y-2">
              {toolUses.map((toolUse: any, idx: number) => (
                <ToolUseDisplay key={idx} toolUse={toolUse} />
              ))}
            </div>
          )}
          
          {/* Timestamp and model info */}
          {(message.timestamp || message.message?.model) && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {message.timestamp && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(message.timestamp)}
                </span>
              )}
              {message.message?.model && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {message.message.model}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolUseDisplay({ toolUse }: { toolUse: any }) {
  const [expanded, setExpanded] = useState(false);
  const toolName = toolUse.name || toolUse.tool_name || 'Unknown Tool';
  const input = toolUse.input || toolUse.parameters || {};
  
  // Format tool name with parameters
  const getToolDisplay = () => {
    const params = [];
    if (input) {
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string' && value.length < 50) {
          params.push(`${key}: "${value}"`);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          params.push(`${key}: ${value}`);
        }
      });
    }
    
    return `${toolName}(${params.join(', ')})${expanded ? '' : '…'}`;
  };
  
  // Count lines in input
  const getLineCount = () => {
    const jsonStr = JSON.stringify(input, null, 2);
    return jsonStr.split('\n').length;
  };
  
  const lineCount = getLineCount();
  const shouldCollapse = lineCount > 5;
  
  return (
    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
      <div 
        className={`text-purple-700 dark:text-purple-300 font-medium flex items-center gap-2 ${
          shouldCollapse ? 'cursor-pointer hover:text-purple-900 dark:hover:text-purple-100' : ''
        }`}
        onClick={() => shouldCollapse && setExpanded(!expanded)}
      >
        <span className="text-purple-600 dark:text-purple-400">⏺</span>
        <span className="font-mono text-sm">{getToolDisplay()}</span>
      </div>
      
      {(expanded || !shouldCollapse) && (
        <div className="mt-2 ml-6">
          <div className="text-purple-600 dark:text-purple-400">⎿</div>
          <pre className="ml-4 mt-1 p-3 bg-gray-900 dark:bg-gray-950 text-gray-300 rounded-md overflow-x-auto text-xs font-mono">
{JSON.stringify(input, null, 2)}
          </pre>
          {shouldCollapse && (
            <div className="ml-4 text-xs text-purple-500 dark:text-purple-400 mt-2">
              (Click to collapse)
            </div>
          )}
        </div>
      )}
      
      {shouldCollapse && !expanded && (
        <div className="ml-8 text-xs text-purple-500 dark:text-purple-400 mt-1">
          ⎿ … +{lineCount} lines (Click to expand)
        </div>
      )}
    </div>
  );
}