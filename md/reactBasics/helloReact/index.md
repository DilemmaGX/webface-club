# Hello React :atom_symbol:

React is a JavaScript library for building user interfaces.

## Live Demo (CDN)

Here is a simple React app running directly in the browser using CDN links.

---

<iframe src="./demo.html" width="100%" height="300px" class="demo-frame"></iframe>

---

## Creating a React App (Production)

While the CDN method above is great for learning, real-world apps use build tools like Vite.

### Step 1: Create Project

```bash
npm create vite@latest my-react-app -- --template react-ts
```

### Step 2: Install Dependencies

```bash
cd my-react-app
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

## Project Structure

When you create a project with Vite, you get:

- **index.html**: The entry point HTML file.
- **src/main.tsx**: The JavaScript entry point that mounts the React app.
- **src/App.tsx**: The main App component.

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
