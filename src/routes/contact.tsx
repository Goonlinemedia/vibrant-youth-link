import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { MessageCircle, Instagram, Youtube, MapPin, Clock, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Youth on Fire Ministries" },
      { name: "description", content: "Get in touch with the youth leadership team, plan a visit, or send a prayer request." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <Section eyebrow="Contact" title="Reach out. We'd love to hear from you.">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              {[
                { n: "name", l: "Name", t: "text" },
                { n: "email", l: "Email", t: "email" },
              ].map((f) => (
                <div key={f.n}>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.l}</label>
                  <input
                    required
                    type={f.t}
                    name={f.n}
                    className="mt-2 w-full bg-transparent border-b border-border/60 py-3 focus:border-primary outline-none transition-colors duration-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message / Prayer request</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  className="mt-2 w-full bg-transparent border-b border-border/60 py-3 focus:border-primary outline-none transition-colors duration-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-500 disabled:opacity-60"
              >
                {sent ? "Message received — we'll be in touch" : "Send message"}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3 flex items-center gap-2"><MapPin size={12} /> Location</p>
                <p className="font-display text-2xl leading-snug">Main Auditorium<br />12 Revival Avenue, City Center</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3 flex items-center gap-2"><Clock size={12} /> Service times</p>
                <p className="text-foreground/80">Friday Youth Night — 6:30 PM</p>
                <p className="text-foreground/80">Sunday Service — 9:00 & 11:00 AM</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3 flex items-center gap-2"><Mail size={12} /> Email</p>
                <a href="mailto:hello@youthonfire.org" className="link-quiet text-foreground/90">hello@youthonfire.org</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">Follow us</p>
                <div className="flex gap-4 text-foreground/70">
                  <a href="#" aria-label="WhatsApp" className="hover:text-primary transition-colors duration-500"><MessageCircle size={22} /></a>
                  <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors duration-500"><Instagram size={22} /></a>
                  <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors duration-500"><Youtube size={22} /></a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
}
