import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
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
  Mail,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Layout, Section, FadeIn } from "@/components/Layout";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";
import churchCongregation from "@/assets/church_congregation.png";
import churchTeam from "@/assets/church_team.png";
import pastorDanielImg from "@/assets/pastor_daniel.png";
import sarahMImg from "@/assets/sarah_m.png";
import josephKImg from "@/assets/joseph_k.png";
import tile1 from "@/assets/tile1.jpg";
import tile2 from "@/assets/tile2.jpg";
import tile3 from "@/assets/tile3.jpg";
import tile4 from "@/assets/tile4.jpg";
import tile5 from "@/assets/tile5.jpg";
import tile6 from "@/assets/tile6.jpg";
import tile7 from "@/assets/tile7.jpg";
import tile8 from "@/assets/tile8.jpg";
import tile9 from "@/assets/tile9.jpg";
import tile10 from "@/assets/tile10.jpg";
import tile11 from "@/assets/tile11.jpg";
import tile12 from "@/assets/tile12.jpg";
import tile13 from "@/assets/tile13.jpg";
import tile14 from "@/assets/tile14.jpg";
import tile15 from "@/assets/tile15.jpg";
import tile16 from "@/assets/tile16.jpg";
import tile17 from "@/assets/tile17.jpg";
import tile18 from "@/assets/tile18.jpg";

import tile1Full from "@/assets/tile1_full.jpg";
import tile2Full from "@/assets/tile2_full.jpg";
import tile3Full from "@/assets/tile3_full.jpg";
import tile4Full from "@/assets/tile4_full.jpg";
import tile5Full from "@/assets/tile5_full.jpg";
import tile6Full from "@/assets/tile6_full.jpg";
import tile7Full from "@/assets/tile7_full.jpg";
import tile8Full from "@/assets/tile8_full.jpg";
import tile9Full from "@/assets/tile9_full.jpg";
import tile10Full from "@/assets/tile10_full.jpg";
import tile11Full from "@/assets/tile11_full.jpg";
import tile12Full from "@/assets/tile12_full.jpg";
import tile13Full from "@/assets/tile13_full.jpg";
import tile14Full from "@/assets/tile14_full.jpg";
import tile15Full from "@/assets/tile15_full.jpg";
import tile16Full from "@/assets/tile16_full.jpg";
import tile17Full from "@/assets/tile17_full.jpg";
import tile18Full from "@/assets/tile18_full.jpg";

import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultGallery, defaultHomepageConfig, defaultSermons, resolveImage } from "@/lib/firebase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth on Fire Ministries — Welcome Home" },
      { name: "description", content: "Sunday Worship • 8:00 AM. Grow in faith, build relationships, and experience God's love." },
    ],
  }),
  component: Home,
});

const defaultHomepageConfigsArray = [defaultHomepageConfig];

function Home() {
  const gallery = useFirestoreCollection("gallery", defaultGallery);
  const tiles = gallery.slice(0, 18);
  const configs = useFirestoreCollection("homepage_config", defaultHomepageConfigsArray);
  const config = configs[0] || defaultHomepageConfig;
  const sermons = useFirestoreCollection("sermons", defaultSermons);
  
  // Sort sermons chronologically (newest first)
  const sortedSermons = [...sermons].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const latestSermon = sortedSermons[0] || defaultSermons[0];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getSermonImage = (sermon: any) => {
    if (sermon && sermon.videoUrl) {
      const ytId = getYouTubeId(sermon.videoUrl);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
    }
    return resolveImage(sermon?.img || "community");
  };

  return (
    <>
      <Layout>
        {/* 1. HERO SECTION (High Readability Overlay & High Contrast Text) */}
        <section className="relative min-h-[92vh] flex items-center justify-start overflow-hidden pt-24 pb-20 md:py-32">
          {/* Background image & deep overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={resolveImage(config.hero_image || "hero")} 
              alt="Youth worship sanctuary" 
              className="h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-[8000ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
              width={1920} 
              height={1080} 
            />
            {/* 40-50% Dark Overlay for supreme text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 z-10" />
            <div className="absolute inset-0 ember-glow opacity-35 z-20" />
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
              className="font-display font-medium text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.0] text-balance max-w-4xl [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
            >
              {config.hero_title || "Welcome Home"}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.9 }}
              className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]"
            >
              {config.hero_description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.2 }}
              className="mt-8 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs bg-black/40 px-4 py-2 rounded-lg border border-primary/20 backdrop-blur-sm"
            >
              <Clock size={12} /> {config.hero_time || "Sunday Worship • 8:00 AM"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-[800ms] shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                Plan Your Visit
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/sermons"
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-[800ms] backdrop-blur-sm cursor-pointer"
              >
                <Play size={12} className="fill-current" /> Watch Online
              </Link>
            </motion.div>
          </div>
        </section>


        {/* Horizontal Tiles Grid (Directly after Hero) */}
        <section className="bg-background overflow-hidden border-b border-border/10">
          <div className="tiles-grid gap-0">
            {tiles.map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.03 }}
                className={`relative aspect-square overflow-hidden group cursor-pointer ${i >= 8 ? 'hidden sm:block' : ''}`}
                onClick={() => setActiveImageIndex(i)}
              >
                <img
                  src={tile.thumb}
                  alt={`Youth gathering gallery tile ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}

            {/* Custom "See More" tile for mobile view only */}
            <Link
              to="/gallery"
              className="relative aspect-square bg-[#0c0a09] border-t border-r border-border/10 flex flex-col items-center justify-center p-4 text-center group cursor-pointer sm:hidden hover:bg-[#14110f] transition-colors duration-500"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1 font-bold animate-pulse">See More</p>
              <p className="text-[9px] text-white/70 leading-relaxed max-w-[100px] font-medium group-hover:text-white transition-colors duration-500">
                Click to see more pictures of amazing people
              </p>
            </Link>
          </div>
        </section>


        {/* 2. WELCOME & SERVICE TIMES (Practical & Instant Details) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{config.welcome_eyebrow || "Our Invitation"}</p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide text-foreground">
                  {config.welcome_title || "We're Glad You're Here"}
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-foreground/75 leading-relaxed text-sm md:text-base max-w-xl">
                  {config.welcome_description}
                </p>
              </div>
            </div>

            {/* Flat service detail cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <div className="bg-secondary/40 rounded-xl p-8 space-y-4 hover:bg-secondary/60 transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-medium">Sunday Worship</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Join us in the main sanctuary for vibrant worship, community connection, and solid biblical teaching.
                  </p>
                  <p className="font-semibold text-sm text-foreground">{config.welcome_service1_time || "8:00 AM"}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-secondary/40 rounded-xl p-8 space-y-4 hover:bg-secondary/60 transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Flame size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-medium">Midweek Fellowship</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A midweek recharge for prayers, youth gatherings, cell groups, and direct interactive discipleship study.
                  </p>
                  <p className="font-semibold text-sm text-foreground">{config.welcome_service2_time || "Wednesday at 6:00 PM"}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-secondary/40 rounded-xl p-8 space-y-4 hover:bg-secondary/60 transition-all duration-700">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-medium">Our Address</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {config.welcome_service3_address}<br />
                    Directions, transit info, and parking details are available.
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Overcomers+Church+World+Outreach/@6.5000246,3.2999304,19.79z/data=!4m6!3m5!1s0x103b8edf1cf04881:0x3b67b878320ebe54!8m2!3d6.5003656!4d3.299835!16s%2Fg%2F11b6j5c442?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                  >
                    Get Directions <ArrowUpRight size={12} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <Section eyebrow="What to Expect" title="First Time? Here is what to expect this Sunday.">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Arrival & Service Length",
                desc: "Services begin promptly at 8:00 AM and run for about 90 minutes. Plan to arrive 10-15 minutes early to connect and find a comfortable seat."
              },
              {
                title: "Dress Code",
                desc: "Come as you are! We are a community of all ages and styles. You'll see everything from casual jeans and t-shirts to traditional attire."
              },
              {
                title: "Safe & Guided Parking",
                desc: "Secure parking is available inside and directly outside the sanctuary premises, with helpful traffic team members to guide you in."
              },
              {
                title: "Kids & Teens Programs",
                desc: "Our children's church and teen groups meet in safe, dedicated spaces with age-appropriate worship, bible lessons, and fun activities."
              },
              {
                title: "Friendly Welcome",
                desc: "From the moment you walk in, our welcome team is ready to guide you. If you're new, stop by the welcome hub for a special gift!"
              },
              {
                title: "Worship & Word",
                desc: "Expect passionate, contemporary praise and worship, followed by a relevant, Scripture-grounded sermon designed to challenge and inspire."
              }
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.05}>
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-medium text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>



        {/* 5. UPCOMING EVENTS (Spotted Feature Camp details) - BG: Soft Slate Gray */}
        <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/20 border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group border border-border/10 shadow-md">
                  <img 
                    src={resolveImage(config.featured_event_image || "event")} 
                    alt="Youth conference spotlight" 
                    loading="lazy" 
                    className="h-full w-full object-cover scale-100 group-hover:scale-103 transition-transform duration-[5000ms] opacity-90 dark:opacity-75" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary mb-2 font-bold">{config.featured_event_tag || "Mar 14 – 17"}</p>
                    <h3 className="font-display text-3xl font-light tracking-wide">{config.featured_event_title}</h3>
                    <p className="text-xs text-white/80 mt-2 font-light">{config.featured_event_place}</p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.25}>
                <div className="space-y-8 max-w-lg">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Gathering Spotlight</p>
                  <h2 className="font-display text-4xl font-medium tracking-wide text-foreground">
                    {config.featured_event_title ? config.featured_event_title.split(" — ")[0] : "Carriers Camp"}
                  </h2>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base font-light">
                    {config.featured_event_place}
                  </p>
                  <ul className="space-y-4 text-xs text-foreground/60 border-t border-border/10 pt-8 tracking-wider">
                    {[
                      [config.featured_event_bullet1_title || "Worship Nights", config.featured_event_bullet1_desc || "Live from the main sanctuary"],
                      [config.featured_event_bullet2_title || "Discipleship Guilds", config.featured_event_bullet2_desc || "Identity, calling, pure pursuit"],
                      [config.featured_event_bullet3_title || "City Outreach", config.featured_event_bullet3_desc || "Bring the light out of the room"],
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
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-500 shadow-md cursor-pointer"
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

        {/* 3. ABOUT THE CHURCH (Warm Congregation Photo & Expectation Block) - BG: Soft Cream */}
        <section className="py-24 bg-[#fdfaf4] dark:bg-[#12100d] border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6">
                <FadeIn>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/10 group">
                    <img 
                      src={resolveImage(config.about_image || "churchCongregation")} 
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{config.about_eyebrow || "Who We Are"}</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-wide text-foreground">
                    {config.about_title || "A Spirit-Filled Community Pursuing Christ"}
                  </h2>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base max-w-lg">
                    {config.about_description}
                  </p>
                  <div className="pt-4 space-y-3">
                    {config.about_expectation1 && (
                      <div className="flex gap-3 items-start">
                        <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xs font-bold">✓</span>
                        <p className="text-xs text-foreground/80"><strong className="text-foreground">What to Expect:</strong> {config.about_expectation1.replace("What to Expect: ", "").replace("What to Expect:", "")}</p>
                      </div>
                    )}
                    {config.about_expectation2 && (
                      <div className="flex gap-3 items-start">
                        <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xs font-bold">✓</span>
                        <p className="text-xs text-foreground/80"><strong className="text-foreground">Our Values:</strong> {config.about_expectation2.replace("Our Values: ", "").replace("Our Values:", "")}</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-6">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
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
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{config.ministries_eyebrow || "Ministries"}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-wide text-foreground">
                {config.ministries_title || "Finding Your Space to Connect"}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                {config.ministries_description}
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
                  <div className="bg-secondary/40 rounded-xl p-8 h-full space-y-4 flex flex-col justify-between hover:bg-secondary/60 transition-all duration-700">
                    <div className="space-y-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {m.icon}
                      </div>
                      <h3 className="font-display text-xl font-medium">{m.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-border/5">
                      <Link 
                        to="/about" 
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold tracking-wide hover:underline"
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

        {/* 6. LATEST SERMONS (Clean message plays) - BG: White */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <FadeIn className="md:col-span-7">
                <Link 
                  to="/sermons"
                  className="block aspect-video rounded-2xl overflow-hidden bg-card relative group cursor-pointer border border-border/10 shadow-lg"
                >
                  <img 
                    src={getSermonImage(latestSermon)} 
                    alt="Latest message" 
                    loading="lazy" 
                    className="h-full w-full object-cover opacity-85 dark:opacity-60 scale-100 group-hover:scale-102 transition-all duration-[4000ms]" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center scale-95 group-hover:scale-105 transition-all duration-700 shadow-lg text-primary-foreground">
                      <Play size={20} className="fill-current translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
              
              <FadeIn delay={0.25} className="md:col-span-5 space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Latest Sermon</p>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-wide leading-snug">
                  {latestSermon.t}
                </h3>
                <p className="text-foreground/75 text-xs leading-relaxed tracking-wider">
                  {latestSermon.t === "When the fire fell" ? "What does it mean to be a Pentecost generation today? A study on what happens when ordinary people surrender space to an extraordinary God." : `Watch our latest sermon message "${latestSermon.t}" preached by ${latestSermon.p}.`}
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>{latestSermon.p}</span>
                  <span>•</span>
                  <span>{latestSermon.len} watch</span>
                </div>
                <div className="pt-4 flex gap-4">
                  <Link 
                    to="/sermons"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
                  >
                    Watch Now
                  </Link>
                  <Link 
                    to="/sermons" 
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-card transition-all duration-500 cursor-pointer"
                  >
                    View All
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <Section eyebrow="Leadership" title="The hearts carrying the vision.">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Pastor Daniel O.", role: "Youth Pastor", img: pastorDanielImg },
              { name: "Sarah M.", role: "Discipleship Lead", img: sarahMImg },
              { name: "Joseph K.", role: "Worship Lead", img: josephKImg }
            ].map((leader, i) => (
              <FadeIn key={leader.name} delay={i * 0.1}>
                <div className="group">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-secondary/35 relative border border-border/5 shadow-sm">
                    <img 
                      src={leader.img} 
                      alt={leader.name} 
                      loading="lazy" 
                      className="w-full h-full object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  <h4 className="font-display text-xl font-medium text-foreground">{leader.name}</h4>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{leader.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>


        {/* 7. TESTIMONIALS (Authentic Stories with Images) - BG: Soft Cream */}
        <section className="py-24 bg-[#fdfaf4] dark:bg-[#12100d] border-y border-border/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Testimonials</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-wide text-foreground">
                Stories from Our Family
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FadeIn delay={0.1}>
                <div className="bg-secondary/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between h-full hover:bg-secondary/50 transition-all duration-700">
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
                <div className="bg-secondary/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between h-full hover:bg-secondary/50 transition-all duration-700">
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
                <div className="bg-secondary/40 rounded-2xl p-8 md:p-10 space-y-6 flex flex-col justify-between h-full hover:bg-secondary/50 transition-all duration-700">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-medium">Join a Small Group</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We believe life change happens in circles, not just rows. Connect in weekly cell groups across the city for Bible study, prayers, and real friendships.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-500 cursor-pointer"
                    >
                      Find a Group <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-secondary/40 rounded-2xl p-8 md:p-10 space-y-6 flex flex-col justify-between h-full hover:bg-secondary/50 transition-all duration-700">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-medium">Support the Ministry</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your generosity enables us to build student facilities, host free youth outreach camps, and spread the gospel throughout campuses and local communities.
                    </p>
                  </div>
                  <div className="pt-6">
                    <a
                      href="https://paystack.com/pay/youthonfire"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-foreground/85 transition-all duration-500 cursor-pointer"
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
                  <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-wide text-foreground">
                    Get in Touch with Us
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                    Have questions about gatherings, prayer requests, or transportation? Let us help you plan your visit.
                  </p>
                  <div className="space-y-4 pt-4 text-xs text-foreground/80 font-medium">
                    <p className="flex items-center gap-2 leading-relaxed">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      <a 
                        href="https://www.google.com/maps/place/Overcomers+Church+World+Outreach/@6.5000246,3.2999304,19.79z/data=!4m6!3m5!1s0x103b8edf1cf04881:0x3b67b878320ebe54!8m2!3d6.5003656!4d3.299835!16s%2Fg%2F11b6j5c442?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors duration-500"
                      >
                        2 Archbishop Ademowo Crescent, Off Ago Palace Way, Okota (Near Forte Oil Station), Lagos, Nigeria
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-primary" />
                      <a href="mailto:hello@youthonfire.org" className="hover:text-primary transition-colors duration-500">
                        hello@youthonfire.org
                      </a>
                    </p>
                  </div>
                  <div className="pt-6 flex gap-4">
                    <Link
                      to="/contact"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-500 shadow-md cursor-pointer"
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.577901198539!2d3.2976463147702213!3d6.500365595304958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8edf1cf04881%3A0x3b67b878320ebe54!2sOvercomers%20Church%20World%20Outreach!5e0!3m2!1sen!2sng!4v1688500000000!5m2!1sen!2sng"
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

      {/* Lightbox Modal overlay with next/prev controls */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md transition-all duration-500"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(null);
            }}
          >
            <X size={24} />
          </button>

          {/* Left navigation arrow */}
          <button 
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + tiles.length) % tiles.length : null));
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Lightbox Image */}
          <div 
            className="relative max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={tiles[activeImageIndex].full} 
              alt={`Youth gathering high-res preview`} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-xs text-white/50 tracking-widest uppercase font-mono">
              Image {activeImageIndex + 1} of {tiles.length}
            </p>
          </div>

          {/* Right navigation arrow */}
          <button 
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % tiles.length : null));
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

    </>
  );
}
