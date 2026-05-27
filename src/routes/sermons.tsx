import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow } from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Echoes — Youth on Fire" },
      { name: "description", content: "Words that lingered." },
    ],
  }),
  component: Sermons,
});

const echoes = [
  { n: "i", t: "when the fire fell", p: "Daniel", len: "42 min", img: community, body: "On Pentecost, and the room that still waits." },
  { n: "ii", t: "the prayer that moves heaven", p: "Daniel", len: "48 min", img: word, body: "On weakness, persistence, and the open door." },
  { n: "iii", t: "designed for purpose", p: "Sarah", len: "36 min", img: event, body: "On being known before you arrived." },
  { n: "iv", t: "lead from the secret place", p: "Sarah", len: "31 min", img: community, body: "On hidden roots and the cost of fruit." },
  { n: "v", t: "faith in the unseen", p: "Daniel", len: "44 min", img: word, body: "On the things behind the things." },
];

function Sermons() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Shell>
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— echoes —</p>
            <h1 className="font-display italic text-4xl md:text-6xl leading-[1.1] text-foreground/85 mb-24 text-balance">
              Words that, once spoken, kept burning.
            </h1>
          </Slow>

          <ul className="divide-y divide-border/30 border-y border-border/30">
            {echoes.map((e, i) => (
              <Slow key={e.t} delay={i * 0.08}>
                <li
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="py-10 group cursor-pointer relative"
                >
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-1 text-[10px] tracking-[0.3em] text-foreground/30 group-hover:text-primary transition-colors duration-1000 uppercase">
                      {e.n}
                    </span>
                    <span className="col-span-8 font-display italic text-2xl md:text-3xl text-foreground/70 group-hover:text-foreground transition-colors duration-1000">
                      {e.t}
                    </span>
                    <span className="col-span-3 text-[10px] tracking-[0.3em] text-foreground/30 text-right uppercase">
                      {e.p} · {e.len}
                    </span>
                  </div>
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden col-span-12 text-foreground/50 font-display italic mt-4 ml-[8.333%]"
                      >
                        {e.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              </Slow>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
