import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { Play } from "lucide-react";
import { useState } from "react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultSermons, resolveImage } from "@/lib/firebase";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Youth on Fire Ministries" },
      { name: "description", content: "Watch and listen to messages on faith, purpose, relationships, leadership and prayer." },
    ],
  }),
  component: Sermons,
});

const categories = ["All", "Faith", "Relationships", "Purpose", "Leadership", "Prayer"] as const;

function Sermons() {
  const sermons = useFirestoreCollection("sermons", defaultSermons);
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat === "All" ? sermons : sermons.filter((s) => s.c === cat);

  return (
    <Layout>
      <Section eyebrow="Sermons" title="Messages to set you on fire.">
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-full border transition-all duration-500 ${
                cat === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((s, i) => (
            <FadeIn key={s.t} delay={i * 0.05}>
              <article className="group cursor-pointer">
                <div className="aspect-video rounded-md overflow-hidden bg-card relative">
                  <img src={resolveImage(s.img)} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <Play size={16} className="text-primary-foreground translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-background/70 backdrop-blur px-2 py-1 rounded">
                    {s.len}
                  </div>
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-primary/70">{s.c}</p>
                <h3 className="font-display text-2xl mt-2 group-hover:text-primary transition-colors duration-500">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.p}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
