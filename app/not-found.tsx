import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-[73px] text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
      <h1 className="mt-2 font-display text-4xl font-normal">Page not found</h1>
      <p className="mt-4 max-w-sm text-sm text-muted-foreground">
        The page you are looking for may have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center border border-primary px-8 py-3 text-xs tracking-widest transition-colors hover:bg-primary hover:text-primary-foreground active:opacity-80"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
