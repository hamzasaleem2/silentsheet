# @silentsheet/core

## [0.2.0]

### Added
- Hemingway Mode functionality in core state management
  - New state property `hemingwayMode` to track editing mode
  - Enhanced content management to prevent editing of previous lines
  - Line-by-line content locking in Hemingway mode
  - Proper state persistence for Hemingway mode

## [0.1.1]

### Changed
- Version bump to align with React package

## [0.1.0]

### Added
- Initial release
- Core functionality for text editor
- State management with subscriptions
- 15-minute focus timer with start/stop/reset
- Theme customization (light, sepia, night)
- Font customization (serif, sans-serif, monospace)
- Font size control
- Size options (small, medium, large, full)
- Automatic settings persistence in localStorage
- Manual content persistence via saveContent()
- TypeScript support with full type definitions 