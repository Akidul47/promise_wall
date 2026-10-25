# Promise Wall

An anonymous wall where anyone can pin a promise or a wish as a sticky note. No names, no accounts.

Live at **promisewall.app** (coming soon).

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Project structure

```
src/
  App.jsx               page layout, filters, loads and posts notes
  App.css               all styles (light and dark mode)
  components/
    PostForm.jsx        the "I promise / I wish" composer
    Note.jsx            one sticky note on the wall
  lib/
    notesApi.js         data layer (sample data now, Supabase next)
```

## Status

- [x] Frontend with sample data (posting, filters, colors, Bengali text support)
- [ ] Supabase database (only `src/lib/notesApi.js` changes)
- [ ] Deploy to Vercel and connect promisewall.app
- [ ] Moderation (server-side checks, then an ML classifier)
