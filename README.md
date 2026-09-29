# Resibuild Next.js Frontend

This project was converted from the previous Vite React build to **Next.js App Router**.

## Run

```bash
npm install
npm run dev
```

Open:

- Home: http://localhost:3000
- About: http://localhost:3000/about
- Events: http://localhost:3000/events

## Production

```bash
npm run build
npm start
```

## Structure

```text
app/
  layout.jsx
  page.jsx
  about/page.jsx
  events/page.jsx
components/
data/
public/images/
```

Vite-specific files, react-router-dom, node_modules, and Git history are not included.
