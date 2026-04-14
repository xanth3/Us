import { BRAND_NAME_UPPER } from "@/lib/brand";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`brand-logo flex flex-col items-center leading-none ${className}`}>
      <span
        className="text-[1.35rem] font-light tracking-[0.3em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {BRAND_NAME_UPPER}
      </span>
    </div>
  );
}
