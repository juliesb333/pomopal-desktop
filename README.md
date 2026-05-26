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
├── build/             # Packaging resources, including the app icon
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
| `npm run build` | Compile the React/Vite app and Electron main/preload files |
| `npm run pack` | Build an unpacked macOS `.app` for local testing |
| `npm run dist:mac` | Build distributable macOS `.dmg` and `.zip` files |
| `npm run dist` | Alias for `npm run dist:mac` |
| `npm run package` | Alias for `npm run dist:mac` |

## Packaging

Create a production Mac build with:

```bash
npm run dist:mac
```

The command first runs `npm run build`, then packages PomoPal with `electron-builder`.
Output is written to the `release/` folder. Depending on your Mac architecture, you should see files like:

- `release/PomoPal-1.0.0-x64.dmg`
- `release/PomoPal-1.0.0-x64.zip`

The packaged app uses `build/icon.icns` and keeps the frameless, transparent, always-on-top tomato window behavior from `electron/main.ts`.

## Website

The `docs/` folder contains a simple GitHub Pages landing page for PomoPal.
It links the download button to the latest GitHub Release:

```text
https://github.com/juliesb333/pomopal-desktop/releases/latest
```

To publish it:

1. Push this repo to GitHub.
2. Open the repository settings on GitHub.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Choose the `main` branch and `/docs` folder.
6. Save.

After GitHub Pages finishes deploying, the site should be available at:

```text
https://juliesb333.github.io/pomopal-desktop/
```

## Tips

- Drag the tomato to move the app.
- Click the tomato to show the timer and controls.
- Session count resets automatically each calendar day.
