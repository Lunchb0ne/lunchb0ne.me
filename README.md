# lunchb0ne.me

Source for my personal site, [lunchb0ne.me](https://lunchb0ne.me) — a portfolio
with a Three.js hero scene.

## Stack

- [TanStack Start / Router](https://tanstack.com/router) — file-based routing and SSR
- [Vite](https://vite.dev/) — build tooling
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Three.js](https://threejs.org/) via [react-three-fiber](https://r3f.docs.pmnd.rs/) — 3D visuals
- [Biome](https://biomejs.dev/) — linting and formatting
- [Cloudflare](https://developers.cloudflare.com/workers/) — hosting (via Wrangler)

[Bun](https://bun.sh/) is the package manager and runtime.

## Development

```bash
bun install
bun run dev        # dev server at http://localhost:3000
bun run build      # production build
bun run preview    # preview the production build
bun run test       # run tests (Vitest)
bun run lint       # Biome lint
bun run format     # Biome format
bun run check      # Biome lint + format
bun run deploy     # build and deploy to Cloudflare
```

## Structure

```
src/
├── routes/        # file-based routes (__root, index)
├── components/
│   ├── layout/    # Navigation, etc.
│   ├── sections/  # Hero, About, Experience, Projects, Skills, Contact
│   ├── visuals/   # Three.js scene, marquee, hero text
│   └── ui/        # cursor, spotlight, shared bits
└── content/       # site copy (about, projects, skills, experience, contact, seo)
```

Site copy lives in `src/content/` — edit text there rather than in the
components.
