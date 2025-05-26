import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import { homedir } from 'os';
import type { TranscriptMessage, SummaryMessage, UserMessage, AssistantMessage, Transcript } from '@claude-viewer/shared';

export interface SessionInfo {
  id: string;
  summary: string;
  messageCount: number;
  lastModified: Date;
  filePath: string;
  transcript: Transcript;
}

export class SessionManager {
  private summaries = new Map<string, string>(); // leafUuid -> summary text
  private messages = new Map<string, TranscriptMessage>(); // uuid -> message object
  private sessionMessages = new Map<string, Set<string>>(); // sessionId -> Set of message uuids
  private fileMessages = new Map<string, Set<string>>(); // filePath -> Set of message uuids

  async loadFromDirectory(directoryPath: string): Promise<void> {
    // Convert current working directory to Claude projects folder
    const claudeProjectsDir = this.mapToClaudeProjectsDir(directoryPath);
    
    if (!existsSync(claudeProjectsDir)) {
      throw new Error(`Claude projects directory not found: ${claudeProjectsDir}\nMake sure you have Claude Code conversations for this project.`);
    }
    
    try {
      const files = await fs.readdir(claudeProjectsDir);
      const jsonlFiles = files.filter(file => file.endsWith('.jsonl'));

      for (const file of jsonlFiles) {
        const filePath = path.join(claudeProjectsDir, file);
        await this.loadFile(filePath);
      }
    } catch (error) {
      console.error(`Error loading Claude projects directory ${claudeProjectsDir}:`, error);
      throw error;
    }
  }

  private mapToClaudeProjectsDir(currentDir: string): string {
    // Convert path like /Users/philipp/dev/claude-code-viewer 
    // to ~/.claude/projects/-Users-philipp-dev-claude-code-viewer
    const encodedPath = currentDir.replace(/\//g, '-');
    return path.join(homedir(), '.claude', 'projects', encodedPath);
  }

  private async loadFile(filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      this.fileMessages.set(filePath, new Set());
      
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line) as TranscriptMessage;
          
          if (parsed.type === 'summary') {
            const summaryMsg = parsed as SummaryMessage;
            this.summaries.set(summaryMsg.leafUuid, summaryMsg.summary);
          } else {
            this.messages.set(parsed.uuid, parsed);
            this.fileMessages.get(filePath)!.add(parsed.uuid);
            
            if (parsed.sessionId) {
              if (!this.sessionMessages.has(parsed.sessionId)) {
                this.sessionMessages.set(parsed.sessionId, new Set());
              }
              this.sessionMessages.get(parsed.sessionId)!.add(parsed.uuid);
            }
          }
        } catch (parseError) {
          console.warn(`Failed to parse line in ${filePath}:`, parseError);
        }
      }
    } catch (error) {
      console.error(`Error loading file ${filePath}:`, error);
    }
  }

  getSessionInfos(): SessionInfo[] {
    const allMessages = Array.from(this.messages.values());
    const leafMessages = allMessages.filter(message => 
      !allMessages.some(otherMessage => otherMessage.parentUuid === message.uuid)
    );

    // Filter out sub-agent conversations using Claude Code's logic
    const mainConversations = leafMessages.filter(leafMessage => {
      const transcript = this.getTranscript(leafMessage);
      
      // Filter out conversations that only have summaries (summary stubs)
      const nonSummaryMessages = transcript.messages.filter(m => m.type !== 'summary');
      if (nonSummaryMessages.length === 0) {
        return false; // This is just a summary stub
      }
      
      // Primary filter: exclude sidechain conversations (sub-agents)
      const hasNonSidechainMessages = transcript.messages.some(message => 
        message.type !== 'summary' && !message.isSidechain
      );
      
      if (!hasNonSidechainMessages) {
        return false; // This is a sidechain (sub-agent) conversation
      }
      
      return true; // This is a main conversation
    });

    return mainConversations.map(leafMessage => {
      const transcript = this.getTranscript(leafMessage);
      const filePath = this.findFileForMessage(leafMessage.uuid);
      
      return {
        id: leafMessage.uuid,
        summary: this.summaries.get(leafMessage.uuid) || this.extractSummaryFromMessages(transcript.messages),
        messageCount: transcript.messages.length,
        lastModified: new Date(leafMessage.timestamp),
        filePath: filePath || '',
        transcript
      };
    }).sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  }

  private findFileForMessage(messageUuid: string): string | undefined {
    for (const [filePath, messageSet] of this.fileMessages.entries()) {
      if (messageSet.has(messageUuid)) {
        return filePath;
      }
    }
    return undefined;
  }

  private getTranscript(leafMessage: TranscriptMessage): Transcript {
    const messages: TranscriptMessage[] = [];
    const visited = new Set<string>();
    
    const collectMessages = (message: TranscriptMessage) => {
      if (visited.has(message.uuid)) return;
      visited.add(message.uuid);
      
      messages.unshift(message);
      
      if (message.parentUuid) {
        const parent = this.messages.get(message.parentUuid);
        if (parent) {
          collectMessages(parent);
        }
      }
    };
    
    collectMessages(leafMessage);
    
    return {
      id: leafMessage.uuid,
      messages,
      messageCount: messages.length
    };
  }

  private extractSummaryFromMessages(messages: TranscriptMessage[]): string {
    const userMessages = messages.filter((m): m is UserMessage => m.type === 'user');
    if (userMessages.length > 0) {
      const firstMessage = userMessages[0];
      const content = typeof firstMessage.message.content === 'string' 
        ? firstMessage.message.content 
        : firstMessage.message.content[0]?.content || '';
      return content.slice(0, 80) + (content.length > 80 ? '...' : '');
    }
    return 'No summary available';
  }

  getTranscriptById(id: string): SessionInfo | undefined {
    return this.getSessionInfos().find(session => session.id === id);
  }

  clear(): void {
    this.summaries.clear();
    this.messages.clear();
    this.sessionMessages.clear();
    this.fileMessages.clear();
  }
}