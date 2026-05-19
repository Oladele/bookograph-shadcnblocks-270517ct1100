/**
 * Helpers to detect whether Bookograph tables exist in Postgres.
 * Used by `app/seed/route.ts` before running migrations or inserts.
 */
import { sql } from "drizzle-orm";

import { db } from "./index";

const TABLE_NAMES = ["person", "book"] as const;

export type CatalogTable = (typeof TABLE_NAMES)[number];

export type TableExistence = Record<CatalogTable, boolean>;

/** Query information_schema for `person` and `book` in the public schema */
export async function getTableExistence(): Promise<TableExistence> {
  const rows = await db.execute<{ table_name: string }>(sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('person', 'book')
  `);

  const found = new Set(rows.map((row) => row.table_name));

  return {
    person: found.has("person"),
    book: found.has("book"),
  };
}

export function allCatalogTablesExist(existence: TableExistence): boolean {
  return TABLE_NAMES.every((name) => existence[name]);
}
