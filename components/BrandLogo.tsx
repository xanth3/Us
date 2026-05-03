interface BrandLogoProps {
  className?: string;
  variant?: "primary" | "navbar";
  inverted?: boolean;
}

export function BrandLogo({
  className = "",
  variant = "primary",
  inverted = false,
}: BrandLogoProps) {
  const src = variant === "navbar"
    ? "/assets/brand/fames-logo-navbar.png"
    : "/assets/brand/fames-logo-primary.png";

  return (
    <div className={`brand-logo flex flex-col items-center leading-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="FAMES"
        className="h-8 w-auto object-contain mix-blend-multiply transition-[filter] duration-300"
        style={{
          filter: inverted ? "invert(1)" : undefined,
        }}
      />
    </div>
  );
}
