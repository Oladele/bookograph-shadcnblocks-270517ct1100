/**
 * Server-side book catalog metrics for dashboard UI.
 * Queries the `book` table via Drizzle (`@/db`) and is consumed by
 * `app/dashboard/books/page.tsx` for summary stat cards.
 */
import { count, sum } from "drizzle-orm";

import { db } from "@/db";
import { book } from "@/db/schema";

/** Count of rows in the `book` table. */
export async function getTotalBooks(): Promise<number> {
  const [row] = await db.select({ value: count() }).from(book);
  return row?.value ?? 0;
}

/** Sum of `download_count` across all books. */
export async function getTotalDownloads(): Promise<number> {
  const [row] = await db
    .select({ value: sum(book.downloadCount) })
    .from(book);
  return Number(row?.value ?? 0);
}
