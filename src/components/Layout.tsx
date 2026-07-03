import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Youtube, MessageCircle, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { AtmosphericSoundWave } from "@/components/Atmosphere";
import { useTheme } from "@/components/ThemeProvider";
import Footer4Col from "@/components/ui/footer-column";

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

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/sermons", label: "Sermons" },
  { to: "/resources", label: "Resources" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="grain min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden select-none">
      {/* Header bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between pointer-events-auto">
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

          {/* Center Soundscape Wave Control & Theme Toggle */}
          <div className="z-[110] flex items-center gap-3">
            <AtmosphericSoundWave />
            <ThemeToggle />
          </div>

          {/* Right Floating Cryptic Ember Key */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[110] flex items-center gap-3 cursor-pointer group focus:outline-none"
            aria-label="Toggle Portal"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors duration-[1000ms]">
              {menuOpen ? "dissolve" : "portal"}
            </span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Spinning Outer Orbit Ring */}
              <span
                className={`absolute inset-0 rounded-full border border-primary/20 transition-all duration-[1500ms] group-hover:border-primary/50 ${
                  menuOpen ? "rotate-180 border-accent/40 scale-110" : ""
                }`}
                style={{
                  animation: "spinSlow 12s linear infinite",
                }}
              />
              {/* Core glowing ember */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-[1200ms] ease-in-out ${
                  menuOpen ? "bg-accent scale-125" : "bg-primary"
                }`}
                style={{
                  boxShadow: menuOpen 
                    ? "0 0 12px rgba(239, 68, 68, 0.8)" 
                    : "0 0 8px rgba(249, 115, 22, 0.8)",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Cryptic Portal Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 flex flex-col justify-between p-10 md:p-16 select-none pointer-events-auto"
          >
            {/* Top Empty Space just to buffer layout */}
            <div className="h-16" />

            {/* Main Mystical Links */}
            <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center flex-1">
              <nav className="flex flex-col gap-6 md:gap-8">
                {nav.map((item, i) => {
                  const isActive = pathname === item.to;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)", letterSpacing: "-0.05em" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.15em" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(6px)", letterSpacing: "-0.05em" }}
                      transition={{ 
                        duration: 1.8, 
                        delay: i * 0.08, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={`font-display text-4xl sm:text-5xl md:text-6xl uppercase font-light transition-all duration-[1200ms] ease-out hover:text-primary ${
                          isActive 
                            ? "text-primary tracking-[0.2em] font-normal" 
                            : "text-foreground/40 hover:tracking-[0.22em]"
                        }`}
                        style={{
                          textShadow: isActive ? "0 0 20px rgba(249, 115, 22, 0.25)" : "none"
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Mystical Details */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between border-t border-border/10 pt-8 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 gap-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 2 }}
              >
                A generation set ablaze.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 2 }}
                className="hidden md:inline"
              >
                Let there be light
              </motion.span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors duration-[1000ms]"><Instagram size={14} /></a>
                <a href="#" className="hover:text-primary transition-colors duration-[1000ms]"><Youtube size={14} /></a>
                <a href="#" className="hover:text-primary transition-colors duration-[1000ms]"><MessageCircle size={14} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
