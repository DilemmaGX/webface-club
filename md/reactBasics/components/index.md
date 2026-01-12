# React Components :jigsaw:

Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML via JSX.

## Demo: Reusable Components

In this demo, we use a single `User` component to display multiple users with different data.

---

<iframe src="./demo.html" width="100%" height="400px" class="demo-frame"></iframe>

---

## Function Components

The simplest way to define a component is to write a JavaScript function:

```tsx
function Welcome(props: { name: string }) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Props

Props (short for properties) are the way we pass data from parent to child components. They are read-only.

```tsx
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

## State

State allows components to create and manage their own data. Unlike props, state is private and fully controlled by the component.

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Lifecycle

In function components, we use the `useEffect` hook to perform side effects (like fetching data or subscribing to events) which corresponds to lifecycle methods in class components.

```tsx
import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  return <h1>Timer: {count}</h1>;
}
```
