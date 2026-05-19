/**
 * Drizzle Kit config for schema push / migration generation against Supabase.
 * Run via `pnpm db:generate` and `pnpm db:migrate` (see package.json scripts).
 */
import { defineConfig } from "drizzle-kit";

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "Set POSTGRES_URL_NON_POOLING or POSTGRES_URL before running Drizzle Kit",
  );
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
