import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        primary: "bg-[#121efb] text-white hover:bg-[#0e17d9] border-[#0e17d9] border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-[#121efb] hover:bg-[#dddbff]",
        secondary: "bg-[#dddbff] text-[#121efb] hover:bg-[#c9c8ff] border-[#c9c8ff] border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-[#dddbff] hover:bg-[#f0efff]",
        danger: "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super: "bg-[#443dff] text-white hover:bg-[#3b34e5] border-[#3b34e5] border-b-4 active:border-b-0",
        superOutline: "bg-white text-[#443dff] hover:bg-[#dddbff]",
        ghost: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline: "bg-[#121efb]/15 text-[#121efb] border-[#121efb]/30 border-2 hover:bg-[#121efb]/20 transition-none",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
