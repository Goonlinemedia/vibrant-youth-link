import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { MessageCircle, Instagram, Youtube, MapPin, Clock, Mail, CheckCircle, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { addFirestoreDoc } from "@/lib/firebase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Register — Youth on Fire Ministries" },
      { name: "description", content: "Register for upcoming youth programs or send us a message." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    ageRange: "",
    pickupLocation: "",
    requireTransportation: "",
    withFriends: "",
    friendCount: "",
    isFirstTime: "",
    expectations: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selectRadio = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addFirestoreDoc("registrations", {
        ...form,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err: any) {
      alert("Error submitting registration: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Section eyebrow="Contact & Register" title="Register for the Program & Get in Touch">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form Section */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-card/40 backdrop-blur-md border border-border/10 p-6 md:p-8 rounded-2xl shadow-xl">
                    <div className="mb-8 border-b border-border/10 pb-4">
                      <h3 className="font-display text-2xl font-light mb-1">Programme Registration</h3>
                      <p className="text-xs text-muted-foreground tracking-wider">
                        Kindly fill out the short form below to register and help us plan. Use the expectations field to submit any prayer requests.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 1. Full Name */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Full Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground"
                        />
                      </div>

                      {/* 2-Column Inputs */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* 2. Phone Number */}
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone Number</label>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+234 800 000 0000"
                            className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground"
                          />
                        </div>

                        {/* 3. Email Address (Optional) */}
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Email Address <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="johndoe@example.com"
                            className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground"
                          />
                        </div>
                      </div>

                      {/* 2-Column Selectors */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* 4. Gender */}
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gender</label>
                          <div className="relative">
                            <select
                              required
                              name="gender"
                              value={form.gender}
                              onChange={handleChange}
                              className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground appearance-none cursor-pointer"
                            >
                              <option value="" disabled className="bg-background text-foreground">Select Gender</option>
                              <option value="Male" className="bg-background text-foreground">Male</option>
                              <option value="Female" className="bg-background text-foreground">Female</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">▼</span>
                          </div>
                        </div>

                        {/* 5. Age Range */}
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Age Range</label>
                          <div className="relative">
                            <select
                              required
                              name="ageRange"
                              value={form.ageRange}
                              onChange={handleChange}
                              className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground appearance-none cursor-pointer"
                            >
                              <option value="" disabled className="bg-background text-foreground">Select Age Range</option>
                              <option value="Under 18" className="bg-background text-foreground">Under 18</option>
                              <option value="18 – 24" className="bg-background text-foreground">18 – 24</option>
                              <option value="25 – 30" className="bg-background text-foreground">25 – 30</option>
                              <option value="31 and Above" className="bg-background text-foreground">31 and Above</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">▼</span>
                          </div>
                        </div>
                      </div>

                      {/* 6. Preferred Pickup Location */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred Pickup Location</label>
                        <div className="relative">
                          <select
                            required
                            name="pickupLocation"
                            value={form.pickupLocation}
                            onChange={handleChange}
                            className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-background text-foreground">Select Location</option>
                            <option value="Satellite Town" className="bg-background text-foreground">Satellite Town</option>
                            <option value="Yaba" className="bg-background text-foreground">Yaba</option>
                            <option value="Lekki" className="bg-background text-foreground">Lekki</option>
                            <option value="Self-arranged" className="bg-background text-foreground">I will make my own transportation arrangements</option>
                          </select>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">▼</span>
                        </div>
                      </div>

                      {/* 7. Will You Require Transportation? */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Will You Require Transportation?</label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {["Yes", "No"].map((opt) => {
                            const active = form.requireTransportation === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectRadio("requireTransportation", opt)}
                                className={`px-4 py-3 rounded-lg border text-xs tracking-wider uppercase font-semibold transition-all duration-500 cursor-pointer ${
                                  active
                                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                                    : "border-border/40 bg-card/10 hover:border-primary/30 text-foreground/75"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <input type="hidden" required name="requireTransportation" value={form.requireTransportation} />
                      </div>

                      {/* 8. Are You Attending With Friends? */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Are You Attending With Friends?</label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {["Yes", "No"].map((opt) => {
                            const active = form.withFriends === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  selectRadio("withFriends", opt);
                                  if (opt === "No") {
                                    setForm((prev) => ({ ...prev, friendCount: "" }));
                                  }
                                }}
                                className={`px-4 py-3 rounded-lg border text-xs tracking-wider uppercase font-semibold transition-all duration-500 cursor-pointer ${
                                  active
                                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                                    : "border-border/40 bg-card/10 hover:border-primary/30 text-foreground/75"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <input type="hidden" required name="withFriends" value={form.withFriends} />

                        {/* Conditional Friend Input */}
                        <AnimatePresence>
                          {form.withFriends === "Yes" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                How many people are coming with you?
                              </label>
                              <input
                                required
                                type="number"
                                name="friendCount"
                                min="1"
                                value={form.friendCount}
                                onChange={handleChange}
                                placeholder="e.g. 3"
                                className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 9. Is This Your First Youth Programme with us? */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Is This Your First Youth Programme with us?</label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {["Yes", "No"].map((opt) => {
                            const active = form.isFirstTime === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectRadio("isFirstTime", opt)}
                                className={`px-4 py-3 rounded-lg border text-xs tracking-wider uppercase font-semibold transition-all duration-500 cursor-pointer ${
                                  active
                                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                                    : "border-border/40 bg-card/10 hover:border-primary/30 text-foreground/75"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <input type="hidden" required name="isFirstTime" value={form.isFirstTime} />
                      </div>

                      {/* 10. expectations */}
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Prayer Expectations / What Are You Trusting God For? <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                        </label>
                        <textarea
                          name="expectations"
                          rows={4}
                          value={form.expectations}
                          onChange={handleChange}
                          placeholder="Share what you are believing God for or drop any prayer requests..."
                          className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all duration-[1000ms] shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Registering..." : "Register Now"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card/40 backdrop-blur-md border border-border/10 p-10 rounded-2xl shadow-xl text-center"
                >
                  <div className="flex justify-center mb-6">
                    <CheckCircle size={56} className="text-primary animate-pulse" />
                  </div>
                  <h3 className="font-display text-3xl font-light mb-3">Registration Successful!</h3>
                  <p className="text-xs text-foreground/75 max-w-sm mx-auto mb-8 leading-relaxed">
                    Thank you, <strong className="text-primary">{form.name}</strong>. We've successfully registered you. We are excited about what God has in store for you!
                  </p>

                  <div className="bg-background/40 border border-border/5 rounded-xl p-6 text-left max-w-sm mx-auto space-y-3 mb-8 text-[11px] text-foreground/80">
                    <p className="flex justify-between border-b border-border/5 pb-2">
                      <span className="text-muted-foreground uppercase tracking-wider">Phone</span>
                      <span>{form.phone}</span>
                    </p>
                    {form.email && (
                      <p className="flex justify-between border-b border-border/5 pb-2">
                        <span className="text-muted-foreground uppercase tracking-wider">Email</span>
                        <span>{form.email}</span>
                      </p>
                    )}
                    <p className="flex justify-between border-b border-border/5 pb-2">
                      <span className="text-muted-foreground uppercase tracking-wider">Pickup Point</span>
                      <span>{form.pickupLocation === "Self-arranged" ? "Self arranged" : form.pickupLocation}</span>
                    </p>
                    {form.withFriends === "Yes" && (
                      <p className="flex justify-between border-b border-border/5 pb-2">
                        <span className="text-muted-foreground uppercase tracking-wider">Friends attending</span>
                        <span>{form.friendCount || 0}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-[1000ms] cursor-pointer"
                    >
                      Register another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact Details Section */}
          <div className="lg:col-span-5 w-full">
            <FadeIn delay={0.15}>
              <div className="bg-card/20 border border-border/10 p-8 rounded-2xl space-y-8 backdrop-blur-sm lg:sticky lg:top-28">
                <div>
                  <h4 className="font-display text-2xl font-light mb-4">Ministry Details</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
                    Have questions about our events, services, or transportation? Reach out to the leadership team or visit our weekly gatherings.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                      <a 
                        href="https://www.google.com/maps/place/Overcomers+Church+World+Outreach/@6.5000246,3.2999304,19.79z/data=!4m6!3m5!1s0x103b8edf1cf04881:0x3b67b878320ebe54!8m2!3d6.5003656!4d3.299835!16s%2Fg%2F11b6j5c442?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet font-display text-base leading-relaxed mt-1 block hover:text-primary transition-colors duration-500"
                      >
                        Main Auditorium<br />2 Archbishop Ademowo Crescent, Off Ago Palace Way, Okota (Near Forte Oil Station), Lagos, Nigeria
                      </a>
                    </div>
                  </div>

                  {/* Times */}
                  <div className="flex gap-4 items-start">
                    <Clock className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Gathering Times</p>
                      <p className="text-xs leading-relaxed text-foreground/80 mt-1">
                        Sunday Service — 8:00 AM<br />
                        Wednesday Fellowship — 6:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <Phone className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Phone Number</p>
                      <a href="tel:+2348123456789" className="link-quiet text-xs text-foreground/90 mt-1 block">
                        +234 812 345 6789
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <Mail className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email Address</p>
                      <a href="mailto:hello@youthonfire.org" className="link-quiet text-xs text-foreground/90 mt-1 block">
                        hello@youthonfire.org
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="pt-4 border-t border-border/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Follow our Rhythm</p>
                  <div className="flex gap-4 text-foreground/70">
                    <a href="https://wa.me/2348123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-primary transition-colors duration-500">
                      <MessageCircle size={20} />
                    </a>
                    <a href="https://instagram.com/youthonfire" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors duration-500">
                      <Instagram size={20} />
                    </a>
                    <a href="https://www.youtube.com/@overcomersgrace" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors duration-500">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
