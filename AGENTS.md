<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `aube exec intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `aube exec intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# AGENTS.md

This file documents the conventions, tech stack, and workflow for this project to ensure consistency across all AI-generated code.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Server-Side Rendering on the Edge)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (File-based routing)
- **Library**: React 19 · Vite 8 (Rolldown) · TypeScript 7
- **Deployment**: Cloudflare Workers / Pages
- **Language**: TypeScript

## Styling

- **Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Integration**: `@tailwindcss/vite` plugin (no `postcss.config.js` needed)
- **Conventions**:
  - Use utility classes for styling.
  - Avoid CSS-in-JS unless necessary for complex dynamic animations (e.g., `motion` via `motion/react`, or inline styles).
  - Use `clsx` or `tailwind-merge` for conditional class names (if installed).

## Linting & Formatting

- **Tool**: [Biome](https://biomejs.dev/)
- **Strictness**: This project relies **exclusively** on Biome.
- **Commands**:
  - Format: `aubr format`
  - Lint: `aubr lint`
  - Check: `aubr check`
- **Rule**: Do not add Prettier or ESLint configuration. Respect `biome.json` ignores (e.g., `routeTree.gen.ts`).

## Package Manager

- **Standard**: [aube](https://aube.sh/) (lockfile: `aube-lock.yaml`). Never use bun/npm/pnpm to install.
- **Commands**:
  - Install: `aube install`
  - Run scripts: `aubr <script>` (`aube run`)
  - Add packages: `aube add <package>` (`-D` for dev)
  - One-off binaries: `aube exec <bin>` (local) / `aubx <pkg>` (dlx)
  - Dependency build scripts need approval: `aube ignored-builds`, then `aube approve-builds`

## Project Structure

- **Aliases**: `@/*` maps to `./src/*`
- **Routing**: Files in `src/routes` map to URLs (TanStack Router).
- **Assets**: Static assets go in `public/`.

## Performance & Optimization

- **React Compiler**: Enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()` (Vite 8 / plugin-react 6 no longer bundle Babel).
  - Manual memoization (`useMemo`, `useCallback`) is largely unnecessary for simple cases but acceptable for complex logic.
- **Image Optimization**: Use appropriate formats (WebP/AVIF) where possible.

## AI Workflow Tips

1. **Always** check `package.json` for available scripts before suggesting commands.
2. **Always** use absolute imports (`@/components/...`) over relative imports (`../../components/...`).
3. **Always** run `aubr check` (Biome) after significant refactors to ensure compliance.
