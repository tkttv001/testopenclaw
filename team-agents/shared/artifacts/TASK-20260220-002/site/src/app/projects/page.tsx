import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { signatureMenus } from "@/components/content";

export const metadata: Metadata = {
  title: "Signature",
  description: "Explore signature tasting concepts and private chef experiences.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="border-b border-[var(--border)]">
        <div className="container py-16">
          <p className="gold-chip">Signature Menus</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">Curated Fine Dining Concepts</h1>
        </div>
      </section>

      <section>
        <div className="container py-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {signatureMenus.map((item) => (
            <article key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
              <span className="gold-chip">{item.tag}</span>
              <h2 className="mt-3 text-2xl">{item.title}</h2>
              <p className="mt-2 text-[var(--muted)]">{item.summary}</p>
              <p className="mt-4 text-xs tracking-wide text-[var(--wine)] uppercase">Pairing consultation available</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
