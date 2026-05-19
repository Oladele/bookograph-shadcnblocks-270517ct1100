/**
 * Dashboard shell: full-bleed layout below root padding so Sidebar1 fills the viewport.
 * Sidebar uses in-flow layout (not viewport-fixed) so it stays beside main headers/content.
 */
"use client";

import { Sidebar1 } from "@/components/sidebar1";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Cancel root `body` padding so the dashboard shell can use the full width.
        "-m-4 flex min-h-svh w-[calc(100%+2rem)] overflow-hidden",
        // Contain the default fixed sidebar to this shell (not the viewport).
        "[&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:h-full"
      )}
    >
      <Sidebar1 className="h-full min-h-svh w-full">{children}</Sidebar1>
    </div>
  );
}
