import { MechanicVisual } from "@/components/MechanicVisual";
import { TensionCurve } from "@/components/TensionCurve";

const games = [
  {
    kind: "crash" as const,
    label: "Crash",
    title: "The curve everyone watches.",
    body: "A multiplier climbs until it doesn't. Built for the moment a player decides whether to cash out.",
  },
  {
    kind: "instant" as const,
    label: "Instant / mini-games",
    title: "Over in seconds, built for volume.",
    body: "Round-based mechanics tuned for fast repeat play — quick to learn, quick to run again.",
  },
  {
    kind: "survival" as const,
    label: "Survival-format",
    title: "Risk reframed as endurance.",
    body: "Survival-game tension adapted to instant play — how long a player holds the line, not just what they bet.",
  },
];

const process = [
  {
    number: "01",
    title: "Design",
    body: "Visual direction, motion language, and a UI system built for the specific game type — not a reused template.",
  },
  {
    number: "02",
    title: "Build",
    body: "Production frontend: React app shell, PixiJS game canvas, no placeholder code left behind.",
  },
  {
    number: "03",
    title: "Integrate",
    body: "Frontend ships ready to connect to your RGS or backend, and to go through licensing review.",
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:text-ink"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-steel-line/60 bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            ASCENT
          </span>
          <nav className="flex items-center gap-6 font-data text-xs uppercase tracking-widest text-mist">
            <a href="#games" className="transition-colors hover:text-paper">
              Games
            </a>
            <a href="#studio" className="transition-colors hover:text-paper">
              Studio
            </a>
            <a href="#contact" className="transition-colors hover:text-paper">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-steel-line/60">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <TensionCurve className="h-full w-full" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
            <p className="font-data text-xs uppercase tracking-[0.2em] text-mist">
              iGaming frontend studio
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-6xl">
              Every round is a curve.
              <br />
              We build the ones worth riding.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              ASCENT designs and builds the frontend for crash, instant, and
              survival-format games — ready to hand to a provider, ready for
              licensing review.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#games"
                className="rounded-full bg-paper px-6 py-3 font-body text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                See the games
              </a>
              <a
                href="#studio"
                className="font-body text-sm font-medium text-mist transition-colors hover:text-paper"
              >
                How we work →
              </a>
            </div>
          </div>
        </section>

        {/* Thesis strip */}
        <section className="border-b border-steel-line/60 bg-steel/40">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="max-w-3xl font-display text-xl font-medium leading-snug text-paper sm:text-2xl">
              We don&apos;t build casinos. We build the moment before the
              multiplier breaks — then hand you a codebase clean enough to
              license.
            </p>
          </div>
        </section>

        {/* Games */}
        <section id="games" className="border-b border-steel-line/60">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
            <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
              Game types
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-steel-line/60 sm:grid-cols-3">
              {games.map((game) => (
                <article key={game.kind} className="bg-ink p-8">
                  <MechanicVisual kind={game.kind} />
                  <p className="mt-6 font-data text-xs uppercase tracking-widest text-mist">
                    {game.label}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-paper">
                    {game.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {game.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="studio" className="border-b border-steel-line/60 bg-steel/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
            <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
              How we work
            </h2>
            <ol className="mt-10 grid gap-10 sm:grid-cols-3">
              {process.map((step) => (
                <li key={step.number}>
                  <span className="font-data text-sm text-rise">
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing / contact */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
            <p className="max-w-xl font-display text-xl font-medium leading-snug text-paper sm:text-2xl">
              Currently building the first game roster. Frontend-only,
              integration-ready.
            </p>
            {/* TODO: add real contact method once decided */}
            <p className="mt-4 text-sm text-mist">
              Iteration 0 — visual build, zero backend integration.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-steel-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span className="font-display tracking-tight text-paper">
            ASCENT
          </span>
          <span>Placeholder name — swap before this ships publicly.</span>
        </div>
      </footer>
    </>
  );
}
