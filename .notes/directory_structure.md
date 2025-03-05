# Chrome Extension Directory Structure
Generated on 2025-03-05 08:37:36

## Core Components

- LICENSE _(4 KB)_
- PRIVACY.md _(4 KB)_
- README.md _(4 KB)_
- eslint.config.js _(4 KB)_
- manifest.json _(4 KB)_
- package-lock.json _(184 KB)_
- package.json _(4 KB)_
- **src/**
    - **assets/**
        - icon32.png _(4 KB)_    - **background/**
        - index.ts _(4 KB)_    - **content/**
        - index.ts _(4 KB)_
        - **videoWatcher/**
            - detector.ts _(4 KB)_
            - events.ts _(4 KB)_
            - index.ts _(4 KB)_
            - reporting.ts _(4 KB)_
            - selectors.ts _(4 KB)_
            - types.ts _(4 KB)_
            - **utils/**
                - calculations.ts _(4 KB)_
                - metadata.ts _(4 KB)_
                - url.ts _(4 KB)_    - **popup/**
        - index.html _(4 KB)_
        - index.ts _(4 KB)_    - **types/**
        - index.ts _(4 KB)_    - **utils/**
        - storage.ts _(4 KB)_- tsconfig.json _(4 KB)_
- update_directory.sh _(4 KB)_
- vite.config.ts _(4 KB)_

## Notes
- Excluded directories: node_modules, .git, dist, build
- Excluded file extensions: .map, .log
