import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { BookOpen, FileText, Flame, Compass, Download } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Youth on Fire Ministries" },
      { name: "description", content: "Devotionals, Bible study guides, prayer plans and growth tools." },
    ],
  }),
  component: Resources,
});

const items = [
  { i: BookOpen, t: "Daily Devotionals", d: "A 5-minute morning read to anchor your day in scripture.", tag: "Read" },
  { i: FileText, t: "Bible Study Guides", d: "Group-ready studies through Romans, John and the Psalms.", tag: "PDF" },
  { i: Flame, t: "21-Day Prayer Plan", d: "Three weeks of guided prayer prompts and scripture.", tag: "Plan" },
  { i: Compass, t: "Growth Tracks", d: "Step-by-step paths for new believers and emerging leaders.", tag: "Path" },
];

function Resources() {
  return (
    <Layout>
      <Section eyebrow="Resources" title="Tools to keep your fire burning.">
        <div className="grid sm:grid-cols-2 gap-px bg-border/40 rounded-md overflow-hidden">
          {items.map((it, i) => (
            <FadeIn key={it.t} delay={i * 0.05}>
              <div className="bg-card/50 p-10 h-full group cursor-pointer hover:bg-card transition-colors duration-700">
                <div className="flex items-start justify-between mb-8">
                  <it.i className="text-primary" size={28} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{it.tag}</span>
                </div>
                <h3 className="font-display text-3xl mb-3">{it.t}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed">{it.d}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-primary transition-colors duration-700">
                  <Download size={14} /> Get resource
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recommended" title="Books we keep coming back to.">
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {[
            ["The Pursuit of God", "A.W. Tozer"],
            ["Forgotten God", "Francis Chan"],
            ["Mere Christianity", "C.S. Lewis"],
            ["The Cost of Discipleship", "Dietrich Bonhoeffer"],
          ].map(([t, a]) => (
            <li key={t} className="flex justify-between items-baseline py-6 group hover:px-4 transition-all duration-500">
              <span className="font-display text-2xl">{t}</span>
              <span className="text-sm text-muted-foreground">{a}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
}
