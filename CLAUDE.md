# IMPHNEN Frontend Service

Nx monorepo for IMPHNEN (Ingin Menjadi Programmer Handal Namun Enggan Ngoding) — Indonesia's largest programmer community.

## Tech Stack

- **Monorepo**: Nx 22.6
- **Framework**: Next.js 16 (landing), Vite + React 19 (all other apps)
- **Routing**: react-router v7 (Vite apps), Next.js App Router (landing)
- **Styling**: Tailwind CSS v4, class-variance-authority (CVA)
- **State**: Zustand, TanStack React Query
- **Forms**: react-hook-form + zod
- **Build/Deploy**: Nix flakes, Cachix binary cache, NixOS modules
- **CI/CD**: GitHub Actions with `nx affected` + matrix strategy
- **Node**: v22

## Project Structure

### Apps
| App | Framework | Description |
|-----|-----------|-------------|
| `landing` | Next.js 16 | Public website |
| `backoffice` | Vite + React | Admin dashboard |
| `hackathon` | Vite + React | Hackathon platform |
| `dimentorin` | Vite + React | Mentoring platform |
| `gacha` | Vite + React | Merch gacha system |
| `qrcampaign` | Vite + React | QR campaign tool |
| `infra` | Vite + React | Infrastructure dashboard |

### Shared Libraries
| Lib | Purpose | Depends on |
|-----|---------|------------|
| `utils` | Pure utilities only: `cn`, `For`, `Show`, `useQueryState`, `useModalLogin`, react-query helpers, react-router file-based routing | nothing |
| `service` | Business logic: API clients, auth hooks, storage (SessionToken/SessionUser), constants (PERMISSIONS, cities) | `utils` |
| `ui` | UI components: atoms (Button, Input, Card, Dialog, Drawer, Form, Label), molecules, organisms (Navbar, Sidebar, Datatable) | `utils`, `service` |

**Dependency rule**: `ui` → `service` → `utils` (never the reverse)

## Common Commands

```bash
# Dev
nx dev <app>              # Start dev server
nx build <app>            # Build single app
nx run-many -t build --all # Build everything

# Test
nx test <lib>             # Run unit tests (vitest)
nx e2e <app>-e2e          # Run e2e tests (playwright)
nx lint <project>         # Lint

# Build all affected
nx affected -t build      # Only build what changed
nx affected -t test       # Only test what changed

# Nix
nix build .#<app>         # Build Nix package for an app
nix develop               # Enter dev shell (node 22, bun, git, jq)
```

## Nix / Deployment

All Nix config is in a single `flake.nix`:
- `mkViteApp`: Builds Vite apps as Nix packages
- `mkLandingApp`: Builds the Next.js landing app
- `mkLandingModule`: NixOS module (systemd service for Next.js)
- `mkStaticAppModule`: NixOS module (nginx for static Vite apps)
- `npmDepsHash`: Must be updated when `package-lock.json` changes. Use `lib.fakeHash` to get the new hash from a failed build.

## CI/CD Pipeline (.github/workflows/nix-build.yml)

1. **detect**: Uses `nx affected` to find changed apps
2. **build**: Matrix strategy builds only affected apps with Nix, pushes to Cachix
3. **deploy**: Clones `imphnen-infrastructure`, updates `flake.lock`, pushes, then runs `clan machines update hetzner` to deploy to the Hetzner server

Required GitHub secrets: `CACHIX_AUTH_TOKEN`, `INFRA_DEPLOY_KEY` (SSH key for both GitHub and server access)

The server (167.235.70.37) pulls pre-built packages from Cachix during `nixos-rebuild`.

## Environment Variables

- Vite apps: `VITE_API_URL`, `VITE_GITHUB_CLIENT_ID`
- Next.js (landing): `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GITHUB_CLIENT_ID`
- The `getBaseURL()` function in `libs/service/src/api/index.ts` handles both environments

## Key Conventions

- Atomic design: atoms → molecules → organisms
- Components have their own folder with `component.tsx`, `index.ts`, `spec.tsx`, `stories.tsx`
- Use `cn()` from `@imphnen-frontend-service/utils` for className merging
- Use `'use client'` directive on any component using React hooks (for Next.js compatibility)
- Button variants via CVA: `primary`, `secondary`, `text`, `bordered`, `success`, `danger`
- Landing app uses `container` class — Tailwind v4 requires explicit `margin-inline: auto` (defined in globals.css)
