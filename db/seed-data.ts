/**
 * Transforms Gutendex seed books into Drizzle insert payloads for `person` and `book`.
 * Deduplicates contributors across authors, editors, and translators before insert.
 */
import type { Book, Person } from "@/app/seed/books";

import type { PersonRecord } from "./schema";
import { book, person } from "./schema";

function personKey(p: Person): string {
  return `${p.name}|${p.birth_year ?? ""}|${p.death_year ?? ""}`;
}

function toPersonRecord(p: Person): PersonRecord {
  return {
    name: p.name,
    birth_year: p.birth_year,
    death_year: p.death_year,
  };
}

/** Collect unique contributors from every role on every book */
export function collectUniquePersons(books: Book[]): PersonRecord[] {
  const byKey = new Map<string, PersonRecord>();

  for (const entry of books) {
    for (const contributor of [
      ...entry.authors,
      ...entry.editors,
      ...entry.translators,
    ]) {
      const key = personKey(contributor);
      if (!byKey.has(key)) {
        byKey.set(key, toPersonRecord(contributor));
      }
    }
  }

  return [...byKey.values()];
}

export function toPersonInserts(records: PersonRecord[]) {
  return records.map((p) => ({
    name: p.name,
    birthYear: p.birth_year,
    deathYear: p.death_year,
  }));
}

export function toBookInserts(books: Book[]) {
  return books.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summaries: entry.summaries,
    subjects: entry.subjects,
    bookshelves: entry.bookshelves,
    languages: entry.languages,
    copyright: entry.copyright,
    mediaType: entry.media_type,
    formats: entry.formats,
    downloadCount: entry.download_count,
    authors: entry.authors.map(toPersonRecord),
    editors: entry.editors.map(toPersonRecord),
    translators: entry.translators.map(toPersonRecord),
  }));
}

export { book, person };
