# PomoPal

A tiny floating desktop Pomodoro tomato. Built with Electron, React, Vite, and Tailwind CSS.

## Features

- 25-minute focus / 5-minute break Pomodoro timer
- Transparent, frameless, always-on-top floating tomato (Mac-first)
- Drag the tomato itself to move the app
- Click the tomato to show time left and tiny icon controls
- Today's completed session count (saved in localStorage)

## Getting started

```bash
npm install
npm run dev
```

This starts Vite and opens the Electron window. The app loads at `http://localhost:5173` in development.

## Project structure

```
pomopal/
├── electron/          # Electron main & preload scripts
│   ├── main.ts        # Window setup (frameless, always on top)
│   └── preload.ts
├── public/assets/     # Tomato stage images
├── src/
│   ├── components/    # TomatoProgress and SessionBadge
│   ├── hooks/         # usePomodoro timer logic
│   ├── utils/         # localStorage & formatting helpers
│   ├── constants/     # Tomato stage image/progress helpers
│   ├── types/         # Shared TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Start dev server + Electron window   |
| `npm run build`   | Compile React + Electron           |
| `npm run package` | Build a Mac .dmg installer         |

## Tips

- Drag the tomato to move the app.
- Click the tomato to show the timer and controls.
- Session count resets automatically each calendar day.
