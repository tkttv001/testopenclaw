import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { posts } from "@/components/content";

export const metadata: Metadata = { title: "Blog", description: "Notes on design leadership, execution, and product clarity." };

export default function BlogPage() {
  return (
    <PageShell>
      <section>
        <div className="container py-14">
          <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold">Insights from the field</h1>
          <div className="mt-8 space-y-4">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
                <p className="text-xs text-[var(--gold)]">{post.date}</p>
                <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
                <p className="mt-2 max-w-3xl leading-7 text-[var(--muted)]">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
