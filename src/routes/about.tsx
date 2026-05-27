import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow, Reveal } from "@/components/Layout";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Origin — Youth on Fire" },
      { name: "description", content: "Where the fire began." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Shell>
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-2xl mx-auto">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— origin —</p>
            <h1 className="font-display italic text-4xl md:text-6xl leading-[1.15] text-foreground/85 text-balance">
              We did not begin with a name.
              <br />
              <span className="text-foreground/50">We began with a longing.</span>
            </h1>
          </Slow>
        </div>
      </section>

      <section className="relative min-h-[90vh] flex items-end">
        <div className="absolute inset-0">
          <img src={community} alt="" loading="lazy" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 pb-32 w-full">
          <Slow>
            <p className="font-display italic text-xl md:text-2xl leading-relaxed text-foreground/70">
              A small room. A few voices. A worn Bible left open on the table.
              We sang quietly, because we were afraid of being heard.
              Then, slowly, we stopped being afraid.
            </p>
          </Slow>
        </div>
      </section>

      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-2xl mx-auto w-full space-y-20">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/30">— what we believe, in fragments —</p>
          </Slow>
          {[
            { l: "the word", b: "Scripture is alive. It reads us back." },
            { l: "the spirit", b: "Still moving. Still close. Not a memory." },
            { l: "the table", b: "Open. To strangers. To the unsure. To you." },
            { l: "the mission", b: "Carry the flame. Light another. Disappear." },
          ].map((r, i) => (
            <Slow key={r.l} delay={i * 0.15}>
              <Reveal label={r.l}>{r.b}</Reveal>
            </Slow>
          ))}
        </div>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
