# Node.js & NPM :package:

## Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side.

### Key Concepts

- **Asynchronous & Event Driven**: Non-blocking I/O operations.
- **Single Threaded**: Uses a single threaded event loop.
- **Cross Platform**: Runs on Windows, Linux, Unix, macOS.

### Simple HTTP Server

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## NPM (Node Package Manager)

NPM is the default package manager for Node.js.

### Common Commands

- `npm init`: Initialize a new project (creates package.json).
- `npm install <package>`: Install a package.
- `npm install`: Install dependencies from package.json.
- `npm start`: Run the start script defined in package.json.
- `npm run <script>`: Run a custom script.
