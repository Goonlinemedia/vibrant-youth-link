import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpeg";

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
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="grain min-h-screen flex flex-col bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Youth on Fire Ministries" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-lg tracking-wide text-foreground/90 hidden sm:block">
              Youth on Fire
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`link-quiet text-foreground/70 hover:text-foreground ${
                  pathname === item.to ? "text-foreground" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-foreground/80 hover:text-foreground transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl text-foreground/80 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-border/40 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="" className="h-10 w-10 rounded-full" />
              <span className="font-display text-xl">Youth on Fire</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A generation set ablaze by the Spirit — pursuing Christ, building community, carrying the flame.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {nav.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-quiet text-foreground/70 hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Follow the flame</h4>
            <div className="flex gap-4 text-foreground/70">
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors duration-500"><Instagram size={20} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors duration-500"><Youtube size={20} /></a>
              <a href="#" aria-label="WhatsApp" className="hover:text-primary transition-colors duration-500"><MessageCircle size={20} /></a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Youth on Fire Ministries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
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
    <section className={`max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 ${className}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-6">{eyebrow}</p>
      )}
      {title && (
        <h2 className="font-display text-4xl md:text-6xl text-balance max-w-3xl mb-12 leading-[1.05]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
