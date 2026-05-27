import { createFileRoute } from "@tanstack/react-router";
import { Shell, Slow } from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Whisper — Youth on Fire" },
      { name: "description", content: "Send a word. We are listening." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Shell>
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-xl mx-auto w-full">
          <Slow>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-12">— whisper —</p>
            <h1 className="font-display italic text-4xl md:text-6xl leading-[1.1] text-foreground/85 mb-20 text-balance">
              Send a word.
              <br />
              <span className="text-foreground/50">We are listening.</span>
            </h1>
          </Slow>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-12"
              >
                {[
                  { n: "name", l: "your name, if you wish", t: "text" },
                  { n: "email", l: "a way back to you", t: "email" },
                ].map((f) => (
                  <div key={f.n}>
                    <label className="text-[10px] tracking-[0.4em] uppercase text-foreground/40">{f.l}</label>
                    <input
                      required
                      type={f.t}
                      name={f.n}
                      className="mt-3 w-full bg-transparent border-0 border-b border-border/40 focus:border-primary py-3 outline-none font-display italic text-xl text-foreground/90 transition-colors duration-1000"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] tracking-[0.4em] uppercase text-foreground/40">a word, a prayer, a question</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    className="mt-3 w-full bg-transparent border-0 border-b border-border/40 focus:border-primary py-3 outline-none font-display italic text-xl text-foreground/90 resize-none transition-colors duration-1000"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 mt-8"
                >
                  <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 group-hover:text-primary transition-colors duration-1000">
                    send, quietly
                  </span>
                  <span className="block w-8 h-px bg-foreground/40 group-hover:bg-primary group-hover:w-16 transition-all duration-[1500ms]" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="font-display italic text-3xl text-foreground/70"
              >
                received. <span className="text-foreground/40">we will sit with it.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-32">
            <button
              onClick={() => setShowDetails((s) => !s)}
              className="group flex items-center gap-4"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 group-hover:text-foreground transition-colors duration-1000">
                {showDetails ? "hide" : "or, find us"}
              </span>
              <span className="block w-8 h-px bg-foreground/30 group-hover:bg-foreground/70 transition-colors duration-1000" />
            </button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-10 space-y-8 text-foreground/70">
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-2">where</p>
                      <p className="font-display italic text-xl">12 revival avenue, city center</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-2">when</p>
                      <p className="font-display italic text-xl">friday — 6:30pm · sunday — 9 & 11am</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-2">email</p>
                      <a href="mailto:hello@youthonfire.org" className="font-display italic text-xl hover:text-primary transition-colors duration-1000">
                        hello@youthonfire.org
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <div className="h-32" />
    </Shell>
  );
}
