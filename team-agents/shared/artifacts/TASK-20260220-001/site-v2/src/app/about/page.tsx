import type { Metadata } from "next";
import { PageShell } from "@/components/layout";

export const metadata: Metadata = { title: "About", description: "The path, principles, and operating model behind Ronin delivery." };

export default function AboutPage() {
  return (
    <PageShell>
      <section className="border-b border-[var(--border)]">
        <div className="container grid gap-8 py-14 md:grid-cols-2">
          <div>
            <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">About</p>
            <h1 className="mt-3 text-4xl font-semibold">The Path of the Modern Ronin</h1>
            <p className="mt-5 leading-8 text-[var(--muted)]">I partner with ambitious teams that need calm leadership under pressure. My process is grounded in precision, systems thinking, and measurable outcomes.</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
            <h2 className="text-2xl font-semibold">Core principles</h2>
            <ul className="mt-4 space-y-2 text-[var(--muted)]">
              <li>• Precision over noise</li>
              <li>• Systems over heroics</li>
              <li>• Outcomes over output</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
