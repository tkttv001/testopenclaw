import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { stories } from "@/components/content";

export const metadata: Metadata = {
  title: "Stories",
  description: "Chef journal: ingredients, technique, and fine dining process notes.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <section className="border-b border-[var(--border)]">
        <div className="container py-16">
          <p className="gold-chip">Stories</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">Kitchen Notes & Ingredient Narratives</h1>
        </div>
      </section>

      <section>
        <div className="container py-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((post) => (
            <article key={post.slug} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
              <p className="text-xs tracking-wider text-[var(--gold)] uppercase">{post.date}</p>
              <h2 className="mt-2 text-2xl">{post.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
