# @silentsheet/react

react component for silentsheet - a minimalist text editor.

## installation

```bash
npm install @silentsheet/core @silentsheet/react
```

## usage

```tsx
import { SilentSheet } from '@silentsheet/react';
// Don't forget to import the styles
import '@silentsheet/react/dist/index.css';

function App() {
  return (
    <SilentSheet
      placeholder="Begin your story here..."
      onChange={(text) => console.log(text)}
    />
  );
}
```

## props

```typescript
interface Props {
  // custom placeholder text (default: "Begin your story here...")
  placeholder?: string;
  
  // callback when content changes
  onChange?: (text: string) => void;
}
```

## features

- minimal toolbar that appears on hover
- three beautiful themes (light, sepia, night)
- three font families (monospace, sans-serif, serif)
- four sizes (small: 50%, medium: 75%, large: 90%, full: 100%)
- font size control (14-28px)
- 15-minute focus timer with start/stop/reset
- word and character count
- automatic content saving (1s debounce + on blur)
- automatic settings persistence
- subtle "open source" link in top-right
- fully responsive design
- typescript support

## defaults

The component uses these defaults from @silentsheet/core:
```typescript
{
  font: 'sans-serif',
  fontSize: 24,
  theme: 'sepia',
  size: 'medium'
}
```

## styling

The component requires the CSS file to be imported for proper styling:

```tsx
import '@silentsheet/react/dist/index.css';
```

## license

mit © [hamza saleem](https://github.com/hamzasaleem2)