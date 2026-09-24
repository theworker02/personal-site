"use client";

/**
 * Compact schematic ribbon — abstract signal / topology strip.
 * Used between sections where a full Field would be too heavy.
 */
export function SignalRibbon({
  inverse = false,
  className = "",
}: {
  inverse?: boolean;
  className?: string;
}) {
  const stroke = inverse ? "rgba(243,239,231,0.55)" : "rgba(10,10,10,0.45)";
  const faint = inverse ? "rgba(243,239,231,0.2)" : "rgba(10,10,10,0.15)";

  return (
    <svg
      viewBox="0 0 800 80"
      className={`h-16 w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 40 C80 10, 120 70, 200 40 S320 10, 400 40 S520 70, 600 40 S720 10, 800 40"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M0 48 C90 28, 140 68, 220 48 S360 20, 440 48 S580 72, 660 48 S760 30, 800 48"
        fill="none"
        stroke={faint}
        strokeWidth="1"
      />
      {[80, 200, 360, 520, 680].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={i % 2 ? 48 : 40} r="3" fill={stroke} />
          <line
            x1={x}
            y1={12}
            x2={x}
            y2={68}
            stroke={faint}
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}
