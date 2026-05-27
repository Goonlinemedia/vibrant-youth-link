import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Flame, Play, Calendar } from "lucide-react";
import { Layout, Section, FadeIn } from "@/components/Layout";
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
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-70" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 ember-glow opacity-60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.4em] text-primary/90 mb-8 flex items-center gap-3"
          >
            <Flame size={14} /> Youth on Fire Ministries
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-balance max-w-4xl"
          >
            A generation <em className="italic text-primary/90">set ablaze</em> by the Spirit.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1 }}
            className="mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed"
          >
            We are a movement of young people pursuing Christ with all we are — together in worship,
            discipleship, prayer and mission.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-500"
            >
              Join the community
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/sermons"
              className="group inline-flex items-center gap-2 border border-foreground/20 text-foreground/90 px-6 py-3.5 rounded-full text-sm font-medium hover:border-primary/60 hover:text-primary transition-all duration-500"
            >
              <Play size={14} /> Watch latest message
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Event Spotlight */}
      <Section eyebrow="Upcoming" title="Carriers — Annual Youth Camp.">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] md:aspect-[4/5] rounded-md overflow-hidden">
              <img src={event} alt="Youth conference" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-foreground">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/90">Mar 14 – 17</p>
                <p className="font-display text-3xl mt-2">Three nights. One fire.</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-foreground/75 leading-relaxed text-lg">
                Four days of worship, teaching and encounter. Built for the young — students,
                young professionals, and everyone discovering what it means to carry the presence of God.
              </p>
              <ul className="space-y-3 text-sm text-foreground/70 border-t border-border/40 pt-6">
                {[
                  ["Worship Nights", "Live from the main hall"],
                  ["Workshops", "Identity, leadership, purity, calling"],
                  ["Outreach", "Bring the city into the room"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4 group cursor-default">
                    <span className="text-foreground/90">{k}</span>
                    <span className="text-foreground/50 group-hover:text-foreground/80 transition-colors duration-500">{v}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/events"
                className="link-quiet inline-flex items-center gap-2 text-primary text-sm"
              >
                <Calendar size={14} /> See all upcoming events
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Scripture / Devotional */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={word} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-8">Word for the week</p>
            <blockquote className="font-display italic text-3xl md:text-5xl leading-[1.15] text-balance text-foreground/95">
              “Is not my word like fire, declares the Lord, and like a hammer that breaks the rock in pieces?”
            </blockquote>
            <p className="mt-8 text-sm tracking-wider text-foreground/60">— Jeremiah 23:29</p>
          </FadeIn>
        </div>
      </section>

      {/* Three pillars */}
      <Section eyebrow="What we do" title="Three flames we keep burning.">
        <div className="grid md:grid-cols-3 gap-px bg-border/40 rounded-md overflow-hidden">
          {[
            { t: "Worship", d: "Encountering God together — Friday nights, Sunday services, midweek prayer." },
            { t: "Discipleship", d: "Small groups, mentorship and resources to grow rooted and unshakeable." },
            { t: "Mission", d: "Carrying the gospel into campuses, streets, families and the digital world." },
          ].map((p, i) => (
            <FadeIn key={p.t} delay={i * 0.1}>
              <div className="bg-background p-10 h-full group hover:bg-card transition-colors duration-700">
                <p className="text-xs text-primary/70 mb-6">0{i + 1}</p>
                <h3 className="font-display text-3xl mb-4">{p.t}</h3>
                <p className="text-foreground/65 leading-relaxed text-sm">{p.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Latest Sermon */}
      <Section eyebrow="Latest message" title="When the fire fell.">
        <div className="grid md:grid-cols-5 gap-10 items-end">
          <FadeIn>
            <div className="md:col-span-3 aspect-video rounded-md overflow-hidden bg-card relative group cursor-pointer">
              <img src={community} alt="Latest sermon" loading="lazy" className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  <Play size={22} className="text-primary-foreground translate-x-0.5" />
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Pastor Daniel · 42 min</p>
              <h3 className="font-display text-2xl md:text-3xl mt-3 mb-4">
                Acts 2 was not the end — it was the invitation.
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                What does it mean to be a Pentecost generation in 2026? A study on what happens
                when ordinary people make room for an extraordinary God.
              </p>
              <Link to="/sermons" className="link-quiet mt-6 inline-flex text-primary text-sm">Watch all sermons</Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Join CTA */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-32 md:py-44 text-center">
          <FadeIn>
            <Flame className="mx-auto text-primary mb-8" size={28} />
            <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
              The fire isn't just for the few.
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-foreground/70 leading-relaxed">
              Whether it's your first time, or you're ready to commit — there's space for you here.
            </p>
            <Link
              to="/contact"
              className="group mt-12 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-500"
            >
              Plan your visit
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
