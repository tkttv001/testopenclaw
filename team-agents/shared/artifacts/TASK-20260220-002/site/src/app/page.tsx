import Link from "next/link";
import { PageShell } from "@/components/layout";
import { signatureMenus, testimonials } from "@/components/content";

export default function HomePage() {
  return (
    <PageShell>
      <section className="relative border-b border-[var(--border)]">
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container relative py-18 sm:py-24 lg:py-30">
          <p className="mb-4 text-sm tracking-[0.22em] text-[var(--gold)] uppercase">Premium Fine Dining</p>
          <h1 className="max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            A PRIVATE CULINARY EXPERIENCE SHAPED BY <span className="text-[var(--gold)]">USA PRECISION</span> & VIETNAMESE SOUL.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            Chef with 6 years of cross-continental experience crafting elevated tasting menus for intimate dinners and luxury gatherings.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact/" className="focus-ring rounded-lg border border-[var(--gold)] px-6 py-3 font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black">Book a Private Dinner</Link>
            <Link href="/projects/" className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold transition hover:border-[var(--gold)]">View Signature Menus</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)]">
        <div className="container py-14">
          <h2 className="text-2xl sm:text-3xl">Signature Highlights</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {signatureMenus.slice(0, 3).map((item) => (
              <article key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 transition hover:-translate-y-1 hover:border-[var(--gold)]">
                <span className="gold-chip">{item.tag}</span>
                <h3 className="mt-3 text-xl">{item.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <h2 className="text-2xl sm:text-3xl">Client Notes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.by} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
                <p className="text-lg leading-8">“{t.quote}”</p>
                <footer className="mt-3 text-sm text-[var(--gold)]">— {t.by}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
