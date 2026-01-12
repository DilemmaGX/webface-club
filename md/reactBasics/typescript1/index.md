# TypeScript I: Introduction & Basic Types :blue_book:

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components.

## Why TypeScript?

- **Static Typing**: Catch errors at compile time rather than runtime.
- **Better IDE Support**: Autocomplete, navigation, and refactoring.
- **Readability**: Types serve as documentation.

## Basic Types

```typescript
// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;

// String
let color: string = "blue";
color = 'red';

// Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10]; // OK

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any (Try to avoid this)
let notSure: any = 4;
notSure = "maybe a string instead";

// Void
function warnUser(): void {
    console.log("This is my warning message");
}
```
