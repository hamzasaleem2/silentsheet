# silentsheet

a quiet space to write. a minimalist text editor component for the web. no noise, no chrome, just words on a page.

## features

- minimal toolbar that appears on hover
- three beautiful themes (light, sepia, night)
- three font families (serif, sans-serif, monospace)
- four sizes (small: 50%, medium: 75%, large: 90%, full: 100%)
- font size control (14-28px)
- 15-minute focus timer with start/stop/reset
- word and character count
- automatic content saving
- fully responsive design
- typescript support

## packages

this repository is a monorepo containing two packages:

- [@silentsheet/core](packages/core) - core functionality and state management
- [@silentsheet/react](packages/react) - react component with beautiful UI

## quick start

```bash
# install packages
npm install @silentsheet/core @silentsheet/react

# in your react app
import { SilentSheet } from '@silentsheet/react';
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

## development

```bash
# clone repository
git clone https://github.com/hamzasaleem2/silentsheet.git
cd silentsheet

# install dependencies
pnpm install

# build packages
pnpm build

# start development
pnpm dev
```

## philosophy

"not every tool needs a toolbar."

silentsheet is a quiet writing space for when you just need to think, write, and not be interrupted. inspired by a trend. built to last longer than one.

## license

mit © [hamza saleem](https://github.com/hamzasaleem2)

## acknowledgments

- inspired by minimalist writing tools
- built with react and typescript
- packaged with tsup

## contact

hamza saleem - [@hamzasaleem2](https://github.com/hamzasaleem2)

project link: [https://github.com/hamzasaleem2/silentsheet](https://github.com/hamzasaleem2/silentsheet) 