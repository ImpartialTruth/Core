type MechanicVisualProps = {
  kind: "crash" | "instant" | "survival";
};

export function MechanicVisual({ kind }: MechanicVisualProps) {
  if (kind === "crash") {
    return (
      <svg viewBox="0 0 200 100" className="h-20 w-full" role="presentation" aria-hidden="true">
        <path
          d="M6,90 C40,86 55,66 75,52 C100,34 90,20 130,12 C155,7 170,5 194,4"
          fill="none"
          stroke="url(#mini-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className="mechanic-crash-draw"
        />
        <defs>
          <linearGradient id="mini-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--rise)" />
            <stop offset="70%" stopColor="var(--rise)" />
            <stop offset="100%" stopColor="var(--flare)" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (kind === "instant") {
    return (
      <svg viewBox="0 0 200 100" className="h-20 w-full" role="presentation" aria-hidden="true">
        <circle cx="100" cy="50" r="6" fill="var(--rise)" />
        <circle
          cx="100"
          cy="50"
          r="14"
          fill="none"
          stroke="var(--rise)"
          strokeWidth="2"
          className="mechanic-instant-ring"
          style={{ animationDelay: "0s" }}
        />
        <circle
          cx="100"
          cy="50"
          r="14"
          fill="none"
          stroke="var(--rise)"
          strokeWidth="2"
          className="mechanic-instant-ring"
          style={{ animationDelay: "0.6s" }}
        />
        <circle
          cx="100"
          cy="50"
          r="14"
          fill="none"
          stroke="var(--rise)"
          strokeWidth="2"
          className="mechanic-instant-ring"
          style={{ animationDelay: "1.2s" }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 100" className="h-20 w-full" role="presentation" aria-hidden="true">
      <rect x="6" y="44" width="188" height="12" rx="6" fill="var(--steel-line)" />
      <rect
        x="6"
        y="44"
        height="12"
        rx="6"
        fill="url(#mini-gradient-survival)"
        className="mechanic-survival-fill"
      />
      <defs>
        <linearGradient id="mini-gradient-survival" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--flare)" />
          <stop offset="60%" stopColor="#f5b942" />
          <stop offset="100%" stopColor="var(--rise)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
