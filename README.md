# HTMX + Express Demo

A small demo project that combines HTMX-driven front-end interactions with a minimal Express (Node) server.

This repository is a tiny development environment used to demonstrate how htmx can fetch server-generated HTML snippets and update the DOM without a full SPA framework.

## Project details

- Name: `htmx`
- Author: Shawn M. Crowley
- Purpose: Demonstrate HTMX client usage with a lightweight Express server that serves static files and responds to dynamic requests.

## Built with

- Node.js (ES module style)
- Express (server)
- HTMX (client-side, loaded via CDN in `public/index.html`)

## Prerequisites

- Node.js 16+ (or a recent LTS) installed
- npm (or yarn) available

## Install

1. From the `htmx` directory, install dependencies:

   npm install

## Run (development)

Start the server with the provided npm script:

   npm start

This runs: `node --watch server.js` (server watches for file changes and restarts).

Open your browser to:

   http://localhost:8020

The static `public/index.html` file is served from the `public/` folder.

## What the server provides

- Serves static files from `public/` (including `index.html`).
- GET /data — returns an HTML snippet (used by the demo button in `index.html`).
- POST /contacts — placeholder endpoint that (intends to) receive a contact submission and return an HTML list item for insertion.
- GET /health — a simple healthcheck returning uptime, message, and timestamp as JSON.

Example healthcheck:

```
curl http://localhost:8020/health

# Response (JSON)
{
  "uptime": 12.345,
  "message": "OK",
  "timestamp": 1610000000000
}
```

## How the demo works (front-end)

The demo page `public/index.html` includes HTMX via CDN and contains a simple button:

- hx-get="http://localhost:8020/data" — HTMX issues a GET to this endpoint when the button is clicked.
- hx-target="#content" — the response body replaces the element with id `content`.
- hx-swap="outerHTML" — replaces the entire target element.

This results in the server-sent HTML snippet being inserted into the page without a full page reload.

Tip: When hosting the static page from the same server, you can change the hx-get URL to a relative path (`/data`) to avoid hard-coded hostnames.

## Implementation notes & caveats

- `package.json` declares `type: "module"` and uses ES module imports in `server.js`.
- `server.js` currently does not register body-parsing middleware (e.g., `express.json()` or `express.urlencoded()`), so the `POST /contacts` endpoint will not receive `req.body` unless you enable parsing. To accept form submissions, add:

```js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

- The `public/index.html` currently loads HTMX from a CDN. If you want an offline or pinned version, install and serve a local copy.

## Suggestions / next steps

- Add body-parsing middleware to `server.js` so the POST route works as intended.
- Add a small form in `public/index.html` that posts to `/contacts` using HTMX (hx-post + hx-target).
- Add a README section with development notes about Node version and environment variables if you expand the project.

## License

ISC
