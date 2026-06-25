"use client";
import { motion } from "framer-motion";
import { Music, Film, BookOpen, Headphones } from "lucide-react";

// ── Replace with your actual favourites ──────────────────────────
const recentMusic = [
  { title: "Blinding Lights", artist: "The Weeknd", genre: "Synth-pop" },
  { title: "Creepin'", artist: "Metro Boomin", genre: "Hip-hop" },
  { title: "Flowers", artist: "Miley Cyrus", genre: "Pop" },
  { title: "As It Was", artist: "Harry Styles", genre: "Indie pop" },
];

const recentFilms = [
  { title: "Interstellar", year: "2014", rating: "★★★★★" },
  { title: "The Social Network", year: "2010", rating: "★★★★★" },
  { title: "Parasite", year: "2019", rating: "★★★★★" },
  { title: "Everything Everywhere", year: "2022", rating: "★★★★" },
];

const currentlyLearning = [
  { topic: "Next.js & React ecosystem", status: "ongoing" },
  { topic: "System Design basics", status: "ongoing" },
  { topic: "DSA for placements", status: "ongoing" },
  { topic: "Photography composition", status: "ongoing" },
];

export default function InterestsSection() {
  return (
    <section id="interests" className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="section-label">Beyond code</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "var(--foreground)" }}>
          What I&apos;m into
        </h2>
        <p className="font-body text-base mb-16 max-w-lg" style={{ color: "var(--muted)" }}>
          The things that fill the hours when I&apos;m not in front of a compiler.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Music card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-2xl p-6" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--accent-soft)" }}>
                <Music className="h-4 w-4" style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-display text-lg font-bold" style={{ color: "var(--foreground)" }}>
                On repeat
              </h3>
            </div>
            <div className="space-y-3">
              {recentMusic.map((track, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}>
                  <div className="h-8 w-8 rounded-md flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--background)" }}>
                    <Headphones className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>{track.title}</p>
                    <p className="font-mono-custom text-xs truncate" style={{ color: "var(--muted)" }}>{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono-custom text-xs mt-4" style={{ color: "var(--muted)" }}>
              *Litzomanic
            </p>
          </motion.div>

          {/* Films card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--accent-soft)" }}>
                <Film className="h-4 w-4" style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-display text-lg font-bold" style={{ color: "var(--foreground)" }}>
                Recently watched
              </h3>
            </div>
            <div className="space-y-3">
              {recentFilms.map((film, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}>
                  <div>
                    <p className="font-body text-xs font-medium" style={{ color: "var(--foreground)" }}>{film.title}</p>
                    <p className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>{film.year}</p>
                  </div>
                  <span className="font-mono-custom text-xs" style={{ color: "var(--accent)" }}>{film.rating}</span>
                </div>
              ))}
            </div>
            <p className="font-mono-custom text-xs mt-4" style={{ color: "var(--muted)" }}>
              *Just walking throughh!!
            </p>
          </motion.div>

          {/* Currently learning card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--accent-soft)" }}>
                <BookOpen className="h-4 w-4" style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-display text-lg font-bold" style={{ color: "var(--foreground)" }}>
                Learning now
              </h3>
            </div>
            <div className="space-y-3">
              {currentlyLearning.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}>
                  <div className="h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: "var(--accent)" }} />
                  <div>
                    <p className="font-body text-xs font-medium" style={{ color: "var(--foreground)" }}>{item.topic}</p>
                    <span className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
