'use client'

import { useState } from 'react'
import MessageView from './MessageView'

interface MessageProps {
  message: any
  isNested?: boolean
}

export default function MessageThread({ message, isNested = false }: MessageProps) {
  const [expanded, setExpanded] = useState(true)
  const isSidechain = message.isSidechain === true
  const hasChildren = message.children && message.children.length > 0

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  // Get model info
  const getModelInfo = () => {
    if (message.message?.model) {
      return message.message.model
    }
    return null
  }

  return (
    <div
      className={`${isSidechain && !isNested ? 'ml-8 border-l-2 border-gray-300 dark:border-gray-600 pl-4' : ''}`}
    >
      {/* Message Header */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasChildren && (
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            {message.timestamp && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(message.timestamp)}
              </span>
            )}
            {isSidechain && !isNested && (
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
      <details open className="mb-4">
        <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          {message.type} message
          {message.message?.role && ` (${message.message.role})`}
        </summary>
        <div className="mt-2 pl-4">
          <MessageView message={message} />
        </div>
      </details>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="space-y-2">
          {message.children.map((child: any, index: number) => (
            <MessageThread key={child.uuid || index} message={child} isNested={true} />
          ))}
        </div>
      )}
    </div>
  )
}
