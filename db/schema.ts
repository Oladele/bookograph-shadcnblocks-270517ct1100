/**
 * Drizzle schema for Bookograph (Supabase Postgres).
 * `person` stores unique Gutendex contributors; `book` stores catalog rows with
 * JSONB role arrays matching `app/seed/books.ts`. Consumed by `db/index.ts` and
 * `app/seed/route.ts` for migrations and seeding.
 */
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

/** Contributor shape embedded in Gutendex book payloads */
export type PersonRecord = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export const person = pgTable("person", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthYear: integer("birth_year"),
  deathYear: integer("death_year"),
});

export const book = pgTable("book", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  summaries: jsonb("summaries").$type<string[]>().notNull(),
  subjects: jsonb("subjects").$type<string[]>().notNull(),
  bookshelves: jsonb("bookshelves").$type<string[]>().notNull(),
  languages: jsonb("languages").$type<string[]>().notNull(),
  copyright: boolean("copyright").notNull(),
  mediaType: text("media_type").notNull(),
  formats: jsonb("formats").$type<Record<string, string>>().notNull(),
  downloadCount: integer("download_count").notNull(),
  authors: jsonb("authors").$type<PersonRecord[]>().notNull(),
  editors: jsonb("editors").$type<PersonRecord[]>().notNull(),
  translators: jsonb("translators").$type<PersonRecord[]>().notNull(),
});
