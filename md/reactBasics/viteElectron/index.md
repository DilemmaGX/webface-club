# Vite & Electron :rocket:

## Vite

Vite (French for "quick") is a build tool that aims to provide a faster and leaner development experience for modern web projects.

### Features

- Instant Server Start
- Lightning Fast HMR (Hot Module Replacement)
- Rich Features (TypeScript, JSX, CSS, etc.)
- Optimized Build

### Getting Started

```bash
npm create vite@latest
```

## Electron

Electron is a framework for building desktop applications using JavaScript, HTML, and CSS.

### How it works

Electron embeds Chromium and Node.js to enable you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux.

### Quick Start

1. Initialize project: `npm init -y`
2. Install Electron: `npm install --save-dev electron`
3. Add start script in `package.json`: `"start": "electron ."`
4. Create `main.js` (entry point) and `index.html`.

```javascript
// main.js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```
