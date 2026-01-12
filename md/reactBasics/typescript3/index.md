# TypeScript III: Advanced Types & Generics :blue_book:

## Generics

Generics allow you to create reusable components that work with a variety of types rather than a single one.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity<number>(100);
```

## Union Types

Union types allow a value to be one of several types.

```typescript
function padLeft(value: string, padding: string | number) {
  // ...
}
```

## Type Aliases

Type aliases create a new name for a type.

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

## Utility Types

TypeScript provides several utility types to facilitate common type transformations.

- `Partial<T>`: Constructs a type with all properties of T set to optional.
- `Readonly<T>`: Constructs a type with all properties of T set to readonly.
- `Pick<T, K>`: Constructs a type by picking the set of properties K from T.
- `Omit<T, K>`: Constructs a type by picking all properties from T and then removing K.

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
```
