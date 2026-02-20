import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SiteFooter,
  TestimonialsSection,
  TopNav,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <TopNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
