import { motion } from "motion/react";
import { useId, useMemo } from "react";

/**
 * Signature animation.
 *
 * A central witsmith sigil orbited by floating icon glyphs (pulled from
 * public/icons.svg). Layered with:
 *   • a slow aurora (animated gradient blob)
 *   • two conic / dashed orbit traces rotating at different speeds
 *   • floating glyph tiles that bob up and down on their own clocks
 *   • drifting upward sparks for ambient texture
 *
 * Pure CSS / SVG — no canvas, no heavy libs. Designed for the hero.
 */
type Glyph = {
  id: string;        // matches a <symbol id="…"> in public/icons.svg
  label: string;
  ring: 0 | 1 | 2;   // which orbit
  angle: number;     // initial angle in degrees
  tone: "violet" | "lavender" | "cyan";
  floatDelay?: number;
};

const GLYPHS: Glyph[] = [
  { id: "github-icon",        label: "github",        ring: 0, angle: 22,  tone: "violet"   },
  { id: "documentation-icon", label: "documentation", ring: 0, angle: 200, tone: "cyan"     },
  { id: "x-icon",             label: "x",             ring: 1, angle: 80,  tone: "lavender", floatDelay: 1.4 },
  { id: "discord-icon",       label: "discord",       ring: 1, angle: 250, tone: "violet",   floatDelay: 0.7 },
  { id: "social-icon",        label: "community",     ring: 2, angle: 140, tone: "cyan",     floatDelay: 2.1 },
  { id: "bluesky-icon",       label: "bluesky",       ring: 2, angle: 320, tone: "lavender", floatDelay: 1.1 },
];

const RING_RADII = [128, 188, 244]; // px from center for box ~600px

const TONE: Record<Glyph["tone"], { bg: string; ring: string; glow: string }> = {
  violet:   { bg: "rgba(170,59,255,0.10)",  ring: "rgba(170,59,255,0.50)",  glow: "rgba(170,59,255,0.45)"  },
  lavender: { bg: "rgba(237,230,255,0.10)", ring: "rgba(237,230,255,0.55)", glow: "rgba(196,123,255,0.40)" },
  cyan:     { bg: "rgba(71,191,255,0.10)",  ring: "rgba(71,191,255,0.55)",  glow: "rgba(71,191,255,0.40)"  },
};

export function OrbitalCenterpiece({ size = 560 }: { size?: number }) {
  const auroraId = useId().replace(/:/g, "");
  const sparkSeeds = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: 12 + ((i * 67) % 76),
        delay: (i * 0.31) % 4.5,
        scale: 0.6 + ((i * 13) % 7) / 10,
      })),
    []
  );

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, maxWidth: "100%" }}
      aria-hidden
    >
      {/* AURORA — soft drifting gradient backdrop. Opacity stays low so it
          doesn't drown the text above it on the page. */}
      <div
        className="aurora pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 32% at 50% 48%, rgba(170,59,255,0.30) 0%, rgba(170,59,255,0) 70%), " +
            "radial-gradient(28% 22% at 30% 65%, rgba(71,191,255,0.22) 0%, rgba(71,191,255,0) 75%), " +
            "radial-gradient(22% 18% at 72% 32%, rgba(237,230,255,0.18) 0%, rgba(237,230,255,0) 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* ORBIT TRACES — dashed circles that travel in opposite directions */}
      <svg
        className="pointer-events-none absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <defs>
          <linearGradient id={`${auroraId}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ede6ff" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#aa3bff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#47bfff" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id={`${auroraId}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ede6ff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#aa3bff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7e14ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {RING_RADII.map((r, i) => (
          <g key={r} className={i % 2 === 0 ? "spin-slow" : "spin-rev-slow"} style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={`url(#${auroraId}-stroke)`}
              strokeWidth={i === 1 ? 1.1 : 0.8}
              strokeOpacity={0.85}
              className="orbit-trace"
            />
          </g>
        ))}

        {/* Subtle inner sigil ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={84}
          stroke={`url(#${auroraId}-stroke)`}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </svg>

      {/* CORE SIGIL — the witsmith bolt, large + glowing */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative grid h-[120px] w-[120px] place-items-center">
          {/* breathing radial halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(170,59,255,0.55), rgba(170,59,255,0) 70%)",
              filter: "blur(8px)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.1, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg viewBox="0 0 48 46" width="74" height="74" className="relative">
            <defs>
              <linearGradient id={`${auroraId}-bolt`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="40%" stopColor="#ede6ff" />
                <stop offset="100%" stopColor="#7e14ff" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${auroraId}-bolt)`}
              d="M25.95 44.94c-.66.84-2.02.37-2.02-.7V33.94a2.26 2.26 0 0 0-2.26-2.26H10.29c-.92 0-1.46-1.04-.92-1.79l7.48-10.47c1.07-1.5 0-3.58-1.84-3.58H1.24c-.92 0-1.46-1.04-.92-1.79L10.01.47c.21-.3.56-.47.92-.47h28.89c.92 0 1.46 1.04.92 1.79l-7.48 10.47c-1.07 1.5 0 3.58 1.84 3.58h11.38c.94 0 1.47 1.09.89 1.83L25.95 44.94z"
            />
          </svg>
          {/* recording pulse ring */}
          <span
            className="pointer-events-none absolute inset-2 rounded-full border border-[color:var(--color-violet-glow)]/40"
            style={{ boxShadow: "0 0 0 1px rgba(170,59,255,0.18) inset" }}
          />
        </div>
      </motion.div>

      {/* FLOATING GLYPHS — placed on each ring, bobbing on their own clock */}
      {GLYPHS.map((g) => {
        const radius = RING_RADII[g.ring];
        const rad = (g.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const tone = TONE[g.tone];
        const floatClass =
          g.ring === 0 ? "floaty-fast" : g.ring === 1 ? "floaty" : "floaty-slow";

        return (
          <div
            key={g.id}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
          >
            <div
              className={`relative ${floatClass}`}
              style={{ animationDelay: `${g.floatDelay ?? 0}s` }}
            >
              {/* "ground shadow" beneath the floating tile */}
              <span
                aria-hidden
                className="absolute left-1/2 top-full mt-1 h-1.5 w-10 -translate-x-1/2 rounded-full blur-md"
                style={{ background: tone.glow, opacity: 0.5 }}
              />
              {/* tile */}
              <span
                className="relative grid h-12 w-12 place-items-center rounded-2xl border backdrop-blur-md"
                style={{
                  background: tone.bg,
                  borderColor: tone.ring,
                  boxShadow: `0 8px 22px -10px ${tone.glow}`,
                }}
                title={g.label}
              >
                <svg width="22" height="22" aria-hidden>
                  <use href={`/icons.svg#${g.id}`} />
                </svg>
              </span>
            </div>
          </div>
        );
      })}

      {/* SPARKS — drifting up, ambient texture */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {sparkSeeds.map((s, i) => (
          <span
            key={i}
            className="spark absolute bottom-8 h-[3px] w-[3px] rounded-full"
            style={{
              left: `${s.x}%`,
              background: i % 3 === 0 ? "#47bfff" : i % 3 === 1 ? "#ede6ff" : "#aa3bff",
              animationDelay: `${s.delay}s`,
              transform: `scale(${s.scale})`,
              boxShadow: "0 0 6px currentColor",
              color: i % 3 === 0 ? "#47bfff" : i % 3 === 1 ? "#ede6ff" : "#aa3bff",
            }}
          />
        ))}
      </div>
    </div>
  );
}
