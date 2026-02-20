import Link from "next/link";
import { PageShell } from "@/components/layout";
import { posts, projects } from "@/components/content";

export default function HomePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <div className="enso" aria-hidden="true" />
          <div className="ink-stroke" aria-hidden="true" />
          <p className="mb-4 text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Ronin Premium Dark</p>
          <h1 className="max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">DISCIPLINED EXECUTION. <span className="text-[var(--gold)]">UNCOMPROMISING RESULTS.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">I help teams ship high-stakes products with precision, reliability, and strategic calm.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact/" className="focus-ring rounded-lg border border-[var(--gold)] px-6 py-3 font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black">Start Your Project</Link>
            <Link href="/projects/" className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-white transition hover:border-[var(--gold)]">View Work</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)]">
        <div className="container py-14">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <div className="mt-6 grid-390">
            {projects.map((p) => (
              <article key={p.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
                <span className="inline-block rounded-full border border-[var(--gold)] px-3 py-1 text-xs text-[var(--gold)]">{p.tag}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{p.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <h2 className="text-2xl font-semibold">From the Blog</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
                <p className="text-xs text-[var(--gold)]">{post.date}</p>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
