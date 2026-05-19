/**
 * Shared Drizzle client for server-side Postgres (Supabase).
 * Uses a singleton `postgres` connection in development to survive Next.js HMR.
 * Called from API routes such as `app/seed/route.ts`.
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

function getConnectionString(): string {
  const url =
    process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "Missing POSTGRES_URL_NON_POOLING or POSTGRES_URL environment variable",
    );
  }
  return url;
}

const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
};

function getSqlClient() {
  // Reuse one client across hot reloads and serverless invocations
  globalForDb.sql ??= postgres(getConnectionString(), { prepare: false });
  return globalForDb.sql;
}

export const db = drizzle(getSqlClient(), { schema });
export { schema };
