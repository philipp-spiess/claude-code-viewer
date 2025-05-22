import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

export interface Config {
  serverUrl: string;
}

const CONFIG_DIR = join(homedir(), '.claude-viewer');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

const DEFAULT_CONFIG: Config = {
  serverUrl: 'http://localhost:3000'
};

export function loadConfig(): Config {
  try {
    if (!existsSync(CONFIG_FILE)) {
      return DEFAULT_CONFIG;
    }
    const content = readFileSync(CONFIG_FILE, 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(content) };
  } catch (error) {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: Partial<Config>): void {
  const currentConfig = loadConfig();
  const newConfig = { ...currentConfig, ...config };
  
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  
  writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2));
}

export function getClaudeProjectsDir(): string {
  return join(homedir(), '.claude', 'projects');
}