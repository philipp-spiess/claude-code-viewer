'use client'

import { useState } from 'react'
import { formatDiff, parseClaudeEditMessage } from '../../../packages/shared/src/git-diff-parser'

interface ToolUseProps {
  toolUse: {
    tool_name?: string
    name?: string
    parameters?: any
    input?: any
    result?: any
    output?: any
    error?: any
    id?: string
  }
}

export default function ToolUse({ toolUse }: ToolUseProps) {
  const [expanded, setExpanded] = useState(false)
  const toolName = toolUse.tool_name || toolUse.name || 'Unknown Tool'

  // Check if this is an Edit tool with diff capability
  const isEditTool = toolName.toLowerCase() === 'edit' && toolUse.input
  const diff = isEditTool
    ? parseClaudeEditMessage({
        role: 'assistant',
        content: [{ type: 'tool_use', name: 'Edit', input: toolUse.input }],
      })
    : null

  // Get icon based on tool name
  const getToolIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('bash') || lowerName.includes('command')) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )
    }
    if (lowerName.includes('read') || lowerName.includes('file')) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    }
    if (lowerName.includes('write') || lowerName.includes('edit')) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      )
    }
    if (lowerName.includes('search') || lowerName.includes('grep')) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    )
  }

  const hasError =
    toolUse.error || (toolUse.result && typeof toolUse.result === 'object' && toolUse.result.error)

  return (
    <div className="bg-surface-0/30 rounded overflow-hidden">
      {/* Tool header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-2 bg-surface-0 hover:bg-surface-1 transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <div className={`${hasError ? 'text-red' : 'text-subtext-1'}`}>
            {getToolIcon(toolName)}
          </div>
          <span className="text-text">{toolName}</span>
          {hasError && <span className="text-red">Error</span>}
        </div>
        <svg
          className={`w-4 h-4 text-subtext-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Tool content */}
      {expanded && (
        <div className="p-3 space-y-3">
          {/* Parameters or Input */}
          {(toolUse.parameters || toolUse.input) && (
            <div>
              <h4 className="text-subtext-0 uppercase tracking-wider mb-2 text-xs">
                {toolUse.input ? 'Input' : 'Parameters'}
              </h4>
              {diff ? (
                <div className="bg-base rounded overflow-x-auto">
                  <pre className="text-text p-3 font-mono text-sm">{formatDiff(diff)}</pre>
                </div>
              ) : (
                <pre className="bg-base p-3 rounded overflow-x-auto text-text">
                  {JSON.stringify(toolUse.parameters || toolUse.input, null, 2)}
                </pre>
              )}
            </div>
          )}

          {/* Result/Output */}
          {(toolUse.result || toolUse.output) && (
            <div>
              <h4 className="text-subtext-0 uppercase tracking-wider mb-2 text-xs">
                {hasError ? 'Error' : 'Result'}
              </h4>
              <div className="bg-base rounded p-3 overflow-x-auto">
                <pre className={`${hasError ? 'text-red' : 'text-text'}`}>
                  {typeof (toolUse.result || toolUse.output) === 'string'
                    ? toolUse.result || toolUse.output
                    : JSON.stringify(toolUse.result || toolUse.output, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
