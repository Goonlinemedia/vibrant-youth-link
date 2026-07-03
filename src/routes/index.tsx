import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  Flame, 
  Play, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Music, 
  Gift, 
  Compass, 
  Heart, 
  ExternalLink,
  Mail
} from "lucide-react";
import { Layout, Section, FadeIn } from "@/components/Layout";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";
import churchCongregation from "@/assets/church_congregation.png";
import churchTeam from "@/assets/church_team.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth on Fire Ministries — Welcome Home" },
      { name: "description", content: "Sunday Worship • 9:00 AM & 11:00 AM. Grow in faith, build relationships, and experience God's love." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Layout>
        {/* 1. HERO SECTION (High Readability Overlay & High Contrast Text) */}
        <section className="relative min-h-[92vh] flex items-center justify-start overflow-hidden pt-24 pb-20 md:py-32">
          {/* Background image & deep overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={hero} 
              alt="Youth worship sanctuary" 
              className="h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-[8000ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
              width={1920} 
              height={1080} 
            />
            {/* 40-50% Dark Overlay for supreme text contrast */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/40 z-10" />
            <div className="absolute inset-0 ember-glow opacity-30 z-20" />
          </div>

          <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-10 w-full text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-6"
            >
              <Flame size={12} className="text-primary animate-pulse fill-current" /> 
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Youth on Fire Ministries</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.5 }}
              className="font-extrabold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.0] text-balance max-w-4xl [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
            >
              Welcome Home
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.9 }}
              className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]"
            >
              A place to grow in faith, build meaningful relationships, and experience God's love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.2 }}
              className="mt-8 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs bg-black/40 px-4 py-2 rounded-lg border border-primary/20 backdrop-blur-sm"
            >
              <Clock size={12} /> Sunday Worship • 9:00 AM & 11:00 AM
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all duration-[800ms] shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                Plan Your Visit
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/sermons"
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-[800ms] backdrop-blur-sm cursor-pointer"
              >
                <Play size={12} className="fill-current" /> Watch Online
              </Link>
            </motion.div>
          </div>
        </section>


        {/* 2. WELCOME & SERVICE TIMES (Practical & Instant Details) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Our Invitation</p>
                <h2 className="font-display text-4xl sm:text-5xl font-light tracking-wide text-foreground">
                  We're Glad You're Here
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base max-w-xl">
                  Walking into a new church can feel intimidating, but we believe you belong here. Whether you are seeking community, questioning faith, or looking for a home, you are welcomed with open arms.
                </p>
              </div>
            </div>

            {/* Glowing service detail cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <div className="bg-card border border-border/10 rounded-xl p-8 shadow-sm space-y-4 hover:border-primary/20 hover:shadow-md transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-light">Sunday Worship</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Join us in the main sanctuary for vibrant worship, community connection, and solid biblical teaching.
                  </p>
                  <p className="font-semibold text-sm text-foreground">9:00 AM & 11:00 AM</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-card border border-border/10 rounded-xl p-8 shadow-sm space-y-4 hover:border-primary/20 hover:shadow-md transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Flame size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-light">Midweek Fellowship</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A midweek recharge for prayers, youth gatherings, cell groups, and direct interactive discipleship study.
                  </p>
                  <p className="font-semibold text-sm text-foreground">Wednesday at 6:30 PM</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-card border border-border/10 rounded-xl p-8 shadow-sm space-y-4 hover:border-primary/20 hover:shadow-md transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-light">Our Address</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    12 Revival Avenue, City Center.<br />
                    Directions, transit info, and parking details are available.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                  >
                    Get Directions <ArrowUpRight size={12} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* 3. ABOUT THE CHURCH (Warm Congregation Photo & Expectation Block) - BG: Soft Cream */}
        <section className="py-24 bg-[#fdfaf4] dark:bg-[#12100d] border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6">
                <FadeIn>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/10 group">
                    <img 
                      src={churchCongregation} 
                      alt="Worship congregation" 
                      loading="lazy"
                      className="w-full object-cover scale-100 group-hover:scale-102 transition-transform duration-[4000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </FadeIn>
              </div>

              <div className="md:col-span-6 space-y-6">
                <FadeIn delay={0.2}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Who We Are</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                    A Spirit-Filled Community Pursuing Christ
                  </h2>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base max-w-lg">
                    We are a modern, bible-believing community focused on helping the next generation find their identity, purpose, and calling in God. From active small groups to massive youth conferences, we create environments that foster real discipleship and true encounters with God's Spirit.
                  </p>
                  <div className="pt-4 space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xs font-bold">✓</span>
                      <p className="text-xs text-foreground/80"><strong className="text-foreground">What to Expect:</strong> Casual dress, welcoming faces, authentic modern worship, and practical teachings.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xs font-bold">✓</span>
                      <p className="text-xs text-foreground/80"><strong className="text-foreground">Our Values:</strong> Word-centered, spirit-led, relationship-driven, and active in city outreach.</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
                    >
                      Read Our Story
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>


        {/* 4. OUR MINISTRIES (Grid of Beautiful Icons & Cards) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Ministries</p>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                Finding Your Space to Connect
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                No matter your age or phase of life, there is a specialized ministry crafted to support and build you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Youth Ministry", 
                  desc: "Built for high schoolers and university students seeking authentic fire, regular cell groups, and fellowship.", 
                  icon: <Flame size={20} /> 
                },
                { 
                  title: "Children's Church", 
                  desc: "A fun, secure, and faith-filled environment helping kids discover scripture stories and God's love early.", 
                  icon: <Compass size={20} /> 
                },
                { 
                  title: "Music Ministry", 
                  desc: "Leading our congregation in deep worship and setting atmospheric sounds of praise every gathering.", 
                  icon: <Music size={20} /> 
                },
                { 
                  title: "Men's Fellowship", 
                  desc: "Iron sharpening iron. Bible studies and practical discussions centered on modern Christian leadership.", 
                  icon: <Users size={20} /> 
                },
                { 
                  title: "Women's Ministry", 
                  desc: "A sisterhood focusing on growth, vulnerability, and mutual encouragement through all stages of life.", 
                  icon: <Heart size={20} /> 
                },
                { 
                  title: "Outreach & Mission", 
                  desc: "Taking light out of the auditorium. Monthly community aids, hospital visits, and student supports.", 
                  icon: <Gift size={20} /> 
                },
              ].map((m, idx) => (
                <FadeIn key={m.title} delay={idx * 0.1}>
                  <div className="bg-card border border-border/10 rounded-xl p-8 h-full space-y-4 flex flex-col justify-between hover:border-primary/20 hover:shadow-md transition-all duration-700">
                    <div className="space-y-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {m.icon}
                      </div>
                      <h3 className="font-display text-xl font-light">{m.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-border/5">
                      <Link 
                        to="/about" 
                        className="inline-flex items-center gap-1 text-[11px] text-primary font-bold uppercase tracking-wider hover:underline"
                      >
                        Learn More <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>


        {/* 5. UPCOMING EVENTS (Spotted Feature Camp details) - BG: Soft Slate Gray */}
        <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/20 border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group border border-border/10 shadow-md">
                  <img 
                    src={event} 
                    alt="Youth conference spotlight" 
                    loading="lazy" 
                    className="h-full w-full object-cover scale-100 group-hover:scale-103 transition-transform duration-[5000ms] opacity-90 dark:opacity-75" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary mb-2 font-bold">Mar 14 – 17</p>
                    <h3 className="font-display text-3xl font-light tracking-wide">Carriers — Annual Youth Camp</h3>
                    <p className="text-xs text-white/80 mt-2 font-light">Three nights. One fire. Built for students & young adults.</p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.25}>
                <div className="space-y-8 max-w-lg">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Gathering Spotlight</p>
                  <h2 className="font-display text-4xl font-light tracking-wide text-foreground">
                    Carriers Camp
                  </h2>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base font-light">
                    Four days of worship, practical workshops, and direct encounter. Built for everyone discovering what it means to carry the presence and fire of God in school, home, and workspace.
                  </p>
                  <ul className="space-y-4 text-xs text-foreground/60 border-t border-border/10 pt-8 tracking-wider">
                    {[
                      ["Worship Nights", "Live from the main sanctuary"],
                      ["Discipleship Guilds", "Identity, calling, pure pursuit"],
                      ["City Outreach", "Bring the light out of the room"],
                    ].map(([k, v]) => (
                      <li key={k} className="flex justify-between gap-4 py-1 border-b border-border/5">
                        <span className="text-foreground/80 font-semibold">{k}</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex items-center gap-6">
                    <Link
                      to="/contact"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-500 shadow-md cursor-pointer"
                    >
                      Register Now
                    </Link>
                    <Link
                      to="/events"
                      className="link-quiet inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-semibold"
                    >
                      See All Events <Calendar size={12} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* 6. LATEST SERMONS (Clean message plays) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <FadeIn className="md:col-span-7">
                <div className="aspect-video rounded-2xl overflow-hidden bg-card relative group cursor-pointer border border-border/10 shadow-lg">
                  <img 
                    src={community} 
                    alt="Latest message" 
                    loading="lazy" 
                    className="h-full w-full object-cover opacity-85 dark:opacity-60 scale-100 group-hover:scale-102 transition-all duration-[4000ms]" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center scale-95 group-hover:scale-105 transition-all duration-700 shadow-lg">
                      <Play size={20} className="text-white translate-x-0.5 fill-current" />
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.25} className="md:col-span-5 space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Latest Sermon</p>
                <h3 className="font-display text-2xl md:text-3xl font-light tracking-wide leading-snug">
                  Acts 2 was not the destination — it was the threshold.
                </h3>
                <p className="text-foreground/70 text-xs leading-relaxed tracking-wider">
                  What does it mean to be a Pentecost generation today? A study on what happens when ordinary people surrender space to an extraordinary God.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>Pastor Daniel</span>
                  <span>•</span>
                  <span>42 mins watch</span>
                </div>
                <div className="pt-4 flex gap-4">
                  <Link 
                    to="/sermons" 
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
                  >
                    Watch Series
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* 7. TESTIMONIALS (Authentic Stories with Images) - BG: Soft Cream */}
        <section className="py-24 bg-[#fdfaf4] dark:bg-[#12100d] border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Testimonials</p>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                Stories from Our Family
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FadeIn delay={0.1}>
                <div className="bg-card border border-border/10 rounded-2xl p-8 shadow-sm space-y-6 flex flex-col justify-between h-full">
                  <p className="font-display italic text-lg leading-relaxed text-foreground/80">
                    "From the first Sunday I attended, everyone made me feel like family. I wasn't just another seat filler; the leadership genuinely cared about my walk and faith questions."
                  </p>
                  <div className="flex items-center gap-4 border-t border-border/5 pt-4">
                    <div className="size-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                      SK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Sarah K.</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Member since 2024</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-card border border-border/10 rounded-2xl p-8 shadow-sm space-y-6 flex flex-col justify-between h-full">
                  <p className="font-display italic text-lg leading-relaxed text-foreground/80">
                    "Finding a young community that is unapologetically Bible-centered and Spirit-filled changed everything for me. The Friday worship nights are pure encounter."
                  </p>
                  <div className="flex items-center gap-4 border-t border-border/5 pt-4">
                    <div className="size-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                      DO
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">David O.</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Youth Group Leader</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* 8. GIVE / SMALL GROUPS (Engaging Engagement Calls) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <FadeIn delay={0.1}>
                <div className="bg-card border border-border/10 rounded-2xl p-8 md:p-10 shadow-sm space-y-6 flex flex-col justify-between h-full hover:border-primary/20 hover:shadow-md transition-all duration-700">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-light">Join a Small Group</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We believe life change happens in circles, not just rows. Connect in weekly cell groups across the city for Bible study, prayers, and real friendships.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-500 cursor-pointer"
                    >
                      Find a Group <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-card border border-border/10 rounded-2xl p-8 md:p-10 shadow-sm space-y-6 flex flex-col justify-between h-full hover:border-primary/20 hover:shadow-md transition-all duration-700">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-light">Support the Ministry</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your generosity enables us to build student facilities, host free youth outreach camps, and spread the gospel throughout campuses and local communities.
                    </p>
                  </div>
                  <div className="pt-6">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
                    >
                      Give Online <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* 9. CONTACT & MAP (Compact Location & Help Spotlight) - BG: Soft Slate Gray */}
        <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/20 border-t border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 space-y-6">
                <FadeIn>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Need Help?</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                    Get in Touch with Us
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                    Have questions about gatherings, prayer requests, or transportation? Let us help you plan your visit.
                  </p>
                  <div className="space-y-4 pt-4 text-xs text-foreground/80">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" /> 12 Revival Avenue, City Center
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-primary" /> hello@youthonfire.org
                    </p>
                  </div>
                  <div className="pt-6 flex gap-4">
                    <Link
                      to="/contact"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-500 shadow-md cursor-pointer"
                    >
                      Contact & Register
                    </Link>
                  </div>
                </FadeIn>
              </div>

              <div className="md:col-span-7">
                <FadeIn delay={0.2}>
                  {/* Clean Stylized responsive Map Frame */}
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/10 shadow-sm relative group">
                    <iframe 
                      title="Church map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.492576974127!2d3.359288214770289!3d6.459039395327299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b17b6ad7f27%3A0xc3c94537af35d8e7!2sYaba%2C%20Lagos!5e0!3m2!1sen!2sng!4v1677321528643!5m2!1sen!2sng"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: "contrast(1.1) opacity(0.85) grayscale(0.2)" }} 
                      allowFullScreen 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>


        {/* 10. WORD / DEVO CARD - BG: Misty Image */}
        <section className="relative py-40 overflow-hidden border-t border-border/5">
          <div className="absolute inset-0 opacity-25 dark:opacity-15">
            <img src={word} alt="Bible study" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-md" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <blockquote className="font-display italic text-2xl md:text-4xl leading-[1.3] text-balance text-foreground/80 font-light tracking-wide max-w-3xl mx-auto">
                “Is not my word like fire, declares the Lord, and like a hammer that breaks the rock in pieces?”
              </blockquote>
              <p className="mt-8 text-[10px] tracking-[0.35em] text-foreground/50 uppercase">— Jeremiah 23:29</p>
            </FadeIn>
          </div>
        </section>

      </Layout>
    </>
  );
}
