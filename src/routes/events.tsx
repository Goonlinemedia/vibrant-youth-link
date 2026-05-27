import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow } from "@/components/Layout";
import { useEffect, useState } from "react";
import event from "@/assets/event.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Gatherings — Youth on Fire" },
      { name: "description", content: "Where we will be." },
    ],
  }),
  component: Events,
});

const gatherings = [
  { date: "2026-06-14T18:00:00", t: "carriers", place: "Mountview", featured: true, n: "i" },
  { date: "2026-06-02T19:00:00", t: "burning hearts", place: "the main hall", n: "ii" },
  { date: "2026-06-21T16:00:00", t: "campus", place: "city university", n: "iii" },
  { date: "2026-07-09T18:30:00", t: "encounter", place: "the main hall", n: "iv" },
];

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function Events() {
  const featured = gatherings.find((g) => g.featured)!;
  const c = useCountdown(featured.date);

  return (
    <Shell>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={event} alt="" className="h-full w-full object-cover opacity-30 blur-[2px]" />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— next —</p>
            <h1 className="font-display italic text-5xl md:text-8xl leading-[1] text-foreground/90 text-balance">
              {featured.t}.
            </h1>
            <p className="mt-8 text-[10px] tracking-[0.4em] uppercase text-foreground/40">
              {new Date(featured.date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })} · {featured.place}
            </p>

            <div className="mt-20 flex gap-10 text-foreground/70 tabular-nums">
              {[["d", c.d], ["h", c.h], ["m", c.m], ["s", c.s]].map(([k, v]) => (
                <div key={k as string}>
                  <div className="font-display italic text-3xl md:text-5xl">{String(v).padStart(2, "0")}</div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-foreground/30 mt-1">{k}</div>
                </div>
              ))}
            </div>
          </Slow>
        </div>
      </section>

      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/30 mb-16">— the others —</p>
          </Slow>
          <ul className="divide-y divide-border/30 border-y border-border/30">
            {gatherings.filter((g) => !g.featured).map((g, i) => {
              const d = new Date(g.date);
              return (
                <Slow key={g.t} delay={i * 0.1}>
                  <li className="py-10 grid grid-cols-12 gap-4 items-baseline group cursor-pointer">
                    <span className="col-span-1 text-[10px] tracking-[0.3em] uppercase text-foreground/30 group-hover:text-primary transition-colors duration-1000">
                      {g.n}
                    </span>
                    <span className="col-span-7 font-display italic text-2xl md:text-3xl text-foreground/70 group-hover:text-foreground transition-colors duration-1000">
                      {g.t}
                    </span>
                    <span className="col-span-4 text-[10px] tracking-[0.3em] uppercase text-foreground/30 text-right">
                      {d.toLocaleDateString("en", { day: "numeric", month: "short" })} · {g.place}
                    </span>
                  </li>
                </Slow>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
