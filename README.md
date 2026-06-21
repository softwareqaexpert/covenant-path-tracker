# My Covenant Path

A mobile-friendly Progressive Web App that helps a new member of The Church of
Jesus Christ of Latter-day Saints track their progress along the covenant path
toward becoming worthy to enter the temple.

Built for new converts. Goal-driven, with optional sharing. All progress is
stored privately on the device (localStorage) — no account or server required.

## Content sources

- Preach My Gospel (2023), Chapter 3 — the four lessons and their principles
- My Covenant Path — new-member action items and growth experiences
- General Handbook §26 — temple recommend interview questions

## Screens

Home, My covenant path, Lessons, Lesson detail (with completion celebration),
People (ministers/missionaries with call/text/email), Find a family name,
Prepare for the temple (baptisms for the dead and the endowment, kept separate),
Recommend readiness, and Daily check-in.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the production build
```

Stack: Vite + React + React Router, plain CSS, vite-plugin-pwa.

## Status

MVP. Not affiliated with or endorsed by the Church; content is summarized from
public materials for personal tracking.
