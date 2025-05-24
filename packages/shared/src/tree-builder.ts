import type { MessageNode, TranscriptMessage } from './types.js'

/**
 * Builds a tree structure from messages based on parentUuid relationships
 * and links ToolUse messages with their corresponding ToolResults
 */
export function buildMessageTree(messages: TranscriptMessage[]): MessageNode[] {
  // Create a map of uuid -> message for quick lookup
  const messageMap = new Map<string, TranscriptMessage>()
  messages.forEach((msg) => {
    if ('uuid' in msg && msg.uuid) {
      messageMap.set(msg.uuid, msg)
    }
  })

  // Create a map to store tool results by tool_use_id
  const toolResultMap = new Map<string, any>()

  // First pass: collect all tool results from user messages
  messages.forEach((msg) => {
    if (msg.type === 'user' && msg.message?.content && Array.isArray(msg.message.content)) {
      msg.message.content.forEach((item: any) => {
        if (item.type === 'tool_result' && item.tool_use_id) {
          toolResultMap.set(item.tool_use_id, item.content)
        }
      })
    }
  })

  // Create nodes for all messages
  const nodeMap = new Map<string, MessageNode>()
  messages.forEach((msg) => {
    if ('uuid' in msg && msg.uuid) {
      const node: MessageNode = {
        message: msg,
        children: [],
      }

      // If this is an assistant message, try to link tool results
      if (msg.type === 'assistant' && msg.message?.content) {
        const toolUses = msg.message.content.filter((item: any) => item.type === 'tool_use')
        if (toolUses.length > 0) {
          // Look for matching tool results
          const toolResults: Record<string, any> = {}
          toolUses.forEach((toolUse: any) => {
            if (toolUse.id && toolResultMap.has(toolUse.id)) {
              toolResults[toolUse.id] = toolResultMap.get(toolUse.id)
            }
          })
          if (Object.keys(toolResults).length > 0) {
            node.toolResult = toolResults
          }
        }
      }

      nodeMap.set(msg.uuid, node)
    }
  })

  // Build parent-child relationships
  const rootNodes: MessageNode[] = []

  messages.forEach((msg) => {
    if ('uuid' in msg && msg.uuid) {
      const node = nodeMap.get(msg.uuid)
      if (!node) return

      if ('parentUuid' in msg && msg.parentUuid && nodeMap.has(msg.parentUuid)) {
        // This message has a parent, add it as a child
        const parentNode = nodeMap.get(msg.parentUuid)
        if (parentNode) {
          parentNode.children.push(node)
        }
      } else {
        // This is a root message
        rootNodes.push(node)
      }
    }
  })

  // Sort children by timestamp if available
  const sortByTimestamp = (nodes: MessageNode[]) => {
    return nodes.sort((a, b) => {
      const timeA = 'timestamp' in a.message ? a.message.timestamp : ''
      const timeB = 'timestamp' in b.message ? b.message.timestamp : ''
      return timeA.localeCompare(timeB)
    })
  }

  // Recursively sort all children
  const sortChildrenRecursively = (node: MessageNode) => {
    node.children = sortByTimestamp(node.children)
    node.children.forEach(sortChildrenRecursively)
  }

  rootNodes.forEach(sortChildrenRecursively)

  return sortByTimestamp(rootNodes)
}

/**
 * Flattens a message tree back to a linear array while preserving the tree structure info
 */
export function flattenMessageTree(tree: MessageNode[]): (MessageNode & { depth: number })[] {
  const result: (MessageNode & { depth: number })[] = []

  const flatten = (nodes: MessageNode[], depth = 0) => {
    nodes.forEach((node) => {
      result.push({ ...node, depth })
      if (node.children.length > 0) {
        flatten(node.children, depth + 1)
      }
    })
  }

  flatten(tree)
  return result
}
