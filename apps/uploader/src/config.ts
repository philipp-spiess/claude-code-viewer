import { homedir } from "node:os";
import { join } from "node:path";

export function getClaudeProjectsDir(): string {
  return join(homedir(), ".claude", "projects");
}
