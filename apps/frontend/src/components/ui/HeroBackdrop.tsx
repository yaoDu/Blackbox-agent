import { motion } from "motion/react";

/**
 * Hero backdrop. Toned down vs. v1:
 *   • only one orb instead of three overlapping blurs
 *   • softer dot grid
 *   • palette switched to the icon family (purple / cyan / lavender)
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50 mask-fade-b" />

      {/* single soft halo behind the headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(170,59,255,0.16) 0%, rgba(126,20,255,0.04) 45%, transparent 70%)",
        }}
      />

      {/* faint grid lines */}
      <div
        className="absolute inset-0 mask-fade-b opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* ground glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(170,59,255,0.04) 60%, rgba(170,59,255,0.08) 100%)",
        }}
      />
    </div>
  );
}
