import { homedir } from 'os';
import { join } from 'path';

export function getClaudeProjectsDir(): string {
  return join(homedir(), '.claude', 'projects');
}