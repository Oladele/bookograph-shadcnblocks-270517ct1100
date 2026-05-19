/**
 * Database seed API (`GET /seed`).
 * Checks whether `person` and `book` exist in Postgres; if both are present,
 * returns an informational response. Otherwise runs Drizzle migrations, then
 * inserts contributors and books from `app/seed/books.ts`.
 */
import { books } from "@/app/seed/books";
import { db } from "@/db";
import {
  collectUniquePersons,
  person,
  book,
  toBookInserts,
  toPersonInserts,
} from "@/db/seed-data";
import {
  allCatalogTablesExist,
  getTableExistence,
} from "@/db/table-check";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextResponse } from "next/server";
import postgres from "postgres";
import path from "node:path";

export const runtime = "nodejs";

function getMigrationClient() {
  const url =
    process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "Missing POSTGRES_URL_NON_POOLING or POSTGRES_URL environment variable",
    );
  }
  return postgres(url, { prepare: false, max: 1 });
}

/** Apply SQL migrations from `/drizzle` when catalog tables are missing */
async function runMigrations() {
  const client = getMigrationClient();
  const migrationDb = drizzle(client);

  try {
    await migrate(migrationDb, {
      migrationsFolder: path.join(process.cwd(), "drizzle"),
    });
  } finally {
    await client.end();
  }
}

export async function GET() {
  try {
    const existence = await getTableExistence();

    if (allCatalogTablesExist(existence)) {
      return NextResponse.json({
        status: "exists",
        message: "Person and Book tables already exist in the database.",
        tables: existence,
      });
    }

    await runMigrations();

    const afterMigration = await getTableExistence();
    if (!allCatalogTablesExist(afterMigration)) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Migrations ran but Person and/or Book tables are still missing.",
          tables: afterMigration,
        },
        { status: 500 },
      );
    }

    const uniquePersons = collectUniquePersons(books);

    await db.transaction(async (tx) => {
      if (uniquePersons.length > 0) {
        await tx.insert(person).values(toPersonInserts(uniquePersons));
      }
      await tx.insert(book).values(toBookInserts(books));
    });

    return NextResponse.json({
      status: "success",
      message:
        "Person and Book tables were created and populated with seed data.",
      tables: afterMigration,
      counts: {
        persons: uniquePersons.length,
        books: books.length,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error during seed";

    return NextResponse.json(
      {
        status: "error",
        message: `Failed to seed database: ${message}`,
      },
      { status: 500 },
    );
  }
}
