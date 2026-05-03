import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Order Received
      </p>
      <h1 className="mb-4 text-3xl font-light tracking-wide">Thank you for your purchase.</h1>
      <p className="mb-8 max-w-md text-sm leading-6 text-muted-foreground">
        This checkout confirmation is mocked for the current FAMES preview.
      </p>
      <Link
        href="/perfumes"
        className="inline-flex min-h-[44px] items-center justify-center bg-primary px-8 py-4 text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
