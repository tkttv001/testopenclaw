import type { Metadata } from "next";
import { PageShell } from "@/components/layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a premium private dining experience or chef collaboration.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="border-b border-[var(--border)]">
        <div className="container py-16">
          <p className="gold-chip">Contact</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">Book Your Private Dining Experience</h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">Share your date, guest count, and preferred tasting direction. Response within 24 hours.</p>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <form className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 md:grid-cols-2">
            <label className="text-sm">Full name
              <input className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2" placeholder="Your name" />
            </label>
            <label className="text-sm">Email
              <input type="email" className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2" placeholder="you@example.com" />
            </label>
            <label className="text-sm">Event date
              <input type="date" className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2" />
            </label>
            <label className="text-sm">Guest count
              <input className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2" placeholder="e.g. 12" />
            </label>
            <label className="text-sm md:col-span-2">Message
              <textarea rows={5} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2" placeholder="Tell us about your preferred menu style and occasion." />
            </label>
            <button type="button" className="focus-ring md:col-span-2 rounded-lg border border-[var(--gold)] px-5 py-3 font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition">Send Inquiry</button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
