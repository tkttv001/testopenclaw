import type { Metadata } from "next";
import { PageShell } from "@/components/layout";

export const metadata: Metadata = {
  title: "About",
  description: "Chef profile: 6 years of premium culinary experience across the USA and Vietnam.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="border-b border-[var(--border)]">
        <div className="container py-16">
          <p className="gold-chip">About the Chef</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">A Cross-Cultural Culinary Journey</h1>
          <p className="mt-6 max-w-3xl leading-8 text-[var(--muted)]">
            Over six years, I refined my craft through demanding kitchens in both the United States and Vietnam—blending classical structure with vibrant regional character.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)]">
        <div className="container py-14 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
            <h2 className="text-2xl">2019–2022 · United States</h2>
            <p className="mt-3 text-[var(--muted)]">Fine-dining brigade discipline, sauce craft, and high-consistency service systems.</p>
          </article>
          <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
            <h2 className="text-2xl">2022–2025 · Vietnam</h2>
            <p className="mt-3 text-[var(--muted)]">Ingredient intimacy, layered acidity, and heritage-led narrative plating.</p>
          </article>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <h2 className="text-3xl">Philosophy</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
            Premium dining should feel personal, not distant. Every menu is built around seasonality, sensory pacing, and emotional memory—from the first aroma to the final bite.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
