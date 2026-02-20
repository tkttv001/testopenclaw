import type { Metadata } from "next";
import { PageShell } from "@/components/layout";

export const metadata: Metadata = { title: "Contact", description: "Initiate inquiry and secure an execution slot." };

export default function ContactPage() {
  return (
    <PageShell>
      <section>
        <div className="container grid gap-8 py-14 md:grid-cols-2">
          <div>
            <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold">Initiate Inquiry</h1>
            <p className="mt-4 text-[var(--muted)]">Limited availability for Q3. Secure your slot for focused execution and measurable outcomes.</p>
          </div>
          <form className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6" aria-label="Contact form">
            <div className="space-y-4">
              <label className="block text-sm" htmlFor="name">Name</label>
              <input id="name" name="name" required className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3" />
              <label className="block text-sm" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3" />
              <label className="block text-sm" htmlFor="details">Project Details</label>
              <textarea id="details" name="details" rows={5} className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3" />
              <button type="submit" className="focus-ring mt-2 w-full rounded-lg border border-[var(--gold)] px-5 py-3 font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black">Send Inquiry</button>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
