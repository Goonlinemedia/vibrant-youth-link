import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { AtmosphericSoundWave } from "@/components/Atmosphere";
import { useTheme } from "@/components/ThemeProvider";
import Footer4Col from "@/components/ui/footer-column";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center justify-center bg-background/40 hover:bg-background/80 border border-border/40 hover:border-primary/40 h-9 w-9 rounded-full transition-all duration-[1000ms] cursor-pointer relative overflow-hidden focus:outline-none"
      title="Toggle light/dark theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon */}
        <span
          className={`absolute transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          } text-primary`}
        >
          <Sun size={16} />
        </span>
        {/* Moon Icon */}
        <span
          className={`absolute transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          } text-primary`}
        >
          <Moon size={16} />
        </span>
      </div>
    </button>
  );
}



export function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grain min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden select-none">
      {/* Header bar */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/5 py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between pointer-events-auto transition-all duration-500">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group z-[110]">
            <img 
              src={logo} 
              alt="Youth on Fire Ministries" 
              className="h-10 w-10 rounded-full object-cover border border-primary/20 opacity-70 group-hover:opacity-100 group-hover:border-primary/60 transition-all duration-[1000ms]" 
              width={40}
              height={40}
            />
            <span className="font-display text-lg tracking-[0.2em] text-foreground/60 group-hover:text-foreground/90 transition-all duration-[1000ms] uppercase hidden sm:block">
              Youth on Fire
            </span>
          </Link>

          {/* Center Floating Navigation Menu */}
          <AnimatedNavFramer />

          {/* Right Floating Controls */}
          <div className="z-[110] flex items-center gap-4">
            <AtmosphericSoundWave />
            <ThemeToggle />
          </div>
        </div>
      </header>



      {/* Main Content Area with Slow Motion Fade & Blur */}
      <main className="flex-1 pt-28 pb-12 z-[10] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Immersive 4-Column Footer */}
      <Footer4Col />

      {/* Local keyframe stylesheet injection */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-36 relative z-10 ${className}`}>
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary/70 mb-6">{eyebrow}</p>
      )}
      {title && (
        <h2 className="font-display text-4xl md:text-6xl text-balance max-w-4xl mb-16 leading-[1.05] tracking-wide text-foreground/90 font-light">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
