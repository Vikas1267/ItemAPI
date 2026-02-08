# Item API

A lightweight Item service built with Spring Boot, plus a small static web UI for accessing the API. Items are stored in memory and reset on every server restart.

## What This Project Is

- REST API for creating and retrieving items.
- Static browser UI (HTML/CSS/JS) that calls the API.
- Dockerfile included for container-based deployment.

## Access (Hosted)

- Website link: "https://exquisite-kelpie-fe4cd6.netlify.app/"

Steps:

1. Open the Website link.
2. The Base URL is already filled in for you(which connects to API).
3. Click `Check Health` to confirm the API is reachable and ensure you get (Status : ok).
4. In **Create Item**, fill the fields and click **Create Item**.
5. The response shows the new item with an `id`.
6. Use **Get Item** with that `id` to fetch it again.
7. Click **Refresh Items** to list all saved items.

##Screenshots :

<img width="1920" height="1080" alt="Screenshot 2026-02-08 210506" src="https://github.com/user-attachments/assets/a2147e89-a2f6-48ad-b920-534270b4da4c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/223a6be3-d8d5-4738-92d9-c729363480ba" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8bd4ae72-68d9-4506-ad79-42386692f97c" />


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
