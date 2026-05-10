import type { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-violet-glow)]/40 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

/* Lighter, single-layer shadows replace the old multi-layer acid glow. */
const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-[#c47bff] to-[#7e14ff] text-white hover:brightness-110 active:scale-[0.98] shadow-[0_8px_22px_-12px_rgba(126,20,255,0.55)]",
  secondary:
    "bg-white/[0.06] text-white hover:bg-white/10 border border-white/10",
  ghost:
    "text-white/70 hover:text-white hover:bg-white/[0.04]",
  outline:
    "border border-white/15 text-white hover:bg-white/[0.04] hover:border-[color:var(--color-violet-glow)]/40",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & CommonProps) {
  return (
    <button {...props} className={cn(base, variants[variant], sizes[size], className)}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps) {
  return (
    <a {...props} className={cn(base, variants[variant], sizes[size], className)}>
      {iconLeft}
      {children}
      {iconRight}
    </a>
  );
}
