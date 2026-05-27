import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow, Reveal } from "@/components/Layout";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Embers — Youth on Fire" },
      { name: "description", content: "Small things to carry with you." },
    ],
  }),
  component: Resources,
});

const embers = [
  { l: "a devotional, for the mornings", b: "Five minutes of scripture and silence. Sent quietly, never asked back." },
  { l: "twenty-one days of prayer", b: "A guide for the slow rebuilding of an inner life." },
  { l: "studies in the gospel of john", b: "For small groups, or one person and a lamp." },
  { l: "a reading list, for the hungry", b: "Tozer. Bonhoeffer. Lewis. Nouwen. A few others, less known." },
];

function Resources() {
  return (
    <Shell>
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-2xl mx-auto w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— embers —</p>
            <h1 className="font-display italic text-4xl md:text-6xl leading-[1.1] text-foreground/85 mb-24 text-balance">
              Small things to carry with you when you leave.
            </h1>
          </Slow>

          <div className="space-y-20">
            {embers.map((e, i) => (
              <Slow key={e.l} delay={i * 0.15}>
                <Reveal label={e.l}>{e.b}</Reveal>
              </Slow>
            ))}
          </div>
        </div>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
