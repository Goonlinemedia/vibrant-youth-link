import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  auth, 
  addFirestoreDoc, 
  updateFirestoreDoc, 
  deleteFirestoreDoc, 
  initializeCollectionWithDefaults,
  defaultSermons,
  defaultEvents,
  defaultResources,
  defaultBooks,
  defaultRhythms,
  defaultTeam,
  defaultGallery
} from "@/lib/firebase";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { Plus, Edit2, Trash2, LogOut, CheckCircle, AlertCircle, RefreshCw, Mail, Phone, Clock, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Youth on Fire" },
      { name: "description", content: "Manage sermons, events, resources, rhythms, team, and photo gallery." },
    ],
  }),
  component: AdminPortal,
});

function AdminPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Live Database collections
  const sermons = useFirestoreCollection("sermons", defaultSermons) as any[];
  const events = useFirestoreCollection("events", defaultEvents) as any[];
  const resources = useFirestoreCollection("resources", defaultResources) as any[];
  const books = useFirestoreCollection("recommended_books", defaultBooks) as any[];
  const rhythms = useFirestoreCollection("weekly_rhythm", defaultRhythms) as any[];
  const team = useFirestoreCollection("leadership_team", defaultTeam) as any[];
  const gallery = useFirestoreCollection("gallery", defaultGallery) as any[];
  const registrations = useFirestoreCollection("registrations", []) as any[];

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "sermons" | "events" | "resources" | "rhythms" | "team" | "gallery" | "registrations"
  >("sermons");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Schema form values
  const [sermonForm, setSermonForm] = useState({ t: "", p: "", c: "Faith", len: "", img: "community" });
  const [eventForm, setEventForm] = useState({ date: "", name: "", place: "", tag: "Camp", featured: false });
  const [resourceForm, setResourceForm] = useState({ t: "", d: "", tag: "PDF", icon: "BookOpen" });
  const [bookForm, setBookForm] = useState({ title: "", author: "" });
  const [rhythmForm, setRhythmForm] = useState({ day: "Friday", name: "", time: "" });
  const [teamForm, setTeamForm] = useState({ name: "", role: "" });
  const [galleryForm, setGalleryForm] = useState({ thumb: "", full: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setActionSuccess("");
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        setActionSuccess("Admin account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setActionSuccess("Signed in successfully!");
      }
    } catch (error: any) {
      setAuthError(error.message || "Authentication failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setActionSuccess("Signed out successfully");
    } catch (error: any) {
      console.error(error);
    }
  };

  const triggerResetSuccess = (message: string) => {
    setActionSuccess(message);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // Seeding/Initialization database helper
  const handleSeedDefaults = async (collectionName: string, defaults: any[]) => {
    if (!confirm(`Are you sure you want to seed the "${collectionName}" collection? This will overwrite existing items in that collection.`)) return;
    try {
      await initializeCollectionWithDefaults(collectionName, defaults);
      triggerResetSuccess(`Successfully seeded default values to "${collectionName}"!`);
    } catch (e: any) {
      alert("Error seeding collection: " + e.message);
    }
  };

  // Edit action triggers
  const startEdit = (item: any) => {
    setEditingId(item.id);
    setShowForm(true);
    if (activeTab === "sermons") setSermonForm({ t: item.t, p: item.p, c: item.c, len: item.len, img: item.img || "community" });
    if (activeTab === "events") setEventForm({ date: item.date, name: item.name, place: item.place, tag: item.tag, featured: item.featured || false });
    if (activeTab === "resources") setResourceForm({ t: item.t, d: item.d, tag: item.tag, icon: item.icon || "BookOpen" });
    if (activeTab === "rhythms") setRhythmForm({ day: item.day, name: item.name, time: item.time });
    if (activeTab === "team") setTeamForm({ name: item.name, role: item.role });
    if (activeTab === "gallery") setGalleryForm({ thumb: item.thumb, full: item.full });
  };

  const resetForms = () => {
    setEditingId(null);
    setShowForm(false);
    setSermonForm({ t: "", p: "", c: "Faith", len: "", img: "community" });
    setEventForm({ date: "", name: "", place: "", tag: "Camp", featured: false });
    setResourceForm({ t: "", d: "", tag: "PDF", icon: "BookOpen" });
    setBookForm({ title: "", author: "" });
    setRhythmForm({ day: "Friday", name: "", time: "" });
    setTeamForm({ name: "", role: "" });
    setGalleryForm({ thumb: "", full: "" });
  };

  // Submit edits or adds
  const handleCrudSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "sermons") {
        if (editingId) {
          await updateFirestoreDoc("sermons", editingId, sermonForm);
          triggerResetSuccess("Sermon updated successfully!");
        } else {
          await addFirestoreDoc("sermons", sermonForm);
          triggerResetSuccess("Sermon added successfully!");
        }
      } else if (activeTab === "events") {
        if (editingId) {
          await updateFirestoreDoc("events", editingId, eventForm);
          triggerResetSuccess("Event updated successfully!");
        } else {
          await addFirestoreDoc("events", eventForm);
          triggerResetSuccess("Event added successfully!");
        }
      } else if (activeTab === "resources") {
        if (editingId) {
          await updateFirestoreDoc("resources", editingId, resourceForm);
          triggerResetSuccess("Resource updated successfully!");
        } else {
          await addFirestoreDoc("resources", resourceForm);
          triggerResetSuccess("Resource added successfully!");
        }
      } else if (activeTab === "rhythms") {
        if (editingId) {
          await updateFirestoreDoc("weekly_rhythm", editingId, rhythmForm);
          triggerResetSuccess("Rhythm updated successfully!");
        } else {
          await addFirestoreDoc("weekly_rhythm", rhythmForm);
          triggerResetSuccess("Rhythm added successfully!");
        }
      } else if (activeTab === "team") {
        if (editingId) {
          await updateFirestoreDoc("leadership_team", editingId, teamForm);
          triggerResetSuccess("Team member updated successfully!");
        } else {
          await addFirestoreDoc("leadership_team", teamForm);
          triggerResetSuccess("Team member added successfully!");
        }
      } else if (activeTab === "gallery") {
        if (editingId) {
          await updateFirestoreDoc("gallery", editingId, galleryForm);
          triggerResetSuccess("Gallery photo updated successfully!");
        } else {
          await addFirestoreDoc("gallery", galleryForm);
          triggerResetSuccess("Gallery photo added successfully!");
        }
      }
      resetForms();
    } catch (err: any) {
      alert("Error saving item: " + err.message);
    }
  };

  // Dedicated recommended book submit
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFirestoreDoc("recommended_books", bookForm);
      triggerResetSuccess("Recommended book added successfully!");
      setBookForm({ title: "", author: "" });
    } catch (err: any) {
      alert("Error adding book: " + err.message);
    }
  };

  // Delete handlers
  const handleDeleteItem = async (collectionName: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteFirestoreDoc(collectionName, id);
      triggerResetSuccess("Item deleted successfully!");
    } catch (err: any) {
      alert("Error deleting item: " + err.message);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <RefreshCw className="animate-spin text-primary size-8" />
          <p className="mt-4 text-xs text-muted-foreground uppercase tracking-widest">Checking Authentication...</p>
        </div>
      </Layout>
    );
  }

  // ANONYMOUS: Render Login Card
  if (!user) {
    return (
      <Layout>
        <Section eyebrow="Admin Access" title="Portal Sign In">
          <div className="max-w-md mx-auto">
            <div className="bg-card/40 backdrop-blur-md border border-border/10 p-8 rounded-2xl shadow-xl space-y-6">
              <div className="text-center">
                <h3 className="font-display text-2xl font-light">Youth on Fire Admin</h3>
                <p className="text-xs text-muted-foreground mt-2 tracking-wider">
                  {isRegistering ? "Create an administrator account" : "Log in to update content across the website"}
                </p>
              </div>

              {authError && (
                <div className="flex gap-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-lg">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{authError}</p>
                </div>
              )}

              {actionSuccess && (
                <div className="flex gap-3 bg-primary/10 border border-primary/20 text-primary text-xs p-3 rounded-lg">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{actionSuccess}</p>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@youthonfire.com"
                    className="w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-all text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-card/20 border border-border/40 hover:border-primary/40 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-all text-foreground text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/95 transition-all cursor-pointer"
                >
                  {isRegistering ? "Register Account" : "Access Portal"}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setAuthError("");
                  }}
                  className="text-xs text-primary/80 hover:text-primary underline cursor-pointer"
                >
                  {isRegistering ? "Already have an account? Sign In" : "Need an account? Register here"}
                </button>
              </div>
            </div>
          </div>
        </Section>
      </Layout>
    );
  }

  // AUTHENTICATED: Render Admin Panel Dashboard
  return (
    <Layout>
      <Section eyebrow="Admin Panel" title="Control Center">
        {/* Dashboard Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/10 pb-6 mb-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-semibold text-foreground/80">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg border border-border/30 hover:border-primary/30 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              View Site
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>

        {actionSuccess && (
          <div className="mb-6 flex gap-3 bg-primary/10 border border-primary/20 text-primary text-xs p-4 rounded-lg">
            <CheckCircle size={16} className="shrink-0 mt-0.5" />
            <p className="font-semibold">{actionSuccess}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Navigation List */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "sermons", label: "Sermons" },
              { id: "events", label: "Events" },
              { id: "resources", label: "Resources" },
              { id: "rhythms", label: "Weekly rhythms" },
              { id: "team", label: "Leadership" },
              { id: "gallery", label: "Photo Gallery" },
              { id: "registrations", label: "Registrations" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  resetForms();
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="pt-6 border-t border-border/10 mt-6 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-4">Database Bootstrap</p>
              <button
                onClick={() => handleSeedDefaults("sermons", defaultSermons)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Sermons <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("events", defaultEvents)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Events <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("resources", defaultResources)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Resources <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("recommended_books", defaultBooks)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Books <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("weekly_rhythm", defaultRhythms)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Rhythms <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("leadership_team", defaultTeam)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Leaders <RefreshCw size={10} />
              </button>
              <button
                onClick={() => handleSeedDefaults("gallery", defaultGallery)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/35 rounded hover:border-primary/45 cursor-pointer uppercase font-mono"
              >
                Seed Gallery <RefreshCw size={10} />
              </button>
            </div>
          </div>

          {/* Right Column details & Forms */}
          <div className="lg:col-span-9 space-y-6">
            {/* Show Edit or Create Form */}
            {showForm ? (
              <div className="bg-card border border-border/10 p-6 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b border-border/5 pb-4">
                  <h4 className="font-display text-xl">{editingId ? "Edit Item" : `Add New ${activeTab.toUpperCase()}`}</h4>
                  <button
                    onClick={resetForms}
                    className="text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer underline"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCrudSubmit} className="space-y-4">
                  {/* Sermons Form Fields */}
                  {activeTab === "sermons" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Title</label>
                          <input
                            type="text"
                            required
                            value={sermonForm.t}
                            onChange={(e) => setSermonForm({ ...sermonForm, t: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Preacher</label>
                          <input
                            type="text"
                            required
                            value={sermonForm.p}
                            onChange={(e) => setSermonForm({ ...sermonForm, p: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Category</label>
                          <select
                            value={sermonForm.c}
                            onChange={(e) => setSermonForm({ ...sermonForm, c: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          >
                            {["Faith", "Relationships", "Purpose", "Leadership", "Prayer"].map((cat) => (
                              <option key={cat} className="bg-card text-foreground">{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Duration (e.g. 42m)</label>
                          <input
                            type="text"
                            required
                            value={sermonForm.len}
                            onChange={(e) => setSermonForm({ ...sermonForm, len: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Image Preset or Custom URL</label>
                          <input
                            type="text"
                            required
                            value={sermonForm.img}
                            onChange={(e) => setSermonForm({ ...sermonForm, img: e.target.value })}
                            placeholder="community | word | event | https://url"
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Events Form Fields */}
                  {activeTab === "events" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Event Name</label>
                          <input
                            type="text"
                            required
                            value={eventForm.name}
                            onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Location/Place</label>
                          <input
                            type="text"
                            required
                            value={eventForm.place}
                            onChange={(e) => setEventForm({ ...eventForm, place: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 items-center">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Date & Time</label>
                          <input
                            type="datetime-local"
                            required
                            value={eventForm.date ? eventForm.date.slice(0, 16) : ""}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Tag</label>
                          <select
                            value={eventForm.tag}
                            onChange={(e) => setEventForm({ ...eventForm, tag: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          >
                            {["Camp", "Prayer", "Outreach", "Worship"].map((tag) => (
                              <option key={tag} className="bg-card text-foreground">{tag}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center mt-6">
                          <input
                            type="checkbox"
                            id="featured-checkbox"
                            checked={eventForm.featured}
                            onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                            className="mr-3 size-4 rounded accent-primary border border-border"
                          />
                          <label htmlFor="featured-checkbox" className="text-xs font-semibold text-foreground select-none cursor-pointer">Featured Event (Timer Focus)</label>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Resources Form Fields */}
                  {activeTab === "resources" && (
                    <>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Resource Title</label>
                          <input
                            type="text"
                            required
                            value={resourceForm.t}
                            onChange={(e) => setResourceForm({ ...resourceForm, t: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Tag/Format</label>
                          <input
                            type="text"
                            required
                            value={resourceForm.tag}
                            onChange={(e) => setResourceForm({ ...resourceForm, tag: e.target.value })}
                            placeholder="PDF | Read | Plan | Path"
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Description</label>
                          <input
                            type="text"
                            required
                            value={resourceForm.d}
                            onChange={(e) => setResourceForm({ ...resourceForm, d: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Lucide Icon name</label>
                          <select
                            value={resourceForm.icon}
                            onChange={(e) => setResourceForm({ ...resourceForm, icon: e.target.value })}
                            className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                          >
                            {["BookOpen", "FileText", "Flame", "Compass"].map((i) => (
                              <option key={i} className="bg-card text-foreground">{i}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Weekly Rhythms Fields */}
                  {activeTab === "rhythms" && (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Day</label>
                        <input
                          type="text"
                          required
                          value={rhythmForm.day}
                          onChange={(e) => setRhythmForm({ ...rhythmForm, day: e.target.value })}
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Activity Name</label>
                        <input
                          type="text"
                          required
                          value={rhythmForm.name}
                          onChange={(e) => setRhythmForm({ ...rhythmForm, name: e.target.value })}
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Time Details</label>
                        <input
                          type="text"
                          required
                          value={rhythmForm.time}
                          onChange={(e) => setRhythmForm({ ...rhythmForm, time: e.target.value })}
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Leadership Team Fields */}
                  {activeTab === "team" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={teamForm.name}
                          onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Role/Position</label>
                        <input
                          type="text"
                          required
                          value={teamForm.role}
                          onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Photo Gallery Fields */}
                  {activeTab === "gallery" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Thumbnail Path/URL</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.thumb}
                          onChange={(e) => setGalleryForm({ ...galleryForm, thumb: e.target.value })}
                          placeholder="/gallery/g1.jpg | https://url"
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">High-Res / Full-Size URL</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.full}
                          onChange={(e) => setGalleryForm({ ...galleryForm, full: e.target.value })}
                          placeholder="/gallery/g1_full.jpg | https://url"
                          className="w-full bg-card/25 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-end pt-4 border-t border-border/5">
                    <button
                      type="button"
                      onClick={resetForms}
                      className="px-4 py-2 rounded-lg border border-border/30 text-xs uppercase tracking-wider font-semibold hover:border-foreground/20 text-muted-foreground transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-primary/95 transition-all cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              activeTab !== "registrations" ? (
                <div className="flex justify-between items-center bg-card/30 border border-border/10 p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground">Manage your list of items or add a new record.</p>
                  {activeTab !== "resources" ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/95 transition-all cursor-pointer"
                    >
                      <Plus size={14} /> Add Item
                    </button>
                  ) : (
                    <div className="text-xs text-muted-foreground">Add resources below (books have a separate form)</div>
                  )}
                </div>
              ) : (
                <div className="bg-card/30 border border-border/10 p-4 rounded-xl text-xs text-muted-foreground">
                  User registrations submitted on the Contact page. Database items update in real time.
                </div>
              )
            )}

            {/* List & Edit existing items in the current collection */}
            <div className="bg-card/40 backdrop-blur border border-border/10 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border/10 bg-card/20 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Current Entries</h4>
                <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">
                  {activeTab === "sermons" && `${sermons.length} sermons`}
                  {activeTab === "events" && `${events.length} events`}
                  {activeTab === "resources" && `${resources.length} resources, ${books.length} books`}
                  {activeTab === "rhythms" && `${rhythms.length} rhythm nodes`}
                  {activeTab === "team" && `${team.length} leaders`}
                  {activeTab === "gallery" && `${gallery.length} photos`}
                  {activeTab === "registrations" && `${registrations.length} registrations`}
                </span>
              </div>

              {/* SERMONS LISTING */}
              {activeTab === "sermons" && (
                <div className="divide-y divide-border/5">
                  {sermons.map((s) => (
                    <div key={s.id || s.t} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{s.t}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{s.p} · {s.c} · {s.len} · {s.img}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(s)} className="p-2 border border-border/30 hover:border-primary/40 rounded text-foreground/70 hover:text-primary transition-all cursor-pointer"><Edit2 size={12} /></button>
                        {s.id && (
                          <button onClick={() => handleDeleteItem("sermons", s.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EVENTS LISTING */}
              {activeTab === "events" && (
                <div className="divide-y divide-border/5">
                  {events.map((e) => (
                    <div key={e.id || e.name} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {e.name} {e.featured && <span className="ml-2 text-[9px] uppercase tracking-widest bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded">Featured</span>}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{new Date(e.date).toLocaleString()} · {e.place} · {e.tag}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(e)} className="p-2 border border-border/30 hover:border-primary/40 rounded text-foreground/70 hover:text-primary transition-all cursor-pointer"><Edit2 size={12} /></button>
                        {e.id && (
                          <button onClick={() => handleDeleteItem("events", e.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RESOURCES LISTING */}
              {activeTab === "resources" && (
                <div className="divide-y divide-border/5">
                  <div className="p-4 bg-muted/20 text-xs font-bold uppercase tracking-wider border-b border-border/10 text-muted-foreground flex justify-between items-center">
                    <span>Downloads</span>
                    <button onClick={() => { resetForms(); setShowForm(true); }} className="text-[10px] text-primary hover:underline cursor-pointer uppercase font-bold">Add Download</button>
                  </div>
                  {resources.map((r) => (
                    <div key={r.id || r.t} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{r.t}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{r.tag} · {r.icon} · {r.d}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(r)} className="p-2 border border-border/30 hover:border-primary/40 rounded text-foreground/70 hover:text-primary transition-all cursor-pointer"><Edit2 size={12} /></button>
                        {r.id && (
                          <button onClick={() => handleDeleteItem("resources", r.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-muted/20 text-xs font-bold uppercase tracking-wider border-t border-b border-border/10 text-muted-foreground">Recommended Books</div>
                  
                  {/* Add book form inline */}
                  <form onSubmit={handleAddBook} className="p-4 bg-card/10 border-b border-border/5 grid md:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">Book Title</label>
                      <input
                        type="text"
                        required
                        value={bookForm.title}
                        onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                        className="w-full bg-card/25 border border-border/40 rounded px-2.5 py-1.5 text-xs text-foreground focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">Author</label>
                      <input
                        type="text"
                        required
                        value={bookForm.author}
                        onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                        className="w-full bg-card/25 border border-border/40 rounded px-2.5 py-1.5 text-xs text-foreground focus:border-primary outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground py-1.5 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-primary/95 cursor-pointer h-[34px]"
                    >
                      Add Book
                    </button>
                  </form>

                  {books.map((b) => (
                    <div key={b.id || b.title} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{b.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Author: {b.author}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {b.id && (
                          <button onClick={() => handleDeleteItem("recommended_books", b.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RHYTHM LISTING */}
              {activeTab === "rhythms" && (
                <div className="divide-y divide-border/5">
                  {rhythms.map((r) => (
                    <div key={r.id || r.day} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{r.day} — {r.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Gathering Time: {r.time}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(r)} className="p-2 border border-border/30 hover:border-primary/40 rounded text-foreground/70 hover:text-primary transition-all cursor-pointer"><Edit2 size={12} /></button>
                        {r.id && (
                          <button onClick={() => handleDeleteItem("weekly_rhythm", r.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LEADERSHIP LISTING */}
              {activeTab === "team" && (
                <div className="divide-y divide-border/5">
                  {team.map((t) => (
                    <div key={t.id || t.name} className="p-4 flex items-center justify-between hover:bg-card/10 transition-all gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Role: {t.role}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(t)} className="p-2 border border-border/30 hover:border-primary/40 rounded text-foreground/70 hover:text-primary transition-all cursor-pointer"><Edit2 size={12} /></button>
                        {t.id && (
                          <button onClick={() => handleDeleteItem("leadership_team", t.id)} className="p-2 border border-border/30 hover:border-destructive/40 rounded text-foreground/70 hover:text-destructive transition-all cursor-pointer"><Trash2 size={12} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* GALLERY LISTING */}
              {activeTab === "gallery" && (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                  {gallery.map((tile, i) => (
                    <div key={tile.id || i} className="group relative border border-border/10 rounded-lg overflow-hidden bg-card aspect-square">
                      <img src={tile.thumb} alt="" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all">
                        <button
                          onClick={() => startEdit(tile)}
                          className="bg-primary/95 text-primary-foreground p-2 rounded hover:scale-105 transition-all cursor-pointer"
                          title="Edit link"
                        >
                          <Edit2 size={12} />
                        </button>
                        {tile.id && (
                          <button
                            onClick={() => handleDeleteItem("gallery", tile.id)}
                            className="bg-destructive/95 text-destructive-foreground p-2 rounded hover:scale-105 transition-all cursor-pointer"
                            title="Delete picture"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* REGISTRATIONS LISTING */}
              {activeTab === "registrations" && (
                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto bg-card/20">
                  {registrations.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-10">No registrations found in the database.</p>
                  ) : (
                    registrations.map((reg) => (
                      <div key={reg.id} className="bg-card/65 border border-border/10 p-5 rounded-xl space-y-4 hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start border-b border-border/5 pb-2">
                          <div>
                            <h5 className="font-semibold text-foreground text-base">{reg.name}</h5>
                            <p className="text-[10px] text-primary/80 uppercase tracking-wider font-mono mt-0.5">
                              {reg.ageRange ? `${reg.ageRange} years` : "Age N/A"} · {reg.gender || "Gender N/A"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteItem("registrations", reg.id)}
                            className="text-muted-foreground hover:text-destructive p-1 border border-border/20 hover:border-destructive/30 rounded transition-all cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-xs">
                          {/* Contact Details */}
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-muted-foreground">
                              <Mail size={12} className="text-primary shrink-0" />
                              <a href={`mailto:${reg.email}`} className="hover:underline hover:text-foreground">{reg.email}</a>
                            </p>
                            <p className="flex items-center gap-2 text-muted-foreground">
                              <Phone size={12} className="text-primary shrink-0" />
                              <a href={`tel:${reg.phone}`} className="hover:underline hover:text-foreground">{reg.phone}</a>
                            </p>
                            <p className="flex items-center gap-2 text-muted-foreground">
                              <Clock size={12} className="text-primary shrink-0" />
                              <span>Registered: {reg.createdAt ? new Date(reg.createdAt).toLocaleString() : "Date N/A"}</span>
                            </p>
                          </div>

                          {/* Attendance Info */}
                          <div className="space-y-2 border-t md:border-t-0 md:border-l border-border/10 pt-2 md:pt-0 md:pl-4">
                            <p className="text-muted-foreground">
                              First Time? <strong className="text-foreground">{reg.isFirstTime || "Unknown"}</strong>
                            </p>
                            <p className="text-muted-foreground flex items-center gap-1.5 flex-wrap">
                              <MapPin size={12} className="text-primary shrink-0" />
                              Transport Required? <strong className="text-foreground">{reg.requireTransportation || "No"}</strong>
                              {reg.pickupLocation && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">{reg.pickupLocation}</span>}
                            </p>
                            <p className="text-muted-foreground flex items-center gap-1.5">
                              <Users size={12} className="text-primary shrink-0" />
                              Bringing Friends? <strong className="text-foreground">{reg.withFriends || "No"}</strong>
                              {reg.friendCount && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">{reg.friendCount} friend(s)</span>}
                            </p>
                          </div>
                        </div>

                        {/* Prayer / Expectations text block */}
                        {reg.expectations && (
                          <div className="bg-card/40 border border-border/5 p-3 rounded-lg text-xs leading-relaxed text-foreground/80 space-y-1">
                            <p className="text-[10px] uppercase tracking-wider text-primary/80 font-bold font-mono">Prayer expectations / Requests:</p>
                            <p>{reg.expectations}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
