import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { useState } from "react";
import { ArrowLeft, CheckCircle, MapPin, Calendar, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Youth on Fire Ministries" },
      { name: "description", content: "Sign up for upcoming youth programs, camps, and activities." },
    ],
  }),
  component: Register,
});

function Register() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <Section eyebrow="Registration" title="Join the Gathering.">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-500"
            >
              <ArrowLeft size={14} /> Back to events
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card/40 backdrop-blur-md border border-border/10 p-8 md:p-12 rounded-2xl shadow-xl">
                  <div className="mb-10 text-center md:text-left border-b border-border/10 pb-6">
                    <h3 className="font-display text-3xl font-light mb-2">Youth Programme Registration</h3>
                    <p className="text-xs text-muted-foreground tracking-wider leading-relaxed">
                      We're excited to have you join us! Kindly fill out the short form below to help us plan effectively.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
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

                    {/* 3. Email (Optional) */}
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
                      {/* Hidden validation hook */}
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

                      {/* Dynamic Conditional Friend Count Field */}
                      <AnimatePresence>
                        {form.withFriends === "Yes" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
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

                    {/* 10. Prayer Expectations / What Are You Trusting God For? (Optional) */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Prayer Expectations / What Are You Trusting God For? <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                      </label>
                      <textarea
                        name="expectations"
                        rows={4}
                        value={form.expectations}
                        onChange={handleChange}
                        placeholder="Share what you are believing God for during this program..."
                        className="mt-2 w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-foreground resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all duration-[1000ms] shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] cursor-pointer"
                      >
                        Register Now
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-card/40 backdrop-blur-md border border-border/10 p-12 rounded-2xl shadow-xl text-center"
              >
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-primary animate-pulse" />
                </div>
                <h3 className="font-display text-4xl font-light mb-4">Registration Successful!</h3>
                <p className="text-sm text-foreground/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you, <strong className="text-primary">{form.name}</strong>. We have successfully registered your spot. We are excited about what God will do in this gathering!
                </p>

                <div className="bg-background/40 border border-border/5 rounded-xl p-6 text-left max-w-md mx-auto space-y-3 mb-10 text-xs text-foreground/80">
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

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center border border-border/40 bg-card/20 hover:border-primary/50 hover:text-primary px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-[1000ms] cursor-pointer"
                  >
                    Go back home
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
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
                    }}
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-[1000ms] cursor-pointer"
                  >
                    Register another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </Layout>
  );
}
