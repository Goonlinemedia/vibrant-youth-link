import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Youth on Fire Ministries" },
      { name: "description", content: "Our vision, leadership and weekly rhythm. Discover the heart of Youth on Fire Ministries." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <Section eyebrow="About us" title="We exist to see a generation living unashamed of Jesus.">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-foreground/75 leading-relaxed text-lg">
              Youth on Fire Ministries is the youth department of our local church — a family of teenagers,
              students and young adults learning what it means to follow Christ in this generation.
            </p>
            <p className="mt-6 text-foreground/65 leading-relaxed">
              We are not a program. We are a people — gathering weekly to worship, study the Word, pray,
              and carry the gospel into our schools, workplaces, families and timelines.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="aspect-[4/5] rounded-md overflow-hidden">
              <img src={community} alt="Our community" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section eyebrow="Our convictions" title="What we stand for.">
        <div className="grid md:grid-cols-2 gap-px bg-border/40 rounded-md overflow-hidden">
          {[
            ["Vision", "A Spirit-filled generation carrying revival fire into every sphere of life."],
            ["Mission", "Make disciples who make disciples — rooted in the Word, led by the Spirit."],
            ["Values", "Authenticity, holiness, family, prayer, mission."],
            ["For who", "Teens (13+), students, young professionals — anyone hungry for more of God."],
          ].map(([t, d]) => (
            <div key={t} className="bg-card/50 p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">{t}</p>
              <p className="text-foreground/80 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Leadership" title="The team carrying this.">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { n: "Pastor Daniel O.", r: "Youth Pastor" },
            { n: "Sarah M.", r: "Discipleship Lead" },
            { n: "Joseph K.", r: "Worship Lead" },
          ].map((p) => (
            <FadeIn key={p.n}>
              <div className="group">
                <div className="aspect-[4/5] rounded-md bg-card overflow-hidden mb-4 ember-glow" />
                <p className="font-display text-xl">{p.n}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{p.r}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section eyebrow="Weekly rhythm" title="When we gather.">
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {[
            ["Friday", "Youth Night", "6:30 PM"],
            ["Sunday", "Main Service", "9:00 AM & 11:00 AM"],
            ["Wednesday", "Prayer & Word", "6:00 PM"],
            ["Saturday", "Small Groups", "Various locations"],
          ].map(([d, n, t]) => (
            <li key={d} className="grid grid-cols-3 py-6 group hover:px-4 transition-all duration-500">
              <span className="text-xs uppercase tracking-[0.3em] text-primary/80 self-center">{d}</span>
              <span className="font-display text-2xl">{n}</span>
              <span className="text-foreground/60 text-sm self-center justify-self-end">{t}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
}
