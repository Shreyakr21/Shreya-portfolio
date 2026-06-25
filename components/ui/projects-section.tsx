"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Hammer } from "lucide-react";

// ── Replace with your actual projects ────────────────────────────
const projects = [
  {
    number: "00",
    title: "FoodReel — Zomato meets Instagram",
    description: "A mobile app idea I'm actively building — think Zomato for ordering food and navigating restaurants, but with an Instagram-style feed where customers post reels of their food experiences. Reviews become content. Content drives discovery. Restaurants get organic advertising through user-generated reels.",
    what_i_learned: "Currently learning Flutter for the mobile UI, Supabase for the backend and auth, and figuring out how to handle video uploads and feeds at scale. Very early stage — this is me learning and building simultaneously.",
    tech: ["Flutter", "Supabase", "Dart", "PostgreSQL"],
    github: null,
    demo: null,
    year: "2025 →",
    inProgress: true,
  },
  {
    number: "02",
    title: "Uber Ride Analytics Dashboard",
    description: "A machine learning and analytics dashboard that transforms Uber ride data into actionable insights. The application predicts peak demand periods and trip durations while providing interactive visualizations and route-level analysis through an intuitive Streamlit interface.",
    what_i_learned: "Feature engineering from raw datasets, training and evaluating machine learning models, deploying data-driven applications with Streamlit, and creating interactive visualizations for decision-making.",
    tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "Plotly"],
    github: "https://github.com/Shreyakr21/UberDashboard",
    demo: null,
    year: "2024",
    inProgress: false,
  },
  {
    number: "03",
    title: "ERP Lite System",
    description: "A lightweight ERP application built to centralize employee management, inventory tracking, and attendance monitoring in a single platform. The system includes role-based access control, secure authentication, and interactive dashboards that help users manage and visualize operational data efficiently.",
    what_i_learned: "Designing full-stack business applications, building RESTful APIs, implementing authentication and authorization, structuring relational databases, and handling real-world enterprise workflows.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    github: "https://github.com/Shreyakr21/erp-lite-system",
    demo: null,
    year: "2022",
    inProgress: false,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="section-label">Work</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "var(--foreground)" }}>
          Things I&apos;ve built
        </h2>
        <p className="font-body text-base mb-16 max-w-lg" style={{ color: "var(--muted)" }}>
          Mini projects from 3 years of engineering, plus what I&apos;m actively building right now.
        </p>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl p-6 md:p-8 transition-colors duration-300"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              whileHover={{ borderColor: "var(--accent)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Number */}
                <span className="font-mono-custom text-xs flex-shrink-0 mt-1"
                  style={{ color: "var(--accent)" }}>{project.number}</span>

                {/* Main content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-xl md:text-2xl font-bold"
                        style={{ color: "var(--foreground)" }}>{project.title}</h3>
                      {project.inProgress && (
                        <span className="flex items-center gap-1 font-mono-custom text-xs px-2.5 py-1 rounded-full animate-pulse"
                          style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
                          <Hammer className="h-3 w-3" /> building
                        </span>
                      )}
                    </div>
                    <span className="font-mono-custom text-xs" style={{ color: "var(--muted)" }}>{project.year}</span>
                  </div>

                  <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                    {project.description}
                  </p>

                  {/* What I learned */}
                  <div className="flex gap-2 mb-5 p-3 rounded-lg" style={{ backgroundColor: "var(--background)" }}>
                    <span className="font-mono-custom text-xs flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>learned →</span>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                      {project.what_i_learned}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="font-mono-custom text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.inProgress ? (
                        <span className="flex items-center gap-1.5 font-mono-custom text-xs"
                          style={{ color: "var(--muted)" }}>
                          <Hammer className="h-3.5 w-3.5" /> repo coming soon
                        </span>
                      ) : project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono-custom text-xs transition-opacity hover:opacity-60"
                          style={{ color: "var(--foreground)" }}>
                          <Github className="h-3.5 w-3.5" /> GitHub
                        </a>
                      ) : null}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono-custom text-xs transition-opacity hover:opacity-60"
                          style={{ color: "var(--accent)" }}>
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
