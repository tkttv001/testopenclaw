"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./content";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[#111111ef] backdrop-blur">
      <nav className="container flex items-center justify-between py-4" aria-label="Main navigation">
        <Link href="/" className="focus-ring rounded-md text-sm font-semibold tracking-[0.24em] text-[var(--gold)] uppercase">
          Chef Atelier
        </Link>

        <button
          className="focus-ring rounded-md border border-[var(--border)] px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className={`focus-ring rounded-md text-sm transition hover:text-[var(--text)] ${pathname === item.href ? "text-[var(--text)]" : "text-[var(--muted)]"}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-[var(--border)] md:hidden">
          <ul className="container flex flex-col gap-2 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring block rounded-md px-2 py-2 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
