"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/admin_dashboard/" className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive("/admin_dashboard/") ? "text-primary" : "text-muted-foreground"
      )}>
          Overview
      </Link>
      <Link href="/admin_dashboard/pools" className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive("/admin_dashboard/pools") ? "text-primary" : "text-muted-foreground"
      )}>
          Pools
      </Link>
      <Link href="/admin_dashboard/contributors" className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive("/admin_dashboard/contributors") ? "text-primary" : "text-muted-foreground"
      )}>
          Contributors
      </Link>
      <Link href="/examples/dashboard" className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive("/examples/dashboard") ? "text-primary" : "text-muted-foreground"
      )}>
          Settings
      </Link>
    </nav>
  );
}
