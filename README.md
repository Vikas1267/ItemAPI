# Item API

A lightweight Item service built with Spring Boot, plus a small static web UI for accessing the API. Items are stored in memory and reset on every server restart.

## What This Project Is

- REST API for creating and retrieving items.
- Static browser UI (HTML/CSS/JS) that calls the API.
- Dockerfile included for container-based deployment.

## Access (Hosted)

- Website link: `https://exquisite-kelpie-fe4cd6.netlify.app/`

Basic steps:

1. Open the UI link.
2. The Base URL is already filled in for you.
3. Click `Check Health` to confirm the API is reachable and ensure you get (Status : ok).
4. In **Create Item**, fill the fields and click **Create Item**.
5. The response shows the new item with an `id`.
6. Use **Get Item** with that `id` to fetch it again.
7. Click **Refresh Items** to list all saved items.

## API Overview

Endpoints:

- `GET /` returns a simple JSON message and endpoints list.
- `GET /healthz` returns `{ "status": "ok" }`.
- `POST /api/items` creates a new item.
- `GET /api/items/{id}` fetches one item by id.
- `GET /api/items` lists all items.

Field rules:

- `name` and `description` are required.
- `category` is optional.
- `price` is optional, must be zero or positive, and defaults to `0`.

Response shape includes `id` and `available` (defaults to `true`).

## Behavior

- Data is in memory only (no database).
- IDs are auto-generated.
- Data resets when the API restarts.

## Configuration

- `PORT`: server port (default `8080` if not set).
- `CORS_ALLOWED_ORIGINS`: comma-separated list of UI domains allowed to call the API.

## Repo Map

- `src/` Spring Boot API
- `frontend/` static UI
- `Dockerfile` container build
