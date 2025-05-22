import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// For migrations and development
export const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });

// For queries
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient);

// Export the query client for cleanup if needed
export { queryClient };