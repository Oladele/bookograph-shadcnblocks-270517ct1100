/**
 * Horizontal bar chart for top-downloaded books on the books dashboard.
 * Receives server-fetched rows from `getTopDownloads()` in `app/data/books.ts`
 * via `app/dashboard/books/page.tsx` (client chart, server data).
 */
"use client";

import { BookOpen } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import type { TopDownloadBook } from "@/app/data/books";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

/** Shorten long titles on the Y-axis; full title remains in the tooltip. */
function truncateTitle(title: string, maxLength = 32): string {
  if (title.length <= maxLength) {
    return title;
  }
  return `${title.slice(0, maxLength - 1)}…`;
}

type BogChartBarHorizontalProps = {
  data: TopDownloadBook[];
};

export function BogChartBarHorizontal({ data }: BogChartBarHorizontalProps) {
  const count = data.length;
  // Scale chart height with bar count so labels stay readable
  const chartHeight = Math.max(280, count * 40);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top downloads</CardTitle>
        <CardDescription>
          {count > 0
            ? `${count} most downloaded ${count === 1 ? "book" : "books"} in the catalog`
            : "No download data available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {count === 0 ? (
          <p className="text-sm text-muted-foreground">
            Seed the database to see download rankings.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto w-full"
            style={{ height: chartHeight }}
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
            >
              <XAxis
                type="number"
                dataKey="downloads"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => Number(value).toLocaleString()}
              />
              <YAxis
                dataKey="title"
                type="category"
                width={200}
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tickFormatter={(value) => truncateTitle(String(value))}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelKey="title"
                    nameKey="downloads"
                  />
                }
              />
              <Bar
                dataKey="downloads"
                fill="var(--color-downloads)"
                radius={5}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      {count > 0 ? (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Ranked as of May 17, 2026
            <BookOpen className="h-4 w-4" aria-hidden />
          </div>
          <div className="leading-none text-muted-foreground">
            Hover a bar for the full title and exact download total
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
}
