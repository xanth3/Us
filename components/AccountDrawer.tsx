"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "./icons";
import { useCart } from "./CartProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// ── Google logo SVG ───────────────────────────────────────────────────────────
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
          fill="#EA4335"
        />
      </g>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AccountDrawer() {
  const { accountDrawerOpen, setAccountDrawerOpen } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = accountDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [accountDrawerOpen]);

  // Reset form on close
  useEffect(() => {
    if (!accountDrawerOpen) {
      setEmail("");
      setPassword("");
      setError(null);
      setMagicLinkSent(false);
      setShowPassword(false);
    }
  }, [accountDrawerOpen]);

  const supabase = createSupabaseBrowserClient();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setAccountDrawerOpen(false);
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) { setError("Enter your email address first."); return; }
    setLoading(true);
    setError(null);
    await supabase.auth.signInWithOtp({ email });
    setMagicLinkSent(true);
    setLoading(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setAccountDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          accountDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — slides in from right */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-[480px] bg-white flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
          accountDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-8 py-6">
          <h2 className="text-base font-light tracking-wide">Identification</h2>
          <button
            onClick={() => setAccountDrawerOpen(false)}
            aria-label="Close"
            className="transition-opacity hover:opacity-60"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col px-8 py-8">

          {/* ── Section 1: Already have an account ─────────────────────── */}
          <section>
            <p className="mb-5 text-sm font-light">I already have an account.</p>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-border px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              <GoogleLogo />
              Sign In With Google
            </button>

            {/* OR divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-[0.15em] text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Email / password form */}
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <p className="text-right text-[0.7rem] text-muted-foreground">Required Fields*</p>

              {/* Login */}
              <div>
                <label className="mb-1.5 block text-[0.75rem] tracking-wide">
                  Login*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-[0.75rem] tracking-wide">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full border border-border bg-white px-4 py-3 pr-11 text-sm outline-none transition-colors focus:border-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-opacity hover:opacity-60"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[0.72rem] text-red-500">{error}</p>
              )}

              {/* Forgot password */}
              <button
                type="button"
                className="w-fit text-left text-[0.75rem] underline underline-offset-2 transition-opacity hover:opacity-60"
              >
                Forgot your password?
              </button>

              {/* Magic link */}
              {magicLinkSent ? (
                <p className="text-[0.75rem] text-muted-foreground">
                  Magic link sent — check your inbox.
                </p>
              ) : (
                <p className="text-[0.75rem] text-muted-foreground leading-relaxed">
                  Or use a one-time login link to sign in.{" "}
                  <button
                    type="button"
                    onClick={handleMagicLink}
                    className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60"
                  >
                    Email me the link.
                  </button>
                </p>
              )}

              {/* Sign In button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-foreground py-4 text-xs font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "…" : "Sign In"}
              </button>
            </form>
          </section>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* ── Section 2: No account yet ──────────────────────────────── */}
          <section className="pb-10">
            <p className="mb-2 text-sm font-light">I do not have an account.</p>
            <p className="mb-6 text-[0.75rem] leading-relaxed text-muted-foreground">
              Access your MyXA account to discover your wishlist and order history.
            </p>
            <button className="flex w-full items-center justify-center rounded-full border border-foreground px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-70">
              Create a MyXA Account
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
