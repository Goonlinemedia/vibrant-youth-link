import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  User,
  Menu,
  X,
  Flame,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth on Fire — A generation set ablaze" },
      {
        name: "description",
        content:
          "A movement of young people pursuing Christ together — worship, discipleship, prayer and mission.",
      },
    ],
  }),
  component: YouthHero,
});

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Sermons", to: "/sermons" },
  { label: "Resources", to: "/resources" },
  { label: "Gallery", to: "/gallery" },
];

function YouthHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="cinematic-root relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />

      {/* Bottom blur overlay (mask, no gradient darkening) */}
      <div className="cinematic-blur-overlay pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl" />

      {/* Content shell */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
          <Link
            to="/"
            className="animate-blur-fade-up h-8 md:h-10 flex items-center gap-2 text-lg md:text-xl font-bold tracking-[0.2em]"
            style={{ animationDelay: "0ms" }}
          >
            <Flame size={18} className="text-orange-400" />
            YOUTH ON FIRE
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                className="animate-blur-fade-up text-sm transition-colors hover:text-gray-300"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="liquid-glass animate-blur-fade-up hidden sm:inline-flex items-center gap-2 rounded-full px-4 md:px-6 py-2 text-sm text-white"
              style={{ animationDelay: "350ms" }}
            >
              <Search size={18} />
              <span>Contact</span>
            </Link>
            <Link
              to="/contact"
              className="liquid-glass animate-blur-fade-up hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full text-white"
              style={{ animationDelay: "400ms" }}
              aria-label="Profile"
            >
              <User size={18} />
            </Link>
            <button
              className="liquid-glass animate-blur-fade-up lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white relative"
              style={{ animationDelay: "350ms" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                  menuOpen
                    ? "opacity-0 rotate-180 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <Menu size={18} />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                  menuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-180 scale-50"
                }`}
              >
                <X size={18} />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-[72px] z-40 mx-4 sm:mx-6 rounded-2xl border-t border-b border-gray-800 bg-gray-900/95 backdrop-blur-lg shadow-2xl transition-all duration-500 ease-out ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-4">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-500 ease-out ${
                  menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-800 flex items-center gap-3">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="liquid-glass flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm"
              >
                <Search size={18} />
                <span>Contact</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="liquid-glass inline-flex items-center justify-center w-10 h-10 rounded-full"
                aria-label="Profile"
              >
                <User size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
            <div className="flex-1">
              <div
                className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm"
                style={{ animationDelay: "300ms" }}
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <Flame size={16} className="fill-orange-400 text-orange-400 sm:w-5 sm:h-5" />
                  Youth on Fire Ministry
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  Fridays · 6:30pm
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} className="sm:w-5 sm:h-5" />
                  Carriers Camp · Mar 14
                </span>
              </div>

              <h1
                className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6"
                style={{ animationDelay: "400ms", letterSpacing: "-0.04em" }}
              >
                A generation set ablaze by the Spirit.
              </h1>

              <p
                className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-12 max-w-2xl"
                style={{ animationDelay: "500ms" }}
              >
                We are a movement of young people pursuing Christ with all we are —
                together in worship, discipleship, prayer and mission.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="animate-blur-fade-up inline-flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors"
                  style={{ animationDelay: "600ms" }}
                >
                  <Play size={18} className="fill-black" />
                  Join the Community
                </Link>
                <Link
                  to="/sermons"
                  className="liquid-glass animate-blur-fade-up inline-flex items-center rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-white"
                  style={{ animationDelay: "700ms" }}
                >
                  Watch Sermons
                </Link>
              </div>
            </div>

            <div className="flex gap-3 self-start md:self-end">
              <Link
                to="/events"
                className="liquid-glass animate-blur-fade-up inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm text-white"
                style={{ animationDelay: "800ms" }}
              >
                <ChevronLeft size={18} />
                Events
              </Link>
              <Link
                to="/resources"
                className="liquid-glass animate-blur-fade-up inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm text-white"
                style={{ animationDelay: "900ms" }}
              >
                Resources
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
