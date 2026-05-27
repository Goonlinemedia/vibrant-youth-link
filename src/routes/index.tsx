import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Shell, Slow, Reveal } from "@/components/Layout";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth on Fire — Threshold" },
      { name: "description", content: "Step quietly. Something is burning." },
    ],
  }),
  component: Threshold,
});

function Threshold() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <Shell>
      {/* Threshold — first breath */}
      <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
          <div className="absolute inset-0 ember-glow opacity-40" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.6 }}
            className="text-[10px] tracking-[0.6em] uppercase text-foreground/40 mb-12"
          >
            — you have arrived —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, delay: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display italic text-5xl sm:text-7xl md:text-[7rem] leading-[1] text-foreground/90"
          >
            something<br />is burning.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.4 }}
            className="mt-16 text-[10px] tracking-[0.4em] uppercase text-foreground/30"
          >
            scroll, gently
          </motion.p>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 60 }}
            transition={{ duration: 2, delay: 2.8 }}
            className="mx-auto mt-6 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </div>
      </section>

      {/* Whisper one */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <Slow>
          <p className="font-display italic text-2xl md:text-4xl leading-relaxed max-w-2xl text-center text-foreground/70 text-balance">
            We do not perform.
            <br />
            <span className="text-foreground/50">We gather, in the dark, around a fire that does not go out.</span>
          </p>
        </Slow>
      </section>

      {/* Atmospheric image — far edge */}
      <section className="relative min-h-[100vh] flex items-end">
        <div className="absolute inset-0">
          <img src={community} alt="" loading="lazy" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pb-32 w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-8">— a fragment —</p>
            <blockquote className="font-display italic text-3xl md:text-5xl leading-[1.2] max-w-3xl text-foreground/85 text-balance">
              "Is not my word like fire, declares the Lord, and like a hammer that breaks the rock in pieces?"
            </blockquote>
            <p className="mt-8 text-[10px] tracking-[0.4em] uppercase text-foreground/40">Jeremiah · 23 · 29</p>
          </Slow>
        </div>
      </section>

      {/* Hidden hovers — reveal on touch */}
      <section className="min-h-[100vh] flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full space-y-16">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/30">
              — hover, to listen —
            </p>
          </Slow>
          {[
            { label: "what we are", body: "A small fire kept by many hands. A people who refuse to grow cold." },
            { label: "when we meet", body: "Friday nights, after the sun. Wherever two or three remember." },
            { label: "what to bring", body: "Yourself. Nothing else. Doubt, hunger, questions — all welcome." },
          ].map((r, i) => (
            <Slow key={r.label} delay={i * 0.2}>
              <Reveal label={r.label}>{r.body}</Reveal>
            </Slow>
          ))}
        </div>
      </section>

      {/* Distant doorway */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={word} alt="" loading="lazy" className="h-full w-full object-cover opacity-25 blur-sm" />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <Slow>
          <div className="relative text-center px-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-10">
              — if you are still here —
            </p>
            <Link
              to="/contact"
              className="group inline-block"
            >
              <span className="font-display italic text-4xl md:text-6xl text-foreground/80 group-hover:text-primary transition-colors duration-[1500ms]">
                step closer
              </span>
              <span className="block h-px bg-foreground/20 group-hover:bg-primary mt-4 mx-auto w-24 group-hover:w-48 transition-all duration-[1500ms]" />
            </Link>
          </div>
        </Slow>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
