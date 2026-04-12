import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-[73px] text-center">
      <p className="text-xs tracking-[0.3em] text-brand-muted uppercase">404</p>
      <h1 className="mt-2 font-playfair text-4xl font-normal">Page not found</h1>
      <p className="mt-4 max-w-sm text-sm text-brand-muted">
        The page you are looking for may have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-brand-black px-8 py-3 text-xs tracking-widest transition-colors hover:bg-brand-black hover:text-white"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
