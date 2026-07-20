import { config } from "@/data/config";
import SocialHandles from "@/components/site/social-handles";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cream/10 px-6 py-14 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-2xl text-cream">{config.author}</p>
          <p className="label mt-2">{config.tagline}</p>
        </div>
        <SocialHandles />
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="label text-cream/40">
          © {year} {config.author}
        </span>
        <span className="label text-cream/40">
          Built with Next.js · Designed in the Bay
        </span>
      </div>
    </footer>
  );
}

export default Footer;
