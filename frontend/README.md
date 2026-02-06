# Item API Frontend

This is a static UI that talks to the Spring Boot API.

## Local preview

Open `index.html` in a browser, or run a static server from this folder:

```bash
python -m http.server 5173
```

Then open `http://localhost:5173` and set the API base URL (example: `http://localhost:8080`).

## Deploy to Vercel

- Import the repo.
- Set the Project Root to `frontend`.
- Framework preset: Other.
- Build command: leave blank.
- Output directory: `.`

## Deploy to Netlify

- Create a new site from Git.
- Base directory: `frontend`.
- Build command: leave blank.
- Publish directory: `frontend`.

## Configure the API base

You can set the API base three ways:

- Use the input on the page and click Save.
- Add `?api=https://your-api-domain` to the URL.
- Define `window.API_BASE_URL` before `app.js` if you serve it from a template.

Make sure the backend allows CORS for your frontend domain.
