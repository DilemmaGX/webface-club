import { walk, ensureDir, dirname, join, relative, emptyDir, minify, emojify, MarkdownIt, Prism } from "./deps.ts"

// Import Prism languages for side effects
import "npm:prismjs@1.29.0/components/prism-diff.js";
import "npm:prismjs@1.29.0/components/prism-javascript.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-jsx.js";
import "npm:prismjs@1.29.0/components/prism-tsx.js";
import "npm:prismjs@1.29.0/components/prism-css.js";
import "npm:prismjs@1.29.0/components/prism-cshtml.js";
import "npm:prismjs@1.29.0/components/prism-markdown.js";
import "npm:prismjs@1.29.0/components/prism-json.js";
import "npm:prismjs@1.29.0/components/prism-xml-doc.js";
import "npm:prismjs@1.29.0/components/prism-sql.js";
import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-python.js";
import "npm:prismjs@1.29.0/components/prism-java.js";
import "npm:prismjs@1.29.0/components/prism-c.js";
import "npm:prismjs@1.29.0/components/prism-cpp.js";
import "npm:prismjs@1.29.0/components/prism-csharp.js";
import "npm:prismjs@1.29.0/components/prism-php-extras.js";
import "npm:prismjs@1.29.0/components/prism-ruby.js";
import "npm:prismjs@1.29.0/components/prism-go.js";
import "npm:prismjs@1.29.0/components/prism-swift.js";
import "npm:prismjs@1.29.0/components/prism-kotlin.js";
import "npm:prismjs@1.29.0/components/prism-rust.js";
import "npm:prismjs@1.29.0/components/prism-dart.js";
import "npm:prismjs@1.29.0/components/prism-yaml.js";

const LOG: boolean = Deno.args.includes("build") || Deno.args.includes("test");
const iconhref = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij4NCiAgPHN0eWxlPg0KICAgIHBhdGggew0KICAgICAgZmlsbDogIzAwMDAwMDsNCiAgICB9DQoNCiAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7DQogICAgICBwYXRoIHsNCiAgICAgICAgZmlsbDogI0ZGRkZGRjsNCiAgICAgIH0NCiAgICB9DQoNCiAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkgew0KICAgICAgcGF0aCB7DQogICAgICAgIGZpbGw6ICMwMDAwMDA7DQogICAgICB9DQogICAgfQ0KICA8L3N0eWxlPg0KICA8cGF0aCBkPSJNOCAwYzQuNDIgMCA4IDMuNTggOCA4YTguMDEzIDguMDEzIDAgMCAxLTUuNDUgNy41OWMtLjQuMDgtLjU1LS4xNy0uNTUtLjM4IDAtLjI3LjAxLTEuMTMuMDEtMi4yIDAtLjc1LS4yNS0xLjIzLS41NC0xLjQ4IDEuNzgtLjIgMy42NS0uODggMy42NS0zLjk1IDAtLjg4LS4zMS0xLjU5LS44Mi0yLjE1LjA4LS4yLjM2LTEuMDItLjA4LTIuMTIgMCAwLS42Ny0uMjItMi4yLjgyLS42NC0uMTgtMS4zMi0uMjctMi0uMjctLjY4IDAtMS4zNi4wOS0yIC4yNy0xLjUzLTEuMDMtMi4yLS44Mi0yLjItLjgyLS40NCAxLjEtLjE2IDEuOTItLjA4IDIuMTItLjUxLjU2LS44MiAxLjI4LS44MiAyLjE1IDAgMy4wNiAxLjg2IDMuNzUgMy42NCAzLjk1LS4yMy4yLS40NC41NS0uNTEgMS4wNy0uNDYuMjEtMS42MS41NS0yLjMzLS42Ni0uMTUtLjI0LS42LS44My0xLjIzLS44Mi0uNjcuMDEtLjI3LjM4LjAxLjUzLjM0LjE5LjczLjkuODIgMS4xMy4xNi40NS42OCAxLjMxIDIuNjkuOTQgMCAuNjcuMDEgMS4zLjAxIDEuNDkgMCAuMjEtLjE1LjQ1LS41NS4zOEE3Ljk5NSA3Ljk5NSAwIDAgMSAwIDhjMC00LjQyIDMuNTgtOCA4LThaIj48L3BhdGg+DQo8L3N2Zz4=";

// Setup MarkdownIt with Prism
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && Prism.languages[lang]) {
      try {
        return '<pre class="language-' + lang + '"><code class="language-' + lang + '">' +
               Prism.highlight(str, Prism.languages[lang], lang) +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="language-text"><code class="language-text">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

interface SidebarItem {
  type: 'category' | 'link';
  title: string;
  path?: string;
}

let sidebarItems: SidebarItem[] = [];

function parseSidebar(content: string): SidebarItem[] {
  const lines = content.split("\n");
  const items: SidebarItem[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") && !trimmed.startsWith("- [")) {
      items.push({ type: 'category', title: trimmed.substring(2).trim() });
    } else if (trimmed.startsWith("- [")) {
      const match = trimmed.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        let path = match[2];
        if (path.startsWith("./")) path = path.substring(2);
        items.push({ type: 'link', title: match[1], path });
      }
    }
  }
  return items;
}

function renderSidebarHtml(items: SidebarItem[], currentOutputPath: string): string {
  let html = '<div class="sidebar-nav">';
  let inGroup = false;

  const distRoot = join(Deno.cwd(), "dist");
  
  for (const item of items) {
    if (item.type === 'category') {
      if (inGroup) html += '</div>';
      html += `<div class="nav-group"><div class="nav-group-title">${item.title}</div>`;
      inGroup = true;
    } else if (item.type === 'link' && item.path) {
      if (!inGroup) {
         html += '<div class="nav-group">';
         inGroup = true;
      }
      
      const targetAbs = join(distRoot, item.path);
      let relPath = relative(dirname(currentOutputPath), targetAbs);
      relPath = relPath.replace(/\\/g, "/");
      const isActive = currentOutputPath === targetAbs ? ' active' : '';
      
      html += `<a href="${relPath}" class="nav-link${isActive}">${item.title}</a>`;
    }
  }
  if (inGroup) html += '</div>';
  html += '</div>';
  return html;
}

async function injectDemoSources(content: string, markdownPath: string): Promise<string> {
  const regex = /<iframe[^>]*src="([^"]+)"[^>]*class="demo-frame"[^>]*><\/iframe>/g;
  let match;
  let newContent = content;
  
  // We need to iterate and replace. Since string is immutable and we are async, 
  // let's collect replacements first.
  const replacements: {match: string, replacement: string}[] = [];

  while ((match = regex.exec(content)) !== null) {
    const iframeTag = match[0];
    const src = match[1];
    
    try {
      // Resolve path
      const demoPath = join(dirname(markdownPath), src);
      const demoContent = await Deno.readTextFile(demoPath);
      
      const sourceBlock = `
<details>
<summary>👀 View Source</summary>

\`\`\`html
${demoContent}
\`\`\`

</details>
`;
      replacements.push({
        match: iframeTag,
        replacement: iframeTag + "\n" + sourceBlock
      });
    } catch (e) {
      console.warn(`Could not read demo file for ${src} in ${markdownPath}:`, e);
    }
  }

  for (const rep of replacements) {
    newContent = newContent.replace(rep.match, rep.replacement);
  }
  
  return newContent;
}

async function mdToHtml(markdownPath: string): Promise<void> {
  let content = await Deno.readTextFile(markdownPath);
  
  // Inject Demo Sources
  content = await injectDemoSources(content, markdownPath);

  // Use MarkdownIt instead of gfm.render
  const html = md.render(emojify(content));

  const relativePath = markdownPath.substring(Deno.cwd().length + 4); // remove "/md/"
  const outputPath = join("dist", relativePath.replace(".md", ".html"));
  await ensureDir(dirname(outputPath));

  // Title extraction logic
  const titleMatch = content.match(/^(.*?)(?=\n|$)/s);
  let title = "WebFace Club";
  if (titleMatch && titleMatch.length > 1) {
     const rawTitle = titleMatch[1].trim().replace(/^#\s*/, '');
     if (rawTitle && rawTitle.length < 50) {
        title = rawTitle;
     }
  }
  // Remove markdown from title
  title = md.renderInline(emojify(title)).replace(/<[^>]*>/g, '');
  if (!title.trim()) title = "WebFace Club";

  const relativeRoot = relative(dirname(outputPath), "dist");
  const stylePath = join(relativeRoot, "styles.css").replace(/\\/g, "/");
  const homePath = join(relativeRoot, "index.html").replace(/\\/g, "/");
  const routerPath = join(relativeRoot, "router.js").replace(/\\/g, "/");
  
  const sidebarHtml = renderSidebarHtml(sidebarItems, outputPath);

  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="icon" type="image/x-icon" href="${iconhref}">
      <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.6.1/github-markdown.css">
      <link rel="stylesheet" href="${stylePath}">
      <script src="${routerPath}" defer></script>
    </head>
    <body>
      <div class="app-layout">
        <aside class="sidebar">
          <div class="sidebar-header">
            <h1 class="sidebar-title"><a href="${homePath}">WebFace Club 😎</a></h1>
          </div>
          ${sidebarHtml}
          <div class="theme-toggle">
            <button class="btn-toggle" id="theme-btn">
               🌓 Toggle Theme
            </button>
          </div>
        </aside>
        <div class="main-content">
          <header class="navbar">
             <div class="navbar-nav">
               <a href="${homePath}" class="navbar-link">Home</a>
               <a href="https://github.com/DilemmaGX/webface-club" class="navbar-link" target="_blank">GitHub</a>
             </div>
          </header>
          <main class="page-content">
            <div class="markdown-body">
              ${html}
            </div>
          </main>
        </div>
      </div>
      <script>
        // Theme Logic
        const themeBtn = document.getElementById('theme-btn');
        const htmlElement = document.documentElement;
        
        // Check local storage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
          htmlElement.setAttribute('data-theme', currentTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          htmlElement.setAttribute('data-theme', 'dark');
        }

        themeBtn.addEventListener('click', () => {
          const current = htmlElement.getAttribute('data-theme');
          const next = current === 'dark' ? 'light' : 'dark';
          htmlElement.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
        });
        
        console.log("Made with Moska");
      </script>
    </body>
    </html>
  `;
  await Deno.writeTextFile(outputPath, template);
}

async function main() {
  if (LOG) console.log(emojify(":file_folder: Cleaning..."));
  await emptyDir("dist");
  
  // Copy styles
  await Deno.copyFile("src/styles.css", "dist/styles.css");
  await Deno.copyFile("src/router.js", "dist/router.js");
  
  // Parse Index for Sidebar
  try {
    const indexContent = await Deno.readTextFile("md/index.md");
    sidebarItems = parseSidebar(indexContent);
  } catch (e) {
    console.error("Error parsing index.md:", e);
  }

  if (LOG) console.log(emojify(":cd: Parsing..."));
  for await (const walkEntry of walk(Deno.cwd() + "/md")) {
    if (walkEntry.isFile && walkEntry.name.endsWith(".md")) {
      if (LOG) console.log(emojify(":coffee: Processing file"), walkEntry.path);
      await mdToHtml(walkEntry.path);
    } else if (walkEntry.isFile) {
      if (LOG) console.log(emojify(":coffee: Copying file"), walkEntry.path);
      const sourcePath = walkEntry.path;
      // Fix: Correctly calculate relative path for files not in /md root if needed
      // But assuming walk returns absolute paths and we want dist structure to mirror md structure
      const relativePath = sourcePath.substring(Deno.cwd().length + 3); // removes /md... wait
      // sourcePath is .../md/subdir/file.ext
      // Deno.cwd() is ...
      // Deno.cwd() + "/md" length?
      // Actually, let's use relative path from md dir
      const relToMd = relative(join(Deno.cwd(), "md"), sourcePath);
      const outputPath = join("dist", relToMd);
      
      await ensureDir(dirname(outputPath));
      await Deno.copyFile(sourcePath, outputPath);
    }
  }
  
  if (LOG) console.log(emojify(":bell: Minifying files..."));
  for await (const walkEntry of walk(Deno.cwd() + "/dist")) {
    if (walkEntry.isFile && (walkEntry.name.endsWith(".html") || walkEntry.name.endsWith(".css") || walkEntry.name.endsWith(".js"))) {
      if (LOG) console.log(emojify(":bell: Minifying file"), walkEntry.path);
      try {
          const minifiedContent = await minify(walkEntry.path);
          await Deno.writeTextFile(walkEntry.path, minifiedContent);
      } catch (e) {
          console.warn(`Failed to minify ${walkEntry.path}:`, e);
      }
    }
  }
  if (LOG) console.log(emojify(":rocket: Ready to deploy"));
}

await main();

Deno.exit();
