import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { Download } from "lucide-react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultResources, defaultBooks, getResourceIcon } from "@/lib/firebase";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Youth on Fire Ministries" },
      { name: "description", content: "Devotionals, Bible study guides, prayer plans and growth tools." },
    ],
  }),
  component: Resources,
});

function Resources() {
  const items = useFirestoreCollection("resources", defaultResources);
  const books = useFirestoreCollection("recommended_books", defaultBooks);

  return (
    <Layout>
      <Section eyebrow="Resources" title="Tools to keep your fire burning.">
        <div className="grid sm:grid-cols-2 gap-px bg-border/40 rounded-md overflow-hidden">
          {items.map((it, i) => {
            const IconComponent = getResourceIcon(it.icon);
            return (
              <FadeIn key={it.t} delay={i * 0.05}>
                <div className="bg-card/50 p-10 h-full group cursor-pointer hover:bg-card transition-colors duration-700">
                  <div className="flex items-start justify-between mb-8">
                    <IconComponent className="text-primary" size={28} />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{it.tag}</span>
                  </div>
                  <h3 className="font-display text-3xl mb-3">{it.t}</h3>
                  <p className="text-foreground/65 text-sm leading-relaxed">{it.d}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-primary transition-colors duration-700">
                    <Download size={14} /> Get resource
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Recommended" title="Books we keep coming back to.">
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {books.map((book) => (
            <li key={book.title} className="flex justify-between items-baseline py-6 group hover:px-4 transition-all duration-500">
              <span className="font-display text-2xl">{book.title}</span>
              <span className="text-sm text-muted-foreground">{book.author}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
}
