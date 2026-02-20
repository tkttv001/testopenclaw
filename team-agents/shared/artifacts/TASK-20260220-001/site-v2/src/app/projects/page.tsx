import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { projects } from "@/components/content";

export const metadata: Metadata = { title: "Projects", description: "Selected case studies and proof of delivery outcomes." };

export default function ProjectsPage() {
  return (
    <PageShell>
      <section>
        <div className="container py-14">
          <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold">Proof, not promises</h1>
          <div className="mt-8 grid-390">
            {projects.map((p) => (
              <article key={p.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
                <span className="inline-block rounded-full border border-[var(--gold)] px-3 py-1 text-xs text-[var(--gold)]">{p.tag}</span>
                <h2 className="mt-3 text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 leading-7 text-[var(--muted)]">{p.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
