# YouTube Video Difficulty Rating Extension

## Project Overview
A Chrome extension that helps language learners track and rate the difficulty of YouTube videos they watch. The extension uses a TrueSkill-based rating system to establish relative difficulty levels for videos through pairwise comparisons, helping users find content appropriate for their learning level.

## Goals
- Help users find YouTube content matching their language learning level
- Create a collaborative difficulty rating system using pairwise comparisons
- Provide an unobtrusive and intuitive user experience
- Build a reliable and scalable system for tracking video difficulties

## Core Features
1. **Video Watch Tracking**
   - Automatic detection of watched videos
   - Local storage of watch history
   - Privacy-focused data collection

2. **Pairwise Comparison System**
   - User-friendly comparison prompts
   - TrueSkill-based rating calculations (via external API)
   - Intelligent pair selection for comparisons

3. **Difficulty Visualization**
   - Visual difficulty indicators on video thumbnails
   - Support for multiple YouTube page types
   - Dynamic updates for newly loaded content

4. **Language Preferences**
   - Select target languages for difficulty indicators
   - Filter difficulty displays by selected languages
   - Hide difficulty ratings for non-selected languages

## Technical Architecture

### Component Structure
1. **Background Service Worker**
   - Handles API communication
   - Manages storage operations
   - Coordinates extension components

2. **Content Scripts**
   - Video watch detection
   - Thumbnail modification
   - DOM observation and updates
   - Comparison UI injection

3. **Popup Interface**
   - Language preference management
   - User settings
   - Statistics display

4. **External API Integration**
   - TrueSkill calculations
   - Video metadata storage
   - Rating retrieval

### Data Flow
1. **Watch Detection**
   ```
   Content Script → Background Worker → Local Storage
   ```

2. **Comparison Flow**
   ```
   Content Script → User Input → Background Worker → API → Storage
   ```

3. **Difficulty Display**
   ```
   Page Load → Content Script → Background Worker → API → UI Update
   ```

### Storage Strategy
- Chrome's local storage for watch history
- Caching for difficulty ratings
- User preferences in sync storage
- External API for persistent data

## Technical Considerations

### Performance
- Efficient DOM manipulation
- Request batching and caching
- Lazy loading of difficulty data
- Debounced API calls

### Security
- Content Security Policy implementation
- Secure API communication
- Data sanitization
- Minimal permission requirements

### Privacy
- Local data storage preference
- Anonymous difficulty ratings
- Transparent data collection
- User consent management

## Development Workflow

### Build Setup
1. **Vite + TypeScript Configuration**
   - Use `vite-plugin-web-extension` for Chrome extension bundling
   - TypeScript configuration with strict mode
   - Path aliases for clean imports
   - Source maps for development

2. **Development Environment**
    - Hot Module Replacement (HMR) for popup and options pages
    - Auto-reload for content scripts and background worker
    - Watch mode for manifest changes
    - Environment variable management for dev/prod

### Testing Strategy
1. **Unit Testing**
   - Jest for utility functions and business logic
   - Mock chrome.* APIs using `chrome-extensions-mock`
   - Test UI components with `@testing-library/dom`

2. **Manual Testing**
   - Local extension loading workflow
   - Cross-browser compatibility checks
   - Performance profiling using DevTools
   - Security audit checklist

### Continuous Integration
1. **GitHub Actions Pipeline**
   - TypeScript type checking
   - Lint checks (ESLint + Prettier)
   - Build verification
   - Package size monitoring
   - Automated version bumping
   - Release artifact generation

2. **Release Process**
   - Semantic versioning
   - Changelog generation
   - ZIP package creation for Chrome Web Store
   - Release notes automation