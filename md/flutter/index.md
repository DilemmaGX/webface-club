# Flutter Basics :bird:

Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It uses the **Dart** programming language.

## Key Features

- **Fast Development**: Hot Reload helps you quickly and easily experiment, build UIs, add features, and fix bugs.
- **Expressive and Flexible UI**: Built-in beautiful Material Design and Cupertino (iOS-flavor) widgets.
- **Native Performance**: Flutter incorporates all critical platform differences such as scrolling, navigation, icons and fonts.

## Getting Started

1. **Install Flutter SDK**: Download from [flutter.dev](https://flutter.dev).
2. **Set up Editor**: VS Code or Android Studio with Flutter/Dart plugins.
3. **Create Project**: `flutter create my_app`
4. **Run**: `flutter run`

## Hello World

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

## Widgets: The Building Blocks

Everything in Flutter is a widget. From layout models to structural elements (like buttons and text) to layout aspects (like padding).

### 1. StatelessWidget

Immutable widgets that don't change their state once built.

```dart
class MyText extends StatelessWidget {
  const MyText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('I am static');
  }
}
```

### 2. StatefulWidget

Widgets that maintain state that might change during the lifetime of the widget.

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => _count++),
      child: Text('Count: $_count'),
    );
  }
}
```

## Common Layout Widgets

- **Container**: A convenience widget that combines common painting, positioning, and sizing widgets.
- **Row**: Layout a list of child widgets in the horizontal direction.
- **Column**: Layout a list of child widgets in the vertical direction.
- **Stack**: Position children relative to the edges of the box.
- **ListView**: A scrollable list of widgets.

## Dependency Management

Flutter uses `pubspec.yaml` to manage dependencies.

```yaml
dependencies:
  flutter:
    sdk: flutter
  # Add external packages here
  http: ^1.1.0
```

You can find packages at [pub.dev](https://pub.dev).
