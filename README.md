# lunchb0ne.me

Source for my personal site, [lunchb0ne.me](https://lunchb0ne.me) — a portfolio
with a Three.js hero scene.

## Stack

- [TanStack Start / Router](https://tanstack.com/router) — file-based routing and SSR
- [Vite 8](https://vite.dev/) (Rolldown) — build tooling
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Three.js](https://threejs.org/) via [react-three-fiber](https://r3f.docs.pmnd.rs/) — 3D visuals
- [Biome](https://biomejs.dev/) — linting and formatting
- [Cloudflare](https://developers.cloudflare.com/workers/) — hosting (via Wrangler)

[aube](https://aube.sh/) is the package manager (`aube-lock.yaml`); scripts run on Node.

## Development

```bash
aube install
aubr dev            # dev server at http://localhost:3000
aubr build          # production build
aubr preview        # preview the production build
aubr lint           # Biome lint
aubr format         # Biome format
aubr check          # Biome lint + format
aubr typecheck      # tsc (TypeScript 7)
aubr deploy         # build and deploy to Cloudflare
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
