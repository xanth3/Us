import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border px-6 py-6 text-center">
      <BrandLogo className="mb-3" />
      <a
        href="mailto:care@fames.com"
        className="text-xs tracking-widest text-muted-foreground transition-opacity hover:opacity-70"
      >
        CARE@FAMES.COM
      </a>
    </footer>
  );
}
