# CSS Basics :art:

CSS (Cascading Style Sheets) describes how HTML elements are to be displayed on screen, paper, or in other media.

## Demo

---

<iframe src="./demo.html" width="100%" height="350px" class="demo-frame"></iframe>

---

## The Box Model

All HTML elements can be considered as boxes. The CSS box model is essentially a box that wraps around every HTML element. It consists of:

- **Content**: The content of the box, where text and images appear.
- **Padding**: Clears an area around the content. The padding is transparent.
- **Border**: A border that goes around the padding and content.
- **Margin**: Clears an area outside the border. The margin is transparent.

```css
div {
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;
}
```

## Flexbox

Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.

```css
.container {
  display: flex; /* or inline-flex */
  justify-content: center; /* center items horizontally */
  align-items: center; /* center items vertically */
}
```

## Common Selectors

| Selector | Example | Description |
|----------|---------|-------------|
| .class | `.intro` | Selects all elements with class="intro" |
| #id | `#firstname` | Selects the element with id="firstname" |
| element | `p` | Selects all `<p>` elements |
| element,element | `div, p` | Selects all `<div>` and `<p>` elements |
| element element | `div p` | Selects all `<p>` elements inside `<div>` elements |

## Colors

Colors can be specified by:
- Predefined color names (e.g., `red`, `blue`)
- RGB values (e.g., `rgb(255, 0, 0)`)
- HEX values (e.g., `#ff0000`)
- HSL values (e.g., `hsl(0, 100%, 50%)`)
