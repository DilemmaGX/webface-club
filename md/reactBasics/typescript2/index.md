# TypeScript II: Interfaces & Classes :blue_book:

## Interfaces

One of TypeScript's core principles is that type checking focuses on the shape that values have. This is sometimes called "duck typing" or "structural subtyping".

```typescript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

### Optional Properties

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

### Readonly Properties

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

## Classes

TypeScript adds full object-oriented class support.

```typescript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

### Inheritance

```typescript
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
```
