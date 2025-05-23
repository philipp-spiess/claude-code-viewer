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
  
  // Simple syntax highlighting for common tokens using Catppuccin colors
  const highlightCode = (code: string, lang: string) => {
    if (lang === 'json') {
      return code
        .replace(/("[^"]*":)/g, '<span style="color: var(--color-blue)">$1</span>')
        .replace(/("[^"]*")/g, '<span style="color: var(--color-green)">$1</span>')
        .replace(/(\b\d+\b)/g, '<span style="color: var(--color-mauve)">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span style="color: var(--color-peach)">$1</span>');
    }
    
    if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
      return code
        .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g, 
          '<span style="color: var(--color-mauve)">$1</span>')
        .replace(/(\'[^\']*\'|"[^"]*"|`[^`]*`)/g, '<span style="color: var(--color-green)">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span style="color: var(--color-overlay-0)">$1</span>');
    }
    
    if (lang === 'python') {
      return code
        .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|True|False|None|async|await)\b/g, 
          '<span style="color: var(--color-mauve)">$1</span>')
        .replace(/(\'[^\']*\'|"[^"]*")/g, '<span style="color: var(--color-green)">$1</span>')
        .replace(/(#.*$)/gm, '<span style="color: var(--color-overlay-0)">$1</span>');
    }
    
    return code;
  };
  
  return (
    <div className="relative group my-3">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="px-2 py-1 text-xs bg-surface-1 hover:bg-surface-2 text-text rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="bg-surface-0 rounded overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-surface-1">
          <span className="text-xs text-subtext-1">{language}</span>
        </div>
        <div className="p-3 overflow-x-auto">
          <pre className="text-text">
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