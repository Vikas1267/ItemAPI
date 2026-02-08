# Item API UI

Static UI that talks to the Spring Boot Item API.

## Render (Current Method)

- Create a Render Static Site.
- Root Directory: `frontend`.
- Build command: leave blank.
- Publish directory: `.`.

After deploy, open the site and set the API base URL.

## Connect to Backend

- The Base URL input is auto-filled from your saved value, the `?api=` query string, or the default Render backend in `app.js`.
- Paste your backend URL, click `Save`, then click `Check Health`.
- Use **Create Item** to add items and **Get Item** to fetch by id.

## Local Preview

```bash
python -m http.server 5173
```

Open `http://localhost:5173` and set the Base URL to `http://localhost:8080`.

## API Base Options

- Use the Base URL input and click `Save`.
- Add `?api=https://your-api-domain` to the URL.
- Define `window.API_BASE_URL` before `app.js` if you serve it from a template.
