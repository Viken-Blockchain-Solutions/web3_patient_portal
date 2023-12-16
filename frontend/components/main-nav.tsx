import Link from "next/link";

import { cn } from "../lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin_dashboard/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/admin_dashboard/pools"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pools
      </Link>
      <Link
        href="/admin_dashboard/tables"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tables
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}