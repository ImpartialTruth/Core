const CURVE_PATH =
  "M10,370 C110,362 150,335 190,305 C250,262 235,232 300,205 " +
  "C385,170 365,142 435,118 C525,90 505,68 605,50 " +
  "C705,32 685,15 785,10 C845,7 890,5 930,4 L930,60 L950,388";

type TensionCurveProps = {
  className?: string;
  /** Renders a static, mid-rise frame instead of the looping animation. */
  static?: boolean;
};

export function TensionCurve({ className, static: isStatic }: TensionCurveProps) {
  return (
    <svg
      viewBox="0 0 960 400"
      preserveAspectRatio="none"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="curve-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--rise)" />
          <stop offset="65%" stopColor="var(--rise)" />
          <stop offset="90%" stopColor="#f5b942" />
          <stop offset="100%" stopColor="var(--flare)" />
        </linearGradient>
        <radialGradient id="curve-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--flare)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--flare)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={CURVE_PATH}
        fill="none"
        stroke="var(--steel-line)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d={CURVE_PATH}
        fill="none"
        stroke="url(#curve-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className={isStatic ? undefined : "curve-draw"}
        strokeDasharray={isStatic ? undefined : 1}
        strokeDashoffset={isStatic ? 0.18 : undefined}
      />

      {!isStatic && (
        <circle cx="950" cy="388" r="26" fill="url(#curve-glow)" className="curve-pulse" />
      )}
      <circle cx="950" cy="388" r="4.5" fill={isStatic ? "var(--flare)" : "var(--flare)"} />
    </svg>
  );
}
