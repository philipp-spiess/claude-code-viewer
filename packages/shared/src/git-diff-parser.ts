interface DiffHunk {
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  lines: DiffLine[]
}

interface DiffLine {
  type: 'context' | 'addition' | 'deletion'
  content: string
  oldLineNumber?: number
  newLineNumber?: number
}

interface ParsedDiff {
  oldFile: string
  newFile: string
  hunks: DiffHunk[]
}

export function parseEditToolDiff(
  oldString: string,
  newString: string,
  filePath: string,
): ParsedDiff {
  const oldLines = oldString.split('\n')
  const newLines = newString.split('\n')

  // Simple diff algorithm - find common prefix and suffix
  let commonPrefixLength = 0
  const minLength = Math.min(oldLines.length, newLines.length)

  // Find common prefix
  while (
    commonPrefixLength < minLength &&
    oldLines[commonPrefixLength] === newLines[commonPrefixLength]
  ) {
    commonPrefixLength++
  }

  // Find common suffix
  let commonSuffixLength = 0
  while (
    commonSuffixLength < minLength - commonPrefixLength &&
    oldLines[oldLines.length - 1 - commonSuffixLength] ===
      newLines[newLines.length - 1 - commonSuffixLength]
  ) {
    commonSuffixLength++
  }

  const diffLines: DiffLine[] = []
  let oldLineNum = 1
  let newLineNum = 1

  // Add context lines before change
  const contextBefore = Math.min(3, commonPrefixLength)
  for (let i = commonPrefixLength - contextBefore; i < commonPrefixLength; i++) {
    if (i >= 0) {
      diffLines.push({
        type: 'context',
        content: oldLines[i] || '',
        oldLineNumber: oldLineNum++,
        newLineNumber: newLineNum++,
      })
    }
  }

  // Add deleted lines
  const deletedStart = commonPrefixLength
  const deletedEnd = oldLines.length - commonSuffixLength
  for (let i = deletedStart; i < deletedEnd; i++) {
    diffLines.push({
      type: 'deletion',
      content: oldLines[i] || '',
      oldLineNumber: oldLineNum++,
    })
  }

  // Add added lines
  const addedStart = commonPrefixLength
  const addedEnd = newLines.length - commonSuffixLength
  for (let i = addedStart; i < addedEnd; i++) {
    diffLines.push({
      type: 'addition',
      content: newLines[i] || '',
      newLineNumber: newLineNum++,
    })
  }

  // Update line numbers for additions
  newLineNum = 1 + commonPrefixLength
  for (const line of diffLines) {
    if (line.type === 'addition') {
      line.newLineNumber = newLineNum++
    } else if (line.type === 'context' && line.newLineNumber) {
      newLineNum = line.newLineNumber + 1
    }
  }

  // Add context lines after change
  const contextAfter = Math.min(3, commonSuffixLength)
  const contextStart = oldLines.length - commonSuffixLength
  for (let i = contextStart; i < contextStart + contextAfter; i++) {
    if (i < oldLines.length) {
      diffLines.push({
        type: 'context',
        content: oldLines[i] || '',
        oldLineNumber: oldLineNum++,
        newLineNumber: newLineNum++,
      })
    }
  }

  const hunk: DiffHunk = {
    oldStart: Math.max(1, commonPrefixLength - contextBefore + 1),
    oldLines: deletedEnd - deletedStart + contextBefore + contextAfter,
    newStart: Math.max(1, commonPrefixLength - contextBefore + 1),
    newLines: addedEnd - addedStart + contextBefore + contextAfter,
    lines: diffLines,
  }

  return {
    oldFile: filePath,
    newFile: filePath,
    hunks: [hunk],
  }
}

export function formatDiff(diff: ParsedDiff): string {
  const lines: string[] = []

  lines.push(`--- ${diff.oldFile}`)
  lines.push(`+++ ${diff.newFile}`)

  for (const hunk of diff.hunks) {
    lines.push(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`)

    for (const line of hunk.lines) {
      let prefix = ' '
      if (line.type === 'addition') prefix = '+'
      else if (line.type === 'deletion') prefix = '-'

      lines.push(`${prefix}${line.content}`)
    }
  }

  return lines.join('\n')
}

export function parseClaudeEditMessage(message: any): ParsedDiff | null {
  // Check if this is an assistant message with Edit tool use
  if (message.role !== 'assistant' || !message.content) {
    return null
  }

  for (const content of message.content) {
    if (content.type === 'tool_use' && content.name === 'Edit' && content.input) {
      const { file_path, old_string, new_string } = content.input
      if (file_path && old_string && new_string) {
        return parseEditToolDiff(old_string, new_string, file_path)
      }
    }
  }

  return null
}
