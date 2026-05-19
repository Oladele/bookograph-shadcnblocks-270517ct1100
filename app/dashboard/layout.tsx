/**
 * Dashboard shell: wraps all `/dashboard/*` routes with Sidebar1.
 * Page content is passed as `children` and rendered inside SidebarInset.
 */
"use client";

import { Sidebar1 } from "@/components/sidebar1";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar1>{children}</Sidebar1>;
}
