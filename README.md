# Real-Time UX with OCI + Devin — demo application

Baseline **V1** of the live meetup demo "Real-Time UX with OCI + Devin".

Nebula Signals is a premium SaaS-style revenue intelligence workspace. During the meetup, an audience request typed into
the **Customize your experience** drawer will travel through OCI Generative AI and the Devin API to produce a new version
of this application. V1 contains the full UI plus the API surface, with the AI workflow intentionally mocked.

## Stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Frontend  | React 18 + Vite + TypeScript (no framework router) |
| Backend   | Node.js + Express (TypeScript, compiled to `dist`) |
| Packaging | Single multi-stage Docker image, listens on `8080` |

The Express server serves the compiled React bundle, so the container is the only deployable artifact.

## Layout

```
client/                  React + Vite + TypeScript frontend
  src/styles/tokens.css  centralized design tokens (colors, spacing, radii, motion)
  src/components/        reusable UI components (sidebar, topbar, hero, KPI, charts, drawer)
  src/data/dashboard.ts  demo content for every section
  src/hooks/             /api/meta + /api/customize clients
server/                  Express API + static hosting
  src/routes/            health, meta, customize
Dockerfile               multi-stage build (build -> prod deps -> runtime)
```

## API

| Method | Path             | Behaviour                                                                       |
| ------ | ---------------- | ------------------------------------------------------------------------------- |
| GET    | `/health`        | `200` with uptime — used by Docker/OCI health checks                            |
| GET    | `/api/meta`      | application version, git/build identifier, environment, AI integration flag      |
| POST   | `/api/customize` | `400` without a prompt, otherwise `501` stating AI integration is not configured |

### Environment variables

| Variable      | Default          | Purpose                                     |
| ------------- | ---------------- | ------------------------------------------- |
| `PORT`        | `8080`           | HTTP port                                   |
| `APP_VERSION` | `v1`             | shown in the version badge and footer       |
| `GIT_SHA`     | _(unset)_        | build identifier shown next to the version  |
| `CLIENT_DIR`  | `client/dist`    | location of the compiled frontend           |

No secrets or cloud credentials are used in V1.

## Local development

```bash
npm install
npm run dev          # Express on :8080 + Vite dev server on :5173 (proxies /api and /health)
```

Production-like run:

```bash
npm run build
APP_VERSION=v1 npm start   # http://localhost:8080
```

Quality gates:

```bash
npm run typecheck
npm run lint
```

## Docker

```bash
docker build -t oci-devin-realtime-ux-demo:v1 \
  --build-arg APP_VERSION=v1 --build-arg GIT_SHA="$(git rev-parse HEAD)" .

docker run --rm -p 8080:8080 oci-devin-realtime-ux-demo:v1
curl -i http://localhost:8080/health
```

## Demo-friendly conventions

- Every important element carries a stable `data-demo-id` (`explore-insights-button`, `hero-section`, `kpi-card-revenue`,
  `customize-fab`, `apply-with-ai-button`, `timeline-stage-devin`, …), so later sessions can target elements precisely.
- All visual decisions live in `client/src/styles/tokens.css`; changing the accent tokens re-themes the whole product.
- The version badge in the top bar and the footer make V1/V2/V3 visually distinguishable during the live demo.
