const BrandLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`brand-logo flex flex-col items-center leading-none ${className}`}>
      <span className="text-[1.75rem] tracking-[0.3em] font-light" style={{ fontFamily: 'var(--font-display)' }}>
        U<span className="text-[1.1rem] relative" style={{ marginLeft: '-0.15em' }}>S</span>
      </span>
    </div>
  );
};

export default BrandLogo;
