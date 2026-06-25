"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import NeuralBackground from "./neural-background";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Shreyakr21",
    icon: <Github className="h-5 w-5" />,
    description: "See my code",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shreya-kumari-b42bbb342/",
    icon: <Linkedin className="h-5 w-5" />,
    description: "Let's connect",
  },
  {
    label: "Email",
    href: "mailto:shreyakumari04311@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    description: "Drop a line",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <NeuralBackground color="#2dd4aa" trailOpacity={0.15} particleCount={250} speed={0.5} className="w-full h-full" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ color: "var(--foreground)" }}>
            Let&apos;s talk
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto"
            style={{ color: "var(--muted)" }}>
            Open to internships, collaborations, and good conversations. If something here resonated — reach out.
          </p>

          {/* Email CTA */}
          <a href="mailto:shreyakumari04311@gmail.com"
            className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:gap-3 mb-14"
            style={{ backgroundColor: "var(--accent)", color: "white" }}>
            Say hello <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Social buttons */}
          <div className="flex items-center justify-center gap-4">
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                >
                  {social.icon}
                </div>
                <span className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>{social.description}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer line */}
      <div className="relative z-10 mt-20 pt-8 border-t max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderColor: "var(--border)" }}>
        <p className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>
          © 2025 Shreya Kumari
        </p>
        <p className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>
          Built with Next.js · Designed with intention
        </p>
      </div>
    </section>
  );
}
