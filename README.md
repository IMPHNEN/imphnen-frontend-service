# IMPHNEN Frontend Service

<p align="center">
  <img src="docs/logo.svg" alt="IMPHNEN">
</p>

Monorepo for all frontend services of [IMPHNEN](https://imphnen.dev) (Ingin Menjadi Programmer Handal Namun Enggan Ngoding) — Indonesia's largest programmer community.

## Apps

| App | Framework | URL |
|-----|-----------|-----|
| **Landing** | Next.js 16 | [imphnen.dev](https://imphnen.dev) |
| **Backoffice** | Vite + React | Internal admin dashboard |
| **Hackathon** | Vite + React | Hackathon platform |
| **Dimentorin** | Vite + React | [dimentorin.imphnen.dev](https://dimentorin.imphnen.dev) |
| **Gacha** | Vite + React | [gacha.imphnen.dev](https://gacha.imphnen.dev) |
| **QR Campaign** | Vite + React | QR campaign management |
| **Infra** | Vite + React | Infrastructure dashboard |

## Shared Libraries

| Lib | Purpose |
|-----|---------|
| `utils` | Pure utilities — `cn()`, `For`, `Show`, `useQueryState`, `useModalLogin` |
| `service` | Business logic — API clients, auth hooks, storage, constants |
| `ui` | UI components — atoms, molecules, organisms (atomic design) |

## Getting Started

### Prerequisites

- Node.js 22
- [Nix](https://nixos.org/download/) (optional, for reproducible builds)

### Setup

```sh
git clone https://github.com/IMPHNEN/imphnen-frontend-service.git
cd imphnen-frontend-service
npm install
```

Or with Nix:

```sh
nix develop  # enters dev shell with node 22, bun, git, jq
```

### Environment Variables

Copy `.env.example` to `.env` in the app directory:

```sh
cp apps/<app>/.env.example apps/<app>/.env
```

### Development

```sh
nx dev <app>        # e.g. nx dev landing, nx dev backoffice
```

### Build

```sh
nx build <app>            # build single app
nx run-many -t build --all # build everything
nx affected -t build       # build only what changed
```

### Nix Build

```sh
nix build .#<app>    # e.g. nix build .#landing, .#dimentorin
```

All Nix config lives in `flake.nix`. When `package-lock.json` changes, update `npmDepsHash` using `lib.fakeHash`.

### Testing

```sh
nx test <project>    # unit tests (vitest)
nx e2e <app>-e2e     # e2e tests (playwright)
nx lint <project>    # eslint
```

### Storybook

```sh
nx storybook ui      # run storybook for ui lib
nx build-storybook ui # build static storybook
```

## CI/CD

GitHub Actions pipeline (`.github/workflows/nix-build.yml`):

1. **detect** — uses `nx affected` to find changed apps
2. **build** — matrix strategy builds only affected apps with Nix, pushes to [Cachix](https://app.cachix.org/cache/msdqn)
3. **update-infra** — updates `flake.lock` in [imphnen-infrastructure](https://github.com/IMPHNEN/imphnen-infrastructure)

## Tech Stack

- **Monorepo**: Nx 22.6
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, CVA
- **State**: Zustand, TanStack React Query
- **Forms**: react-hook-form + zod
- **Build**: Nix flakes, Cachix
- **CI**: GitHub Actions

## Contributing

1. Fork and clone the repository
2. Create a branch: `git checkout -b feat/feature-name`
3. Make changes, commit, and push
4. Open a pull request to the `develop` branch

Issues and feedback welcome via [GitHub Issues](https://github.com/IMPHNEN/imphnen-frontend-service/issues).
