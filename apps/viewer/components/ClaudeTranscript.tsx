'use client';

import ClaudeMessage from './ClaudeMessage';

interface TranscriptProps {
  messages: any[];
}

export default function ClaudeTranscript({ messages }: TranscriptProps) {
  // Group messages by conversation flow
  const conversationGroups = [];
  let currentGroup = null;
  
  messages.forEach((msg, idx) => {
    // Start a new group for root messages
    if (!msg.parentUuid) {
      if (currentGroup) {
        conversationGroups.push(currentGroup);
      }
      currentGroup = {
        root: msg,
        children: []
      };
    } else if (currentGroup) {
      // Add to current group if it's a direct child
      currentGroup.children.push(msg);
    }
  });
  
  // Don't forget the last group
  if (currentGroup) {
    conversationGroups.push(currentGroup);
  }
  
  return (
    <div className="font-mono">
      {conversationGroups.map((group, idx) => (
        <div key={idx} className="mb-4">
          <ClaudeMessage message={group.root} />
          {group.children.map((child, childIdx) => (
            <ClaudeMessage key={childIdx} message={child} isChild={true} />
          ))}
        </div>
      ))}
    </div>
  );
}