"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { DottedSurface } from "./dotted-surface";

type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 16;
const MAX_SCROLL = 3000;

// Photo cards — your photography
const PHOTO_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&q=80",
];

// Code card color line patterns — teal/dark green abstract code look
const CODE_PATTERNS = [
  [{ w: "85%", c: "#2dd4aa" }, { w: "60%", c: "#1a4a3a" }, { w: "75%", c: "#6b9e94" }, { w: "50%", c: "#2dd4aa" }],
  [{ w: "70%", c: "#6b9e94" }, { w: "90%", c: "#2dd4aa" }, { w: "45%", c: "#1a4a3a" }, { w: "65%", c: "#6b9e94" }],
  [{ w: "55%", c: "#2dd4aa" }, { w: "80%", c: "#6b9e94" }, { w: "70%", c: "#2dd4aa" }, { w: "40%", c: "#1a4a3a" }],
  [{ w: "90%", c: "#1a4a3a" }, { w: "55%", c: "#2dd4aa" }, { w: "80%", c: "#6b9e94" }, { w: "60%", c: "#2dd4aa" }],
  [{ w: "65%", c: "#2dd4aa" }, { w: "75%", c: "#1a4a3a" }, { w: "55%", c: "#6b9e94" }, { w: "85%", c: "#2dd4aa" }],
  [{ w: "80%", c: "#6b9e94" }, { w: "50%", c: "#2dd4aa" }, { w: "90%", c: "#1a4a3a" }, { w: "70%", c: "#6b9e94" }],
  [{ w: "60%", c: "#2dd4aa" }, { w: "85%", c: "#6b9e94" }, { w: "65%", c: "#2dd4aa" }, { w: "75%", c: "#1a4a3a" }],
  [{ w: "75%", c: "#1a4a3a" }, { w: "65%", c: "#2dd4aa" }, { w: "80%", c: "#6b9e94" }, { w: "55%", c: "#2dd4aa" }],
];

// Build alternating array: even = photo, odd = code
const IMAGES = Array.from({ length: 16 }, (_, i) => i % 2 === 0
  ? { type: "photo", src: PHOTO_IMAGES[Math.floor(i / 2)] }
  : { type: "code", pattern: CODE_PATTERNS[Math.floor(i / 2)] }
);

const lerp = (s: number, e: number, t: number) => s * (1 - t) + e * t;

interface FlipCardProps {
  item: typeof IMAGES[0];
  index: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

function FlipCard({ item, index, target }: FlipCardProps) {
  const isPhoto = item.type === "photo";

  const frontFace = isPhoto ? (
    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
      style={{ backfaceVisibility: "hidden", backgroundColor: "#2d4a42" }}>
      <img src={(item as any).src} alt={`photo-${index}`} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
    </div>
  ) : (
    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col justify-center px-3 gap-2"
      style={{ backfaceVisibility: "hidden", backgroundColor: "#0d1f1a", border: "1px solid #1e4d3a" }}>
      {(item as any).pattern.map((line: { w: string; c: string }, i: number) => (
        <div key={i} style={{ height: 3, borderRadius: 2, backgroundColor: line.c, width: line.w, opacity: 0.9 }} />
      ))}
    </div>
  );

  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{ position: "absolute", width: IMG_WIDTH, height: IMG_HEIGHT, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {frontFace}
        {/* Back face — same for both */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: "#1a3330", border: "1px solid #2dd4aa33" }}>
          <p className="font-mono-custom text-xs tracking-widest uppercase" style={{ color: "#2dd4aa" }}>
            {isPhoto ? "photo" : "code"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 80);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 400);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scatterPositions = useMemo(() => IMAGES.map(() => ({
    x: (Math.random() - 0.5) * 1400,
    y: (Math.random() - 0.5) * 900,
    rotation: (Math.random() - 0.5) * 180,
    scale: 0.5, opacity: 0,
  })), []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  return (
    <section className="relative w-full h-screen overflow-hidden hero-section">
      {/* Styles — light mode fixes only, dark mode untouched */}
      <style>{`
        .hero-section { background: #080d0c; }
        html:not(.dark) .hero-section { background: #607d78; }

        .hero-glow { background: radial-gradient(ellipse at 60% 40%, rgba(20,120,95,0.35) 0%, #080d0c 70%); }
        html:not(.dark) .hero-glow { background: radial-gradient(ellipse at 50% 30%, rgba(10,40,35,0.15) 0%, transparent 60%); }

        .hero-fade {
          background: linear-gradient(to bottom, transparent 0%, transparent 40%, #080d0c 100%);
        }
        html:not(.dark) .hero-fade {
          background: linear-gradient(to bottom,
            transparent 0%,
            transparent 55%,
            rgba(96,125,120,0.08) 65%,
            rgba(96,125,120,0.22) 74%,
            rgba(160,190,185,0.45) 82%,
            rgba(220,228,224,0.72) 91%,
            #f8f6f1 100%
          );
        }

        .hero-nav-link { color: #6b9e94; }
        html:not(.dark) .hero-nav-link { color: #0a0a0a !important; }
      `}</style>

      {/* Inject nav link dark color in light mode via global style */}
      <style>{`
        html:not(.dark) nav a { color: #0a0a0a !important; }
        html:not(.dark) nav a:hover { opacity: 0.6; }
      `}</style>

      {/* Radial glow overlay */}
      <div className="absolute inset-0 z-0 hero-glow" />

      {/* Dotted surface */}
      <DottedSurface className="opacity-70" />

      {/* Smooth gradient fade at bottom — no hard line */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 hero-fade" style={{ height: "55%" }} />

      <div ref={containerRef} className="relative w-full h-full z-20">
        <div className="flex h-full w-full flex-col items-center justify-center">

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={introPhase === "circle"
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none px-6"
          >
            <p className="section-label mb-4">Final Year · Engineering</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
              style={{ color: "var(--foreground)" }}>
              Shreya<br />
              <span style={{ color: "var(--accent)" }}>Kumari</span>
            </h1>
            <p className="font-body text-base md:text-lg max-w-md leading-relaxed"
              style={{ color: "var(--muted)" }}>
              I build things, photograph moments,<br className="hidden md:block" /> and track everything in between.
            </p>
            <motion.p
              animate={introPhase === "circle" && morphValue < 0.3 ? { opacity: 0.5 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 font-mono-custom text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              scroll to explore
            </motion.p>
          </motion.div>

          {/* Image cards */}
          <div className="relative flex items-center justify-center w-full h-full">
            {IMAGES.slice(0, TOTAL_IMAGES).map((item, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const spacing = 68;
                target = { x: i * spacing - (TOTAL_IMAGES * spacing) / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
                const isMobile = containerSize.width < 768;
                const minDim = Math.min(containerSize.width, containerSize.height);
                const circleRadius = Math.min(minDim * 0.32, 320);
                const circleAngle = (i / TOTAL_IMAGES) * 360;
                const circleRad = (circleAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius,
                  rotation: circleAngle + 90,
                };

                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                const arcCenterY = arcApexY + arcRadius;
                const spreadAngle = isMobile ? 100 : 130;
                const startAngle = -90 - spreadAngle / 2;
                const step = spreadAngle / (TOTAL_IMAGES - 1);
                const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                const boundedRotation = -scrollProgress * spreadAngle * 0.8;
                const currentArcAngle = startAngle + i * step + boundedRotation;
                const arcRad = (currentArcAngle * Math.PI) / 180;
                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius + parallaxValue,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                };
              }

              return <FlipCard key={i} item={IMAGES[i]} index={i} phase={introPhase} target={target} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
