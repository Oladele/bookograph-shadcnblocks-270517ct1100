CREATE TABLE "book" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"summaries" jsonb NOT NULL,
	"subjects" jsonb NOT NULL,
	"bookshelves" jsonb NOT NULL,
	"languages" jsonb NOT NULL,
	"copyright" boolean NOT NULL,
	"media_type" text NOT NULL,
	"formats" jsonb NOT NULL,
	"download_count" integer NOT NULL,
	"authors" jsonb NOT NULL,
	"editors" jsonb NOT NULL,
	"translators" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "person" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"birth_year" integer,
	"death_year" integer
);
