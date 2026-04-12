export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`brand-logo flex flex-col items-center leading-none ${className}`}>
      <span
        className="text-[1.75rem] font-light tracking-[0.3em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        U<span className="relative text-[1.1rem]" style={{ marginLeft: "-0.15em" }}>S</span>
      </span>
    </div>
  );
}
