# @silentsheet/core

core functionality for silentsheet - a minimalist text editor.

## installation

```bash
npm install @silentsheet/core
```

## usage

```typescript
import { SilentSheet } from '@silentsheet/core';

// Create a new instance with optional initial state
const editor = new SilentSheet({
  content: 'Hello world',
  theme: 'light'
});

// Get current state
const state = editor.getState();

// Get actions
const actions = editor.getActions();

// Subscribe to UI changes
const unsubscribe = editor.subscribeToUI(() => {
  console.log('UI updated:', editor.getState());
});

// Example: Set content and save it
actions.setContent('New content');
actions.saveContent();

// Example: Toggle timer
actions.toggleTimer(); // Starts 15-minute timer
actions.resetTimer();  // Resets to 15:00

// Cleanup
unsubscribe();
```

## features

- automatic settings persistence in localStorage
- manual content persistence via `saveContent()`
- 15-minute focus timer with start/stop/reset
- four sizes (small, medium, large, full)
- font size control (number)
- three themes (light, sepia, night)
- three font families (serif, sans-serif, monospace)
- typescript support

## api

### constructor

```typescript
new SilentSheet(initialState?: Partial<SilentSheetState>)
```

Creates a new editor instance. The `initialState` is optional and will override both defaults and any saved state from localStorage. Timer state (running/seconds) is always reset on initialization.

### state

```typescript
interface SilentSheetState {
  content: string;
  font: 'serif' | 'sans-serif' | 'monospace';
  fontSize: number;
  theme: 'light' | 'sepia' | 'night';
  size: 'small' | 'medium' | 'large' | 'full';
  timerRunning: boolean;
  timerSeconds: number;
}
```

Default values:
```typescript
{
  content: '',
  font: 'sans-serif',
  fontSize: 24,
  theme: 'sepia',
  size: 'medium',
  timerRunning: false,
  timerSeconds: 900 // 15 minutes
}
```

### methods

- `getState(): SilentSheetState` - Get current state
- `getActions(): SilentSheetActions` - Get available actions
- `subscribeToUI(callback: () => void): () => void` - Subscribe to UI changes, returns unsubscribe function

### actions

- `setContent(content: string)` - Update content (does not auto-save)
- `saveContent()` - Save current content to localStorage
- `clearContent()` - Clear and save empty content
- `setFont(font: Font)` - Change font family (auto-saves)
- `setFontSize(size: number)` - Change font size (auto-saves)
- `setTheme(theme: Theme)` - Change theme (auto-saves)
- `setSize(size: Size)` - Change size (auto-saves)
- `toggleTimer()` - Start timer (15:00) or stop and reset if running
- `resetTimer()` - Stop timer and reset to 15:00

## storage

The editor uses localStorage with key 'silentsheet' to persist state. All UI settings (font, fontSize, theme, size) are automatically saved when changed. Content must be explicitly saved using `saveContent()`.

## license

mit © [hamza saleem](https://github.com/hamzasaleem2) 