import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultEvents, resolveImage } from "@/lib/firebase";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Youth on Fire Ministries" },
      { name: "description", content: "Upcoming camps, conferences, prayer nights and outreach with Youth on Fire Ministries." },
    ],
  }),
  component: Events,
});

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target || Date.now()).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function Events() {
  const upcoming = useFirestoreCollection("events", defaultEvents);
  const featured = upcoming.find((e) => e.featured) || upcoming[0] || {
    date: "2026-06-14T18:00:00",
    name: "Carriers Camp 2026",
    place: "Mountview Retreat",
    tag: "Camp",
    img: "event"
  };
  const c = useCountdown(featured.date);

  return (
    <Layout>
      <Section eyebrow="Events" title="Mark your calendar.">
        <FadeIn>
          <div className="relative rounded-md overflow-hidden">
            <img src={resolveImage(featured.img || "event")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 dark:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 dark:from-background via-background/40 dark:via-background/60 to-background/10 dark:to-background/20" />
            <div className="relative p-10 md:p-16 min-h-[420px] flex flex-col justify-end">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/90">Featured · {featured.tag}</p>
              <h3 className="font-display text-4xl md:text-6xl mt-4 max-w-2xl">{featured.name}</h3>
              <p className="mt-3 text-foreground/70">{featured.place}</p>

              <div className="mt-10 grid grid-cols-4 gap-4 max-w-md">
                {[
                  ["Days", c.d],
                  ["Hours", c.h],
                  ["Min", c.m],
                  ["Sec", c.s],
                ].map(([l, v]) => (
                  <div key={l as string} className="text-center">
                    <div className="font-display text-3xl md:text-5xl tabular-nums">
                      {String(v).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section eyebrow="All events" title="What's coming up.">
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {upcoming.map((e, i) => {
            const d = new Date(e.date);
            return (
              <FadeIn key={e.name} delay={i * 0.05}>
                <li className="list-none">
                  <Link
                    to="/contact"
                    className="grid grid-cols-12 gap-4 py-8 items-center group cursor-pointer hover:px-4 transition-all duration-700 w-full text-left"
                  >
                    <div className="col-span-3 md:col-span-2">
                      <div className="font-display text-3xl md:text-4xl">{d.getDate()}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {d.toLocaleString("en", { month: "short" })}
                      </div>
                    </div>
                    <div className="col-span-9 md:col-span-7">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-1">{e.tag}</p>
                      <p className="font-display text-2xl md:text-3xl">{e.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{e.place}</p>
                    </div>
                    <div className="hidden md:flex col-span-3 justify-end">
                      <span className="inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-primary transition-colors duration-700">
                        Register <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                </li>
              </FadeIn>
            );
          })}
        </ul>
      </Section>
    </Layout>
  );
}
