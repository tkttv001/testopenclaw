export function StitchFrame({ page }: { page: "home"|"about"|"signature"|"stories"|"contact" }) {
  return (
    <div className="min-h-screen bg-[#111]">
      <iframe className="hidden md:block h-screen w-full border-0" title={`${page}-desktop`} src={`/stitch/desktop/${page}.html`} />
      <iframe className="block md:hidden h-screen w-full border-0" title={`${page}-mobile`} src={`/stitch/mobile/${page}.html`} />
    </div>
  );
}
