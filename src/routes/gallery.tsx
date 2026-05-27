import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow } from "@/components/Layout";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Traces — Youth on Fire" },
      { name: "description", content: "Marks the fire has left." },
    ],
  }),
  component: Gallery,
});

const traces = [
  { src: hero, n: "i", w: "md:col-span-7", h: "aspect-[4/3]" },
  { src: community, n: "ii", w: "md:col-span-5 md:col-start-1", h: "aspect-square md:mt-32" },
  { src: word, n: "iii", w: "md:col-span-6 md:col-start-7", h: "aspect-[4/5] md:-mt-24" },
  { src: event, n: "iv", w: "md:col-span-5 md:col-start-3", h: "aspect-[3/4] md:mt-32" },
  { src: community, n: "v", w: "md:col-span-6 md:col-start-7", h: "aspect-square md:-mt-16" },
];

function Gallery() {
  return (
    <Shell>
      <section className="min-h-[60vh] flex items-end px-6 pb-24">
        <div className="max-w-3xl mx-auto w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— traces —</p>
            <h1 className="font-display italic text-4xl md:text-6xl leading-[1.1] text-foreground/85 text-balance">
              The fire leaves marks.
            </h1>
          </Slow>
        </div>
      </section>

      <section className="px-6 pb-48">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {traces.map((t, i) => (
            <div key={i} className={`${t.w}`}>
              <Slow delay={i * 0.1}>
                <figure className="relative group overflow-hidden">
                  <img
                    src={t.src}
                    alt=""
                    loading="lazy"
                    className={`w-full object-cover ${t.h} grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms]`}
                  />
                  <figcaption className="absolute bottom-3 left-3 text-[10px] tracking-[0.4em] uppercase text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    {t.n}
                  </figcaption>
                </figure>
              </Slow>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
