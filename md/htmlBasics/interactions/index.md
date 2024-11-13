# Interactions :point_up::nerd_face:

## Demo

---

<iframe
    src="./demo.html"
    width="500px"
    height="200px"
></iframe>

---

<details>
    <summary>View source code</summary>

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <!-- Alert Button -->
    <button onclick="alert('button clicked')">Alert</button>
    <!-- Log Button -->
    <button onclick="console.log('button clicked')">Log</button>
</body>

</html>
```

In this demo, we have two buttons. The first one uses the `alert` function to display a message box when clicked. The second button uses `console.log` to output a message to the browser's console, which is useful for debugging.
</details>

### Key Concepts

1. **Event Handling**: The `onclick` attribute is an event handler that triggers a function when the user clicks the button.
2. **Alert and Console**: `alert` is used for user notifications, while `console.log` is for logging messages to the console.

### Expanding Your Skills

As you become more comfortable with JavaScript, you'll want to explore more complex interactions:

- **DOM Manipulation**: Learn how to change the content, class, or style of HTML elements dynamically.
- **Event Listeners**: Instead of inline event handlers, use `addEventListener` for better control and separation of concerns.
- **AJAX and APIs**: Fetch data from servers and update the page without reloading.

---

## DOM Manipulation

### Introduction

The Document Object Model (DOM) is a programming interface for HTML and XML documents. It provides a structured representation of the document, allowing you to manipulate documents efficiently.

### Accessing Elements

To manipulate the DOM, you first need to access elements. Here's how you can do it:

```javascript
// By ID
var element = document.getElementById('myElement');

// By class
var elements = document.getElementsByClassName('myClass');

// By tag name
var elements = document.getElementsByTagName('p');

// By query selector
var element = document.querySelector('.myClass');
var elements = document.querySelectorAll('.myClass');
```

> [!NOTE] Use `querySelectorAll` when you need to access multiple elements with the same selector.

### Modifying Elements

Once you have accessed an element, you can change its content, attributes, and styles.

```javascript
// Change text content
element.textContent = 'New content';

// Change HTML content
element.innerHTML = '<strong>New content</strong>';

// Change attributes
element.setAttribute('href', 'https://example.com');

// Change styles
element.style.color = 'red';
```

### Creating and Inserting Elements

You can also create new elements and insert them into the DOM.

```javascript
// Create a new element
var newElement = document.createElement('div');

// Set attributes and content
newElement.id = 'newDiv';
newElement.textContent = 'This is a new div';

// Append to an existing element
document.body.appendChild(newElement);
```

### Event Listeners

Using `addEventListener` is a more modern and flexible way to handle events.

```javascript
// Add an event listener
element.addEventListener('click', function() {
    alert('Element clicked!');
});
```

> [!TIP] Remember to remove event listeners when they are no longer needed to prevent memory leaks.

### Best Practices

- **Separation of Concerns**: Keep your JavaScript separate from your HTML whenever possible.
- **Performance**: Be mindful of performance when manipulating the DOM, especially in loops or large documents.
- **Accessibility**: Ensure that your DOM manipulations do not negatively impact the accessibility of your web pages.

By mastering DOM manipulation, you'll be able to create dynamic and interactive web applications. Happy coding!
