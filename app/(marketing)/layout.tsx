/**
 * Marketing routes (`/`, etc.): site chrome with Navbar1.
 * Dashboard routes live outside this group so the sidebar owns the shell.
 */
import { Navbar1 } from "@/components/navbar1";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Navbar1 />
      {children}
    </div>
  );
}
