"use client";
import { useRef, useEffect, useState } from "react";

const TOOLS = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
];

interface ToolCardProps {
  name: string;
  icon: string;
}

function ToolCard({ name, icon }: ToolCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef<{ x: number; y: number; baseX: number; baseY: number; color: string; size: number; density: number }[]>([]);
  const animRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 96;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = icon;
    imgRef.current = img;

    img.onload = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, 8, 8, SIZE - 16, SIZE - 16);
      const data = ctx.getImageData(0, 0, SIZE, SIZE);
      ctx.clearRect(0, 0, SIZE, SIZE);

      particles.current = [];
      for (let y = 0; y < SIZE; y += 3) {
        for (let x = 0; x < SIZE; x += 3) {
          const i = (y * SIZE + x) * 4;
          const a = data.data[i + 3];
          if (a > 80) {
            const r = data.data[i];
            const g = data.data[i + 1];
            const b = data.data[i + 2];
            particles.current.push({
              x, y, baseX: x, baseY: y,
              color: `rgba(${r},${g},${b},${a / 255})`,
              size: 1.5,
              density: Math.random() * 25 + 5,
            });
          }
        }
      }

      // Draw static initially
      ctx.drawImage(img, 8, 8, SIZE - 16, SIZE - 16);
    };
  }, [icon]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!hovered) {
      cancelAnimationFrame(animRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (imgRef.current?.complete) ctx.drawImage(imgRef.current, 8, 8, canvas.width - 16, canvas.height - 16);
      return;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mr = 60;

      for (const p of particles.current) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mr && dist > 0) {
          const force = (mr - dist) / mr;
          p.x -= (dx / dist) * force * p.density * 0.4;
          p.y -= (dy / dist) * force * p.density * 0.4;
        } else {
          p.x += (p.baseX - p.x) * 0.12;
          p.y += (p.baseY - p.y) * 0.12;
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  return (
    <div
      className="flex-shrink-0 flex flex-col items-center gap-3 px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouse.current = { x: -1000, y: -1000 }; }}
      onMouseMove={handleMouseMove}
    >
      <div className="rounded-xl flex items-center justify-center" style={{ backgroundColor: "#ffffff", width: 64, height: 64 }}>
        <canvas ref={canvasRef} style={{ width: 64, height: 64 }} />
      </div>
      <span className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>{name}</span>
    </div>
  );
}

const REPEATED = [...TOOLS, ...TOOLS];

export default function SkillsSection() {

  return (
    <section id="skills" className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-14">
        <p className="section-label">Tech stack</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight"
          style={{ color: "var(--foreground)" }}>
          Tools I work with
        </h2>
        <p className="font-body text-base mt-4 max-w-lg" style={{ color: "var(--muted)" }}>
          A mix of what&apos;s been taught and what I&apos;ve picked up out of curiosity. Hover to interact.
        </p>
      </div>

      {/* Scrolling row — keeps moving while particle effect fires on hover */}
      <div className="relative overflow-hidden py-4 mb-6">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: "scroll-left 35s linear infinite" }}
        >
          {REPEATED.map((item, i) => (
            <ToolCard key={i} name={item.name} icon={item.icon} />
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
      </div>

      {/* Core skills tags */}
      <div className="max-w-5xl mx-auto px-6 mt-14">
        <p className="section-label mb-5">Core competencies</p>
        <div className="flex flex-wrap gap-3">
          {[
            "Data Structures & Algorithms",
            "Web Development",
            "Object-Oriented Programming",
            "Database Management",
            "REST APIs",
            "Version Control",
            "Problem Solving",
            "Quick Learner",
          ].map(skill => (
            <span key={skill}
              className="font-mono-custom text-xs px-4 py-2 rounded-full tracking-wide"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
