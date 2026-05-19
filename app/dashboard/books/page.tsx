/**
 * Books route (`/dashboard/books`). Rendered inside Sidebar1 via `app/dashboard/layout.tsx`.
 * Loads aggregate catalog stats from `app/data/books.ts` for summary cards.
 */
import { getTotalBooks, getTotalDownloads } from "@/app/data/books";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BooksPage() {
  const [totalBooks, totalDownloads] = await Promise.all([
    getTotalBooks(),
    getTotalDownloads(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Books</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total books</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums tracking-tight">
              {totalBooks.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums tracking-tight">
              {totalDownloads.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
