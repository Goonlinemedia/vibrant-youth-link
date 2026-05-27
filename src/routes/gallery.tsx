import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Youth on Fire Ministries" },
      { name: "description", content: "Moments from worship nights, camps and outreach." },
    ],
  }),
  component: Gallery,
});

const images = [hero, community, event, word, event, community, word, hero];

function Gallery() {
  return (
    <Layout>
      <Section eyebrow="Gallery" title="Moments from the fire.">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="relative break-inside-avoid overflow-hidden rounded-md group">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-700" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
