import { Link } from "react-router-dom";
import { motion } from "motion/react";

/**
 * Witsmith brand mark.
 * The shape mirrors public/favicon.svg (the lightning "Z" sigil) so the
 * dashboard, favicon and centerpiece animation all share one visual language.
 */
export function Logo({ size = 28, label = true }: { size?: number; label?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="relative" style={{ width: size, height: size }}>
        {/* soft halo — gently breathing, much subtler than the old acid glow */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[10px] blur-md"
          style={{
            background:
              "radial-gradient(closest-side, rgba(170,59,255,0.55), rgba(126,20,255,0.0) 75%)",
          }}
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.svg
          viewBox="0 0 48 46"
          width={size}
          height={size}
          className="relative drop-shadow-[0_2px_10px_rgba(126,20,255,0.35)]"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="bolt-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ede6ff" />
              <stop offset="55%" stopColor="#aa3bff" />
              <stop offset="100%" stopColor="#7e14ff" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bolt-fill)"
            d="M25.95 44.94c-.66.84-2.02.37-2.02-.7V33.94a2.26 2.26 0 0 0-2.26-2.26H10.29c-.92 0-1.46-1.04-.92-1.79l7.48-10.47c1.07-1.5 0-3.58-1.84-3.58H1.24c-.92 0-1.46-1.04-.92-1.79L10.01.47c.21-.3.56-.47.92-.47h28.89c.92 0 1.46 1.04.92 1.79l-7.48 10.47c-1.07 1.5 0 3.58 1.84 3.58h11.38c.94 0 1.47 1.09.89 1.83L25.95 44.94z"
          />
        </motion.svg>
      </div>
      {label && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-[19px] tracking-tight text-white transition-colors group-hover:text-[color:var(--color-violet-glow)]">
            witsmith
          </span>
          <span className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-dim)]">
            agent safety + memory
          </span>
        </div>
      )}
    </Link>
  );
}
