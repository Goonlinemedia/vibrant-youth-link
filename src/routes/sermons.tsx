import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { Play, X } from "lucide-react";
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
  const sermons = useFirestoreCollection("sermons", defaultSermons) as any[];

  // Sort sermons chronologically (newest first)
  const sortedSermons = [...sermons].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const list = cat === "All" ? sortedSermons : sortedSermons.filter((s) => s.c === cat);

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
    return resolveImage(sermon.img);
  };

  const handleSermonClick = (sermon: any) => {
    if (sermon.videoUrl) {
      const id = getYouTubeId(sermon.videoUrl);
      if (id) {
        setActiveVideoUrl(sermon.videoUrl);
        return;
      }
    }
    // Fallback if no specific video ID is configured: navigate directly to channel list
    window.open("https://www.youtube.com/@overcomersgrace/videos", "_blank", "noopener,noreferrer");
  };

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
            <FadeIn key={s.t || i} delay={i * 0.05}>
              <article 
                onClick={() => handleSermonClick(s)}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-md overflow-hidden bg-card relative border border-border/10">
                  <img src={getSermonImage(s)} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center scale-95 group-hover:scale-105 transition-all duration-500 shadow-md">
                      <Play size={16} className="fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-2 py-1 rounded">
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

      {/* Embedded YouTube Player Modal */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-card border border-white/5 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white/80 hover:text-white p-2 rounded-full backdrop-blur-sm transition-all hover:bg-black/85"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideoUrl)}?autoplay=1`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-5 flex justify-between items-center bg-card/95 border-t border-border/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Now Streaming</p>
                <h4 className="text-base font-semibold text-foreground mt-1">
                  {sermons.find(s => s.videoUrl === activeVideoUrl)?.t || "Sermon Presentation"}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Preacher: {sermons.find(s => s.videoUrl === activeVideoUrl)?.p || "Youth Pastor"}
                </p>
              </div>
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="bg-primary hover:bg-primary/95 text-primary-foreground px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
