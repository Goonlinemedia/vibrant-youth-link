import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, FadeIn } from "@/components/Layout";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultGallery } from "@/lib/firebase";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Youth on Fire Ministries" },
      { name: "description", content: "Moments from worship nights, camps and outreach." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const tiles = useFirestoreCollection("gallery", defaultGallery);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  return (
    <>
      <Layout>
        <Section eyebrow="Gallery" title="Moments from the fire.">
          {/* We use the same tiles-grid grid layout as the homepage to keep sizes matching */}
          <div className="tiles-grid gap-0">
            {tiles.map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.02 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                onClick={() => setActiveImageIndex(i)}
              >
                <img
                  src={tile.thumb}
                  alt={`Youth gathering moment ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </Section>
      </Layout>

      {/* Lightbox Modal overlay with next/prev controls */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md transition-all duration-500"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(null);
            }}
          >
            <X size={24} />
          </button>

          {/* Left navigation arrow */}
          <button 
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + tiles.length) % tiles.length : null));
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Lightbox Image */}
          <div 
            className="relative max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={tiles[activeImageIndex].full} 
              alt={`Youth gathering high-res preview`} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-xs text-white/50 tracking-widest uppercase font-mono">
              Image {activeImageIndex + 1} of {tiles.length}
            </p>
          </div>

          {/* Right navigation arrow */}
          <button 
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % tiles.length : null));
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
