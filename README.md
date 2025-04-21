# silentsheet

a quiet space to write. a minimalist text editor component for the web. no noise, no chrome, just words on a page.

[![npm version](https://img.shields.io/npm/v/@silentsheet/react.svg)](https://www.npmjs.com/package/@silentsheet/react)
[![npm downloads](https://img.shields.io/npm/dm/@silentsheet/react.svg)](https://www.npmjs.com/package/@silentsheet/react)
[![License](https://img.shields.io/npm/l/@silentsheet/react.svg)](https://github.com/hamzasaleem2/silentsheet/blob/main/LICENSE)

## features

- minimal toolbar that appears on hover
- hemingway mode for distraction-free forward writing
- three beautiful themes (light, sepia, night)
- three font families (serif, sans-serif, monospace)
- four sizes (small: 50%, medium: 75%, large: 90%, full: 100%)
- font size control (14-28px)
- 15-minute focus timer with start/stop/reset
- word and character count
- automatic content saving
- fully responsive design
- typescript support

## writing modes

silentsheet offers two writing modes:

### edit mode (default)
- full editing capabilities
- perfect for revision and refinement

### hemingway mode
- encourages forward momentum in writing
- prevents editing of previous lines
- helps maintain flow and reduce self-editing
- ideal for first drafts and stream of consciousness writing

## packages

this repository is a monorepo containing two packages:

- [@silentsheet/core](https://www.npmjs.com/package/@silentsheet/core) [![npm version](https://img.shields.io/npm/v/@silentsheet/core.svg)](https://www.npmjs.com/package/@silentsheet/core) - core functionality and state management
- [@silentsheet/react](https://www.npmjs.com/package/@silentsheet/react) [![npm version](https://img.shields.io/npm/v/@silentsheet/react.svg)](https://www.npmjs.com/package/@silentsheet/react) - react component with beautiful UI

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