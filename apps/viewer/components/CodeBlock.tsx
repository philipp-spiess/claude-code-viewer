'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  // Simple syntax highlighting for common tokens
  const highlightCode = (code: string, lang: string) => {
    if (lang === 'json') {
      return code
        .replace(/("[^"]*":)/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>')
        .replace(/("[^"]*")/g, '<span class="text-green-600 dark:text-green-400">$1</span>')
        .replace(/(\b\d+\b)/g, '<span class="text-purple-600 dark:text-purple-400">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>');
    }
    
    if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
      return code
        .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g, 
          '<span class="text-purple-600 dark:text-purple-400">$1</span>')
        .replace(/(\'[^\']*\'|"[^"]*"|`[^`]*`)/g, '<span class="text-green-600 dark:text-green-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 dark:text-gray-400">$1</span>');
    }
    
    if (lang === 'python') {
      return code
        .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|True|False|None|async|await)\b/g, 
          '<span class="text-purple-600 dark:text-purple-400">$1</span>')
        .replace(/(\'[^\']*\'|"[^"]*")/g, '<span class="text-green-600 dark:text-green-400">$1</span>')
        .replace(/(#.*$)/gm, '<span class="text-gray-500 dark:text-gray-400">$1</span>');
    }
    
    return code;
  };
  
  return (
    <div className="relative group my-3">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
          <span className="text-xs text-gray-400">{language}</span>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code 
              dangerouslySetInnerHTML={{ 
                __html: highlightCode(code, language) 
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}