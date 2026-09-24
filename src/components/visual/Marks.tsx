/** Small SVG marks used as visual punctuation — not decorative noise. */

export function MarkOrbit({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="32" cy="32" r="22" opacity="0.35" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="52" cy="20" r="2.5" fill="currentColor" stroke="none" />
      <path d="M32 10v8M32 46v8M10 32h8M46 32h8" opacity="0.45" />
    </svg>
  );
}

export function MarkNodes({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 40"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="12" cy="20" r="4" />
      <circle cx="48" cy="12" r="4" />
      <circle cx="48" cy="28" r="4" />
      <circle cx="84" cy="20" r="4" />
      <path d="M16 20h28M52 12l28 8M52 28l28-8" opacity="0.4" />
    </svg>
  );
}

export function MarkBracket({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 48"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M18 4H8v40h10" />
    </svg>
  );
}

export function MarkGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 72"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={8 + c * 20}
            y={8 + r * 20}
            width="14"
            height="14"
            opacity={r === 1 && c === 1 ? 1 : 0.35}
            fill={r === 1 && c === 1 ? "currentColor" : "none"}
          />
        )),
      )}
    </svg>
  );
}

export function MarkWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 28"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M2 14c10-12 20 12 30 0s20 12 30 0 20 12 30 0 20 12 28 0" opacity="0.7" />
    </svg>
  );
}

export function MarkCross({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M16 2v28M2 16h28" />
      <circle cx="16" cy="16" r="5" />
    </svg>
  );
}

export function SectionRule({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <MarkCross className="h-4 w-4 opacity-40" />
      <hr className="rule flex-1" />
      {label ? (
        <span className="mono text-[0.65rem] uppercase tracking-[0.14em] opacity-45">
          {label}
        </span>
      ) : null}
    </div>
  );
}
