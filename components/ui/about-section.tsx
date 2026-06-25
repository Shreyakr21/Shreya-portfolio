"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DottedSurface } from "./dotted-surface";

// ── Hover Preview ────────────────────────────────────────────────
const previewData: Record<string, { image: string; title: string; subtitle: string }> = {
  photography: {
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=400&q=80",
    title: "Photography",
    subtitle: "Capturing light and moments",
  },
  music: {
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    title: "Music",
    subtitle: "Always something on the playlist",
  },
  films: {
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
    title: "Films",
    subtitle: "Tracking every watch, every feeling",
  },
  engineering: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    title: "Engineering",
    subtitle: "3 years of building and learning",
  },
};

function HoverLink({
  previewKey, children, onHoverStart, onHoverMove, onHoverEnd,
}: {
  previewKey: string;
  children: React.ReactNode;
  onHoverStart: (key: string, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
}) {
  return (
    <span className="hover-link"
      onMouseEnter={e => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >{children}</span>
  );
}

// ── Quotes Carousel ───────────────────────────────────────────────
const quotes = [
  {
    quote: "The camera is an instrument that teaches people how to see without a camera.",
    name: "Dorothea Lange",
    designation: "Documentary Photographer",
    src: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400&q=80",
  },
  {
    quote: "One good thing about music, when it hits you, you feel no pain.",
    name: "Bob Marley",
    designation: "Musician & Cultural Icon",
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
  },
  {
    quote: "The details are not the details. They make the design.",
    name: "Charles Eames",
    designation: "Designer & Architect",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    name: "John Johnson",
    designation: "Software Engineering Principle",
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80",
  },
  {
    quote: "Cinema is a mirror by which we often see ourselves.",
    name: "Martin Scorsese",
    designation: "Film Director",
    src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80",
  },
];

function QuotesCarousel() {
  const [active, setActive] = useState(0);
  const handleNext = useCallback(() => setActive(p => (p + 1) % quotes.length), []);
  const handlePrev = () => setActive(p => (p - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const randomRotate = () => `${Math.floor(Math.random() * 12) - 6}deg`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      {/* Image stack */}
      <div className="flex items-center justify-center">
        <div className="relative h-64 w-full max-w-xs">
          <AnimatePresence>
            {quotes.map((q, index) => (
              <motion.div key={q.src}
                initial={{ opacity: 0, scale: 0.9, y: 40, rotate: randomRotate() }}
                animate={{
                  opacity: index === active ? 1 : 0.4,
                  scale: index === active ? 1 : 0.88,
                  y: index === active ? 0 : 16,
                  zIndex: index === active ? quotes.length : quotes.length - Math.abs(index - active),
                  rotate: index === active ? "0deg" : randomRotate(),
                }}
                exit={{ opacity: 0, scale: 0.9, y: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <img src={q.src} alt={q.name}
                  className="h-full w-full rounded-2xl object-cover shadow-xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Text + controls */}
      <div className="flex flex-col justify-center">
        <p className="section-label">Things I believe in</p>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
          >
            <p className="font-display text-xl md:text-2xl font-medium italic leading-relaxed mb-6"
              style={{ color: "var(--foreground)" }}>
              &ldquo;{quotes[active].quote}&rdquo;
            </p>
            <p className="font-body font-semibold text-sm" style={{ color: "var(--foreground)" }}>
              — {quotes[active].name}
            </p>
            <p className="font-mono-custom text-xs mt-1" style={{ color: "var(--muted)" }}>
              {quotes[active].designation}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-3 mt-8">
          {[handlePrev, handleNext].map((fn, i) => (
            <button key={i} onClick={fn}
              className="group flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
              {i === 0
                ? <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" style={{ color: "var(--foreground)" }} />
                : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--foreground)" }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About Section ─────────────────────────────────────────────────
export default function AboutSection() {
  const [activePreview, setActivePreview] = useState<{ image: string; title: string; subtitle: string } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e: React.MouseEvent) => {
    const cardWidth = 260, cardHeight = 220, offsetY = 20;
    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;
    if (x + cardWidth > window.innerWidth - 20) x = window.innerWidth - cardWidth - 20;
    if (x < 20) x = 20;
    if (y < 20) y = e.clientY + offsetY;
    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback((key: string, e: React.MouseEvent) => {
    setActivePreview(previewData[key]);
    setIsVisible(true);
    updatePosition(e);
  }, [updatePosition]);

  const handleHoverMove = useCallback((e: React.MouseEvent) => {
    if (isVisible) updatePosition(e);
  }, [isVisible, updatePosition]);

  const handleHoverEnd = useCallback(() => setIsVisible(false), []);

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      {/* Dotted surface background */}
      <DottedSurface className="opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
          {/* Left — text */}
          <div>
            <p className="section-label">About me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8"
              style={{ color: "var(--foreground)" }}>
              Engineer,<br />
              <span style={{ color: "var(--accent)" }}>creator</span>,<br />
              curious mind.
            </h2>
            <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              <p>
                I&apos;m Shreya, a final-year engineering student who found that the best ideas live at the intersection of code and curiosity. I&apos;ve spent 3 years building{" "}
                <HoverLink previewKey="engineering" onHoverStart={handleHoverStart} onHoverMove={handleHoverMove} onHoverEnd={handleHoverEnd}>
                  projects that actually work
                </HoverLink>
                {" "}— and learning just as much from the ones that didn&apos;t.
              </p>
              <p>
                Outside of screens, I chase light with a camera. I believe{" "}
                <HoverLink previewKey="photography" onHoverStart={handleHoverStart} onHoverMove={handleHoverMove} onHoverEnd={handleHoverEnd}>
                  photography
                </HoverLink>
                {" "}taught me to see — not just look. I keep a running log of every film and song that moves me, because{" "}
                <HoverLink previewKey="music" onHoverStart={handleHoverStart} onHoverMove={handleHoverMove} onHoverEnd={handleHoverEnd}>
                  music
                </HoverLink>
                {" "}and{" "}
                <HoverLink previewKey="films" onHoverStart={handleHoverStart} onHoverMove={handleHoverMove} onHoverEnd={handleHoverEnd}>
                  films
                </HoverLink>
                {" "}are just stories told in different languages.
              </p>
            </div>
          </div>

          {/* Right — quick facts */}
          <div className="space-y-4 pt-2 md:pt-14">
            {[
              { label: "Currently", value: "Final year, B.Tech" },
              { label: "Based in", value: "Bengaluru, India" },
              { label: "Looking for", value: "Internships & collaborations" },
              { label: "Interests", value: "Photography, Music, Cinema, Code" },
              { label: "Learning", value: "New things, always" },
            ].map(item => (
              <div key={item.label} className="flex gap-6 items-baseline py-3 border-b"
                style={{ borderColor: "var(--border)" }}>
                <span className="font-mono-custom text-xs tracking-widest uppercase w-28 flex-shrink-0"
                  style={{ color: "var(--accent)" }}>{item.label}</span>
                <span className="font-body text-sm" style={{ color: "var(--foreground)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quotes carousel */}
        <QuotesCarousel />
      </div>

      {/* Hover preview card */}
      {activePreview && (
        <div
          className={`fixed pointer-events-none z-50 transition-all duration-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ left: position.x, top: position.y }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", width: 260 }}>
            <img src={activePreview.image} alt={activePreview.title}
              className="w-full h-36 object-cover" />
            <div className="p-3">
              <p className="font-body font-semibold text-sm" style={{ color: "var(--foreground)" }}>{activePreview.title}</p>
              <p className="font-mono-custom text-xs mt-0.5" style={{ color: "var(--muted)" }}>{activePreview.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
