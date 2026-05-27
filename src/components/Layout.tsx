import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

const nav = [
  { to: "/", label: "Threshold", index: "00" },
  { to: "/about", label: "Origin", index: "01" },
  { to: "/sermons", label: "Echoes", index: "02" },
  { to: "/events", label: "Gatherings", index: "03" },
  { to: "/resources", label: "Embers", index: "04" },
  { to: "/gallery", label: "Traces", index: "05" },
  { to: "/contact", label: "Whisper", index: "06" },
];

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = nav.find((n) => n.to === pathname) ?? nav[0];

  return (
    <div className="grain min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-x-hidden">
      {/* Ambient corner mark — index */}
      <div className="fixed top-6 left-6 md:top-8 md:left-10 z-40 text-[10px] tracking-[0.4em] uppercase text-foreground/40">
        <span className="tabular-nums">{current.index}</span>
        <span className="mx-3 text-foreground/20">/</span>
        <span>{current.label}</span>
      </div>

      {/* Hidden nav trigger */}
      <button
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-40 group flex items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/30 group-hover:text-foreground/80 transition-colors duration-[1200ms]">
          Enter
        </span>
        <span className="block w-8 h-px bg-foreground/30 group-hover:bg-foreground/80 group-hover:w-12 transition-all duration-[1200ms]" />
      </button>

      {/* Whisper at bottom */}
      <div className="fixed bottom-6 left-6 md:bottom-8 md:left-10 z-40 text-[10px] tracking-[0.4em] uppercase text-foreground/30">
        Youth · on · Fire
      </div>
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-40 text-[10px] tracking-[0.4em] uppercase text-foreground/30 tabular-nums hidden sm:block">
        MMXXVI
      </div>

      {/* Overlay nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl"
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-10 group flex items-center gap-3"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 group-hover:text-foreground transition-colors duration-700">
                Close
              </span>
              <span className="block w-8 h-px bg-foreground/50 group-hover:bg-foreground transition-colors duration-700" />
            </button>

            <nav className="h-full w-full flex flex-col items-center justify-center gap-3 md:gap-5 px-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  className="group"
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-6 md:gap-10"
                  >
                    <span className="text-[10px] tracking-[0.4em] text-foreground/30 tabular-nums group-hover:text-primary transition-colors duration-700">
                      {item.index}
                    </span>
                    <span className="font-display italic text-3xl md:text-6xl text-foreground/70 group-hover:text-foreground group-hover:tracking-wide transition-all duration-[1200ms]">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with slow fade */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}

export function Slow({ children, delay = 0, y = 12 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, label }: { children: ReactNode; label: string }) {
  const [shown, setShown] = useState(false);
  return (
    <button
      onMouseEnter={() => setShown(true)}
      onFocus={() => setShown(true)}
      onClick={() => setShown((s) => !s)}
      className="group block text-left w-full"
    >
      <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 group-hover:text-primary transition-colors duration-1000">
        {label}
      </span>
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-foreground/70 font-display italic text-xl leading-relaxed max-w-md">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
