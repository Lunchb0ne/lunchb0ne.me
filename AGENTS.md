# AGENTS.md

This file documents the conventions, tech stack, and workflow for this project to ensure consistency across all AI-generated code.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Server-Side Rendering on the Edge)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (File-based routing)
- **Library**: React 19
- **Deployment**: Cloudflare Workers / Pages
- **Language**: TypeScript

## Styling

- **Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Integration**: `@tailwindcss/vite` plugin (no `postcss.config.js` needed)
- **Conventions**:
  - Use utility classes for styling.
  - Avoid CSS-in-JS unless necessary for complex dynamic animations (e.g., `framer-motion` or inline styles).
  - Use `clsx` or `tailwind-merge` for conditional class names (if installed).

## Linting & Formatting

- **Tool**: [Biome](https://biomejs.dev/)
- **Strictness**: This project relies **exclusively** on Biome.
- **Commands**:
  - Format: `bun run format`
  - Lint: `bun run lint`
  - Check: `bun run check`
- **Rule**: Do not add Prettier or ESLint configuration. Respect `biome.json` ignores (e.g., `routeTree.gen.ts`).

## Package Manager

- **Standard**: [Bun](https://bun.sh/)
- **Commands**:
  - Install: `bun install`
  - Run scripts: `bun run <script>`
  - Add packages: `bun add <package>`

## Project Structure

- **Aliases**: `@/*` maps to `./src/*`
- **Routing**: Files in `src/routes` map to URLs (TanStack Router).
- **Assets**: Static assets go in `public/`.

## Performance & Optimization

- **React Compiler**: Enabled (`babel-plugin-react-compiler`).
  - Manual memoization (`useMemo`, `useCallback`) is largely unnecessary for simple cases but acceptable for complex logic.
- **Image Optimization**: Use appropriate formats (WebP/AVIF) where possible.

## AI Workflow Tips

1. **Always** check `package.json` for available scripts before suggesting commands.
2. **Always** use absolute imports (`@/components/...`) over relative imports (`../../components/...`).
3. **Always** run `bun run check` (Biome) after significant refactors to ensure compliance.
