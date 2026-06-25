# Shreya Kumari — Portfolio

A personal portfolio built with Next.js 14, Tailwind CSS, Three.js, and Framer Motion.

---

## 🚀 Running Locally

### Step 1 — Prerequisites
Make sure you have these installed:
- **Node.js** v18 or above → https://nodejs.org
- **npm** (comes with Node)

Check by running:
```bash
node -v
npm -v
```

### Step 2 — Install dependencies
Open your terminal in the project folder and run:
```bash
npm install
```
This installs everything: Next.js, Three.js, Framer Motion, Tailwind, etc.

### Step 3 — Start the dev server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser. That's it — you'll see your portfolio live.

---

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

---

## ✏️ Personalising Your Content

### Your name & tagline
Already set to **Shreya Kumari** and your tagline in `hero-section.tsx`.

### Projects → `components/ui/projects-section.tsx`
Edit the `projects` array at the top — replace with your actual project names, descriptions, GitHub links, and tech stack.

### Photography → `components/ui/photography-section.tsx`
Replace the `photos` array with your own Unsplash links or local images.  
To use local images: put them in `/public/photos/` and use paths like `/photos/my-shot.jpg`.

### Skills → `components/ui/skills-section.tsx`
Edit `ROW1` and `ROW2` — swap in the actual languages and tools you know.

### Music & Films → `components/ui/interests-section.tsx`
Update `recentMusic` and `recentFilms` with your actual favourites.
Later, you can replace this with a **Last.fm API** integration for live data.

### Social links & email → `components/ui/contact-section.tsx`
Update the `socials` array and the mailto link with your real GitHub, LinkedIn, and email.

### Colors
All colors live in `app/globals.css` as CSS variables.
- `--accent` is your golden-amber (#c17d3c light / #d4924a dark) — change this to any color you like.
- `--background`, `--foreground`, `--muted`, `--card` control everything else.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

Or deploy to **Vercel** (free, recommended):
1. Push the project to GitHub
2. Go to https://vercel.com → Import project → Select your repo
3. Click Deploy — done. Vercel handles everything automatically.

---

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
