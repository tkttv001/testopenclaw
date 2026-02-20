const services = [
  {
    title: "Strategic Consulting",
    description:
      "Roadmaps for high-stakes initiatives, risk controls, and measurable execution plans.",
  },
  {
    title: "Product Design",
    description:
      "Conversion-focused digital product design from discovery to launch-ready interfaces.",
  },
  {
    title: "Technical Leadership",
    description:
      "Architecture, delivery cadence, and engineering alignment for complex systems.",
  },
];

const projects = [
  {
    title: "Fortune 500 Digital Transformation",
    result: "Cut decision-to-delivery cycle by 34% across 4 product teams.",
    tag: "Enterprise",
  },
  {
    title: "B2B SaaS Platform Redesign",
    result: "Increased trial-to-paid conversion from 7.8% to 12.6% in 90 days.",
    tag: "SaaS",
  },
  {
    title: "Fintech Core Workflow Rebuild",
    result: "Reduced operational errors by 41% while improving team throughput.",
    tag: "Fintech",
  },
];

const testimonials = [
  {
    quote:
      "A rare combination of strategic clarity and execution discipline. Delivery was exact.",
    person: "VP Product, Global Technology Group",
  },
  {
    quote:
      "He brought order to chaos and shipped results under pressure.",
    person: "Director of Engineering, Financial Services",
  },
  {
    quote:
      "Premium standard from concept to launch. Precise, fast, reliable.",
    person: "Founder, Venture-backed SaaS",
  },
];

export function TopNav() {
  const items = ["about", "services", "projects", "contact"];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[#0b0b0df2] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#home" className="focus-ring rounded-md text-sm font-semibold tracking-[0.24em] text-[var(--gold)] uppercase">
          Ronin
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <li key={item}>
              <a className="focus-ring rounded-md text-sm text-[var(--muted)] capitalize transition hover:text-white" href={`#${item}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="focus-ring rounded-lg border border-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black"
        >
          Book a Call
        </a>
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="enso" aria-hidden="true" />
        <div className="ink-stroke" aria-hidden="true" />
        <p className="mb-4 text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Ronin Premium Dark</p>
        <h1 className="max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
          DISCIPLINED EXECUTION. <span className="text-[var(--gold)]">UNCOMPROMISING RESULTS.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          I help teams deliver high-stakes digital products with precision, reliability, and strategic focus.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="focus-ring rounded-lg border border-[var(--gold)] px-6 py-3 font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black"
          >
            Start Your Project
          </a>
          <a
            href="#projects"
            className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-white transition hover:border-[var(--gold)]"
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">About</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The Path of the Modern Ronin</h2>
          <p className="mt-6 leading-8 text-[var(--muted)]">
            I partner with ambitious teams that need calm leadership under pressure. My work is rooted in clarity,
            disciplined systems, and an obsession with outcomes—not activity.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-8">
          <h3 className="text-xl font-semibold">Core principles</h3>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            <li>• Precision over noise</li>
            <li>• Systems over heroics</li>
            <li>• Outcomes over output</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Services</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 transition hover:border-[var(--gold)]"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Projects</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
              <span className="inline-block rounded-full border border-[var(--gold)] px-3 py-1 text-xs text-[var(--gold)]">
                {project.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{project.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Testimonials</p>
        <h2 id="testimonials-title" className="sr-only">
          Testimonials
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.person} className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6">
              <p className="text-lg leading-8 text-[var(--gold-soft)]">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-[var(--muted)]">— {t.person}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm tracking-[0.2em] text-[var(--gold)] uppercase">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold">Initiate Inquiry</h2>
          <p className="mt-5 max-w-lg leading-8 text-[var(--muted)]">
            Limited availability for Q3. Secure your slot for focused execution and measurable outcomes.
          </p>
        </div>
        <form className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-6" aria-label="Contact form">
          <div className="space-y-4">
            <label className="block text-sm" htmlFor="name">
              Name
            </label>
            <input id="name" name="name" required className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3" />
            <label className="block text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3"
            />
            <label className="block text-sm" htmlFor="details">
              Project Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[#101015] px-4 py-3"
            />
            <button
              type="submit"
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--gold)] px-5 py-3 font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="inline-block h-5 w-5 rounded-full border border-[var(--gold)]" aria-hidden="true" />
        <span>© {new Date().getFullYear()} Ronin Portfolio</span>
      </div>
      <div className="flex gap-5">
        <a href="https://www.linkedin.com" className="focus-ring rounded-md hover:text-white">
          LinkedIn
        </a>
        <a href="https://x.com" className="focus-ring rounded-md hover:text-white">
          X
        </a>
      </div>
    </footer>
  );
}
