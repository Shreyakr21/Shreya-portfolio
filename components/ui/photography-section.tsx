"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ── Replace these with your own photos ───────────────────────────
const photos = [
  { src: "https://i.imgur.com/bD0EDwg.jpeg", caption: "the path" },
  { src: "https://i.imgur.com/IoVrMBI.jpeg", caption: "between heaven & history" },
  { src: "https://i.imgur.com/8xYyFK8.jpeg", caption: "golden hour" },
  { src: "https://i.imgur.com/mDVr655.jpeg", caption: "under the canopy" },
  { src: "https://i.imgur.com/xCK8uV7.jpeg", caption: "low tide thoughts" },
  { src: "https://i.imgur.com/NabqoDO.jpeg", caption: "fading light" },
  { src: "https://i.imgur.com/90EDRYf.jpeg", caption: "somewhere quiet" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=85", caption: "wildflowers" },
  { src: "https://i.imgur.com/hdhMJfS.jpeg", caption: "in passing" },
];

export default function PhotographySection() {
  const [selected, setSelected] = useState<{ src: string; caption: string } | null>(null);

  return (
    <section id="photography" className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <p className="section-label">Photography</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "var(--foreground)" }}>
          Moments I&apos;ve kept
        </h2>
        <p className="font-body text-base mb-14 max-w-lg" style={{ color: "var(--muted)" }}>
          Photography taught me to slow down and notice. These are some frames I&apos;m glad I caught.
        </p>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => setSelected(photo)}
              whileHover={{ scale: 1.02 }}
            >
              <img src={photo.src} alt={photo.caption}
                className="w-full h-auto object-cover rounded-xl transition-all duration-500 group-hover:brightness-90" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
                <span className="font-mono-custom text-xs text-white/90">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <img src={selected.src} alt={selected.caption}
                className="w-full h-auto rounded-2xl shadow-2xl" />
              <p className="font-mono-custom text-xs text-white/60 mt-3 text-center">{selected.caption}</p>
              <button onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 h-8 w-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <X className="h-4 w-4" style={{ color: "var(--foreground)" }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
