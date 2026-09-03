import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.14em] text-[13px] font-semibold transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-ice text-ink hover:bg-fog",
        ghost: "bg-transparent text-fog shadow-border hover:shadow-border-hover",
        live: "bg-live text-ink hover:brightness-110",
        quiet: "bg-panel-2 text-fog hover:bg-edge",
      },
      size: {
        md: "h-11 px-5",
        sm: "h-9 px-3.5 text-[12px]",
        lg: "h-12 px-6 text-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
