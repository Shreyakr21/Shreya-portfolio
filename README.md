# Shreya Kumari — Portfolio

A personal portfolio built with Next.js 14, Tailwind CSS, Three.js, and Framer Motion.

## 📁 Project Structure

```
shreya-portfolio/
├── app/
│   ├── globals.css        ← All design tokens (colors, fonts, animations)
│   ├── layout.tsx         ← Root layout with theme provider
│   └── page.tsx           ← Main page — assembles all sections
├── components/ui/
│   ├── navbar.tsx              ← Sticky nav with theme toggle
│   ├── theme-switch-button.tsx ← Sun/Moon dark mode toggle
│   ├── theme-provider.tsx      ← next-themes wrapper
│   ├── neural-background.tsx   ← Particle flow field (hero + contact)
│   ├── dotted-surface.tsx      ← Three.js wave dots (about section)
│   ├── hero-section.tsx        ← Scroll morph image animation
│   ├── about-section.tsx       ← Bio + hover previews + quotes carousel
│   ├── skills-section.tsx      ← Scrolling tech icons carousel
│   ├── projects-section.tsx    ← Project cards with "learned" notes
│   ├── photography-section.tsx ← Masonry grid + lightbox
│   ├── interests-section.tsx   ← Music, films, learning cards
│   └── contact-section.tsx     ← Contact + social links
├── lib/
│   └── utils.ts           ← cn() utility
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🔧 Dependencies

| Package | Purpose |
|---|---|
| next 14 | Framework |
| react 18 | UI library |
| three | 3D dots background |
| framer-motion | Animations |
| next-themes | Dark/light mode |
| lucide-react | Icons |
| tailwindcss | Styling |
| clsx + tailwind-merge | Class utilities |
