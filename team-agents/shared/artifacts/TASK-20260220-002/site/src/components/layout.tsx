import Link from "next/link";
import { SiteNav } from "./nav";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell bg-[var(--bg)] text-[var(--text)]">
      <SiteNav />
      <main>{children}</main>
      <footer className="container flex flex-col gap-3 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Chef Atelier</p>
        <div className="flex gap-4">
          <Link href="https://www.instagram.com" className="focus-ring rounded-md hover:text-[var(--text)]">Instagram</Link>
          <Link href="https://www.linkedin.com" className="focus-ring rounded-md hover:text-[var(--text)]">LinkedIn</Link>
        </div>
      </footer>
    </div>
  );
}
