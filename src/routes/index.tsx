import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Flame, Play, Calendar } from "lucide-react";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { useAtmosphericAudio } from "@/components/Atmosphere";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth on Fire Ministries — A generation set ablaze" },
      { name: "description", content: "Join a young, Spirit-filled community pursuing Christ together. Sermons, events, devotionals and discipleship resources." },
    ],
  }),
  component: Home,
});

function Home() {
  const { startAudio } = useAtmosphericAudio();
  const [entered, setEntered] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleEnter = () => {
    setUnlocking(true);
    // Start synthesized ambient audio
    startAudio();
    
    // Smooth transition delay matching particle expansion
    setTimeout(() => {
      setEntered(true);
    }, 2200);
  };

  return (
    <>
      {/* 1. IMMERSIVE ENTRY THRESHOLD GATE */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(30px)" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-background flex flex-col items-center justify-center pointer-events-auto select-none"
          >
            <div 
              onClick={handleEnter}
              className="flex flex-col items-center cursor-pointer group px-8 py-12"
            >
              {/* Pulsing Core Spark */}
              <motion.div
                animate={{
                  scale: unlocking ? [1, 20] : [0.9, 1.15, 0.9],
                  boxShadow: unlocking 
                    ? [
                        "0 0 20px rgba(249, 115, 22, 0.4)",
                        "0 0 100px rgba(249, 115, 22, 0.8)",
                        "0 0 300px rgba(249, 115, 22, 0)",
                      ] 
                    : [
                        "0 0 15px rgba(249, 115, 22, 0.4)",
                        "0 0 40px rgba(249, 115, 22, 0.7)",
                        "0 0 15px rgba(249, 115, 22, 0.4)",
                      ],
                }}
                transition={{
                  scale: unlocking 
                    ? { duration: 2.2, ease: [0.16, 1, 0.3, 1] } 
                    : { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  boxShadow: unlocking 
                    ? { duration: 2.2, ease: [0.16, 1, 0.3, 1] } 
                    : { repeat: Infinity, duration: 5, ease: "easeInOut" },
                }}
                className={`w-3 h-3 rounded-full bg-primary mb-12 ${unlocking ? "pointer-events-none" : ""}`}
              />
              
              {/* Invitation Whisper */}
              <motion.p
                animate={{
                  opacity: unlocking ? 0 : [0.3, 0.85, 0.3],
                  letterSpacing: unlocking ? "0.4em" : "0.25em",
                }}
                transition={{
                  opacity: unlocking 
                    ? { duration: 0.6 } 
                    : { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  letterSpacing: { duration: 1.8, ease: "easeOut" },
                }}
                className="font-display text-sm tracking-[0.25em] text-foreground/70 lowercase text-center max-w-xs leading-relaxed"
              >
                {unlocking ? "igniting space..." : "step into the fire..."}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE MAIN ATMOSPHERIC HOME CONTENT */}
      <Layout>
        {/* Hero Section with Slow Zoom & Blur */}
        <section className="relative min-h-[95vh] flex items-end overflow-hidden pb-24 md:pb-36">
          <div className="absolute inset-0 z-0">
            <img 
              src={hero} 
              alt="" 
              className="h-full w-full object-cover opacity-45 scale-105 hover:scale-100 transition-transform duration-[6000ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
              width={1920} 
              height={1080} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
            <div className="absolute inset-0 ember-glow opacity-40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] uppercase tracking-[0.45em] text-primary/80 mb-8 flex items-center gap-3"
            >
              <Flame size={14} className="animate-pulse" /> Youth on Fire Ministries
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-balance max-w-5xl tracking-wide font-light"
            >
              A generation <em className="italic text-primary/80 font-normal">set ablaze</em> by the Spirit.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2.0, delay: 1.3 }}
              className="mt-8 max-w-xl text-sm md:text-base text-foreground/60 leading-relaxed tracking-wide"
            >
              We are a movement of young people pursuing Christ with all we are — together in worship,
              discipleship, prayer and mission.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.7 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-[1200ms] ease-out shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              >
                Join the community
                <ArrowUpRight size={14} className="transition-transform duration-[1200ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/sermons"
                className="group inline-flex items-center gap-2 border border-foreground/15 text-foreground/80 px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:border-primary/50 hover:text-primary transition-all duration-[1200ms] ease-out"
              >
                <Play size={12} className="fill-current" /> Watch latest message
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Event Spotlight */}
        <Section eyebrow="Upcoming Gathering" title="Carriers — Annual Youth Camp.">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden group border border-border/10">
                <img 
                  src={event} 
                  alt="Youth conference" 
                  loading="lazy" 
                  className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[5000ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-70 group-hover:opacity-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-[1500ms]" />
                <div className="absolute bottom-8 left-8 right-8 text-foreground">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-primary/95 mb-2 font-semibold">Mar 14 – 17</p>
                  <p className="font-display text-4xl mt-2 tracking-wide font-light">Three nights. One fire.</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.25}>
              <div className="space-y-8 max-w-lg">
                <p className="text-foreground/70 leading-relaxed text-base tracking-wide font-light">
                  Four days of worship, teaching and encounter. Built for the young — students,
                  young professionals, and everyone discovering what it means to carry the presence of God.
                </p>
                <ul className="space-y-4 text-xs text-foreground/60 border-t border-border/10 pt-8 tracking-wider">
                  {[
                    ["Worship Nights", "Live from the main sanctuary"],
                    ["Discipleship Guilds", "Identity, calling, pure pursuit"],
                    ["City Outreach", "Bring the light out of the room"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4 group cursor-default py-1 border-b border-border/5">
                      <span className="text-foreground/80 group-hover:text-primary transition-colors duration-[1000ms]">{k}</span>
                      <span className="text-foreground/40 group-hover:text-foreground/75 transition-colors duration-[1000ms]">{v}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link
                    to="/events"
                    className="link-quiet inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold"
                  >
                    <Calendar size={12} /> See all upcoming events
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* Scripture / Devotional with Misty Backing */}
        <section className="relative py-44 md:py-64 overflow-hidden z-10 border-t border-b border-border/5">
          <div className="absolute inset-0 opacity-20">
            <img src={word} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.45em] text-primary/70 mb-12">Word for the week</p>
              <blockquote className="font-display italic text-3xl md:text-5xl leading-[1.25] text-balance text-foreground/90 font-light tracking-wide">
                “Is not my word like fire, declares the Lord, and like a hammer that breaks the rock in pieces?”
              </blockquote>
              <p className="mt-10 text-[10px] tracking-[0.35em] text-foreground/50 uppercase">— Jeremiah 23:29</p>
            </FadeIn>
          </div>
        </section>

        {/* Three pillars with slow glass expansion */}
        <Section eyebrow="Core Mission" title="Three flames we keep burning.">
          <div className="grid md:grid-cols-3 gap-6 rounded-lg overflow-hidden">
            {[
              { t: "Worship", d: "Encountering God together — Friday nights, Sunday services, midweek prayer in the secret place." },
              { t: "Discipleship", d: "Small groups, spiritual direction, and resources designed to grow roots that run deep." },
              { t: "Mission", d: "Carrying the fire of the gospel into campuses, communities, families and the digital landscape." },
            ].map((p, i) => (
              <FadeIn key={p.t} delay={i * 0.15}>
                <div className="bg-background/20 backdrop-blur-[3px] border border-border/10 p-10 h-full rounded-lg group hover:bg-card hover:border-primary/20 hover:-translate-y-1 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className="text-[10px] text-primary/60 mb-8 tracking-[0.3em] font-semibold">0{i + 1}</p>
                  <h3 className="font-display text-3xl mb-4 tracking-wide font-light text-foreground/80 group-hover:text-primary transition-colors duration-[1000ms]">{p.t}</h3>
                  <p className="text-foreground/55 leading-relaxed text-xs tracking-wider">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* Latest Sermon (Slow Reveal Card) */}
        <Section eyebrow="Latest Message" title="When the fire fell.">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <FadeIn className="md:col-span-3">
              <div className="aspect-video rounded-lg overflow-hidden bg-card relative group cursor-pointer border border-border/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <img 
                  src={community} 
                  alt="Latest message" 
                  loading="lazy" 
                  className="h-full w-full object-cover opacity-50 scale-100 group-hover:scale-105 group-hover:opacity-85 transition-all duration-[4000ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-[1500ms]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/95 shadow-[0_0_20px_rgba(249,115,22,0.35)] backdrop-blur flex items-center justify-center scale-95 group-hover:scale-105 group-hover:bg-primary transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Play size={20} className="text-primary-foreground translate-x-0.5 fill-current" />
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.25} className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Pastor Daniel · 42 mins</p>
                <h3 className="font-display text-2xl md:text-3xl mt-3 tracking-wide font-light leading-snug">
                  Acts 2 was not the destination — it was the threshold.
                </h3>
                <p className="text-foreground/60 text-xs leading-relaxed tracking-wider">
                  What does it mean to be a Pentecost generation in 2026? A study on what happens
                  when ordinary people surrender space to an extraordinary God.
                </p>
                <div className="pt-4">
                  <Link 
                    to="/sermons" 
                    className="link-quiet inline-flex text-primary text-xs uppercase tracking-widest font-semibold"
                  >
                    Watch all sermons
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* Join CTA */}
        <section className="relative z-10 border-t border-border/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 py-36 md:py-48 text-center">
            <FadeIn>
              <Flame className="mx-auto text-primary/70 mb-10 animate-pulse" size={28} />
              <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-wide font-light max-w-4xl mx-auto text-balance">
                The fire isn't just for the few.
              </h2>
              <p className="mt-8 max-w-lg mx-auto text-foreground/60 text-xs leading-relaxed tracking-wider">
                Whether it's your first time, or you're ready to commit — there's space for you here.
              </p>
              <Link
                to="/contact"
                className="group mt-12 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all duration-[1200ms] ease-out shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              >
                Plan your visit
                <ArrowUpRight size={14} className="transition-transform duration-[1200ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
}
