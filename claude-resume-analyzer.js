#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function formatRelativeTime(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

// Replicates Claude Code's aLA function
function parseJsonlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content.trim()) return [];
    
    return content.split('\n')
      .filter(line => line.trim())
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error(`Error parsing line in ${filePath}: ${error}`);
          return null;
        }
      })
      .filter(parsed => parsed !== null);
  } catch (error) {
    return [];
  }
}

// Replicates Claude Code's wRA class
class SessionManager {
  constructor() {
    this.summaries = new Map(); // leafUuid -> summary text
    this.messages = new Map();  // uuid -> message object
    this.sessionMessages = new Map(); // sessionId -> Set of message uuids
    this.didLoad = false;
  }

  // Replicates loadSessions()
  loadSessions(projectsDir) {
    if (this.didLoad || !fs.existsSync(projectsDir)) return this;

    const files = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.jsonl'))
      .map(dirent => path.join(projectsDir, dirent.name))
      .sort((a, b) => {
        const statA = fs.statSync(a);
        const statB = fs.statSync(b);
        return statA.mtime.getTime() - statB.mtime.getTime();
      });

    for (const filePath of files) {
      const sessionId = path.basename(filePath, '.jsonl');
      const messageUuids = new Set();

      for (const message of parseJsonlFile(filePath)) {
        if (message.type === 'user' || message.type === 'assistant' || message.type === 'attachment') {
          messageUuids.add(message.uuid);
          this.messages.set(message.uuid, message);
        } else if (message.type === 'summary' && message.leafUuid) {
          this.summaries.set(message.leafUuid, message.summary);
        }
      }

      this.sessionMessages.set(sessionId, messageUuids);
    }

    this.didLoad = true;
    return this;
  }

  // Replicates getTranscript() - starts from leaf and goes backwards via parentUuid
  getTranscript(leafMessage) {
    const transcript = [];
    let current = leafMessage;
    
    while (current) {
      transcript.push(current);
      current = current.parentUuid ? this.messages.get(current.parentUuid) : undefined;
    }
    
    return transcript.reverse(); // Reverse to get chronological order
  }

  // Replicates getTranscripts()
  getTranscripts() {
    this.loadSessions();
    const allMessages = [...this.messages.values()];
    
    // Find leaf messages (those that are NOT parents of other messages)
    const leafMessages = allMessages.filter(message => 
      !allMessages.some(otherMessage => otherMessage.parentUuid === message.uuid)
    );

    return leafMessages
      .map(leafMessage => this.getTranscript(leafMessage))
      .filter(transcript => transcript.length > 0);
  }

  getSummaries() {
    return this.summaries;
  }
}

// Get all conversations for display (not filtering like MRA)
function getAllTranscriptsForDisplay(projectsDir) {
  const sessionManager = new SessionManager();
  sessionManager.loadSessions(projectsDir);
  
  return sessionManager.getTranscripts();
}

function getTranscriptSummary(transcript) {
  // Try to extract summary from first user message
  const firstUserMessage = transcript.find(msg => msg.type === 'user');
  if (firstUserMessage && firstUserMessage.message && firstUserMessage.message.content) {
    const content = typeof firstUserMessage.message.content === 'string' 
      ? firstUserMessage.message.content 
      : JSON.stringify(firstUserMessage.message.content);
    return content.substring(0, 60) + (content.length > 60 ? '...' : '');
  }
  return 'No summary available';
}

function analyzeClaudeProjects(projectsDir) {
  if (!fs.existsSync(projectsDir)) {
    console.error(`Directory not found: ${projectsDir}`);
    return;
  }

  const sessionManager = new SessionManager();
  sessionManager.loadSessions(projectsDir);
  const summaries = sessionManager.getSummaries();
  
  const transcripts = getAllTranscriptsForDisplay(projectsDir);
  
  // Convert to display format with timestamps
  const sessions = transcripts.map(transcript => {
    const lastMessage = transcript[transcript.length - 1];
    const firstMessage = transcript[0];
    
    // Check if there's a summary for this conversation
    let summary = getTranscriptSummary(transcript);
    if (summaries.has(lastMessage.uuid)) {
      summary = summaries.get(lastMessage.uuid);
    }
    
    return {
      messageCount: transcript.length,
      lastModified: new Date(lastMessage.timestamp),
      created: new Date(firstMessage.timestamp),
      summary: summary,
    };
  });

  // Sort by last modified time, newest first (like Claude Code)
  sessions.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

  // Output in claude --resume format
  console.log('     Modified    Created     # Messages Summary');
  
  sessions.slice(0, 20).forEach((session, index) => {
    const modifiedTime = formatRelativeTime(session.lastModified);
    const createdTime = formatRelativeTime(session.created);
    const messageCount = session.messageCount.toString().padStart(13);
    const summary = session.summary;
    
    const prefix = index === 0 ? '❯' : ' ';
    const number = (index + 1).toString().padStart(2);
    
    console.log(`${prefix} ${number}. ${modifiedTime.padEnd(11)} ${createdTime.padEnd(11)} ${messageCount} ${summary}`);
  });
}

// Run the analyzer
const projectsDir = process.argv[2] || '/Users/philipp/.claude/projects/-Users-philipp-dev-claude-code-viewer';
analyzeClaudeProjects(projectsDir);