# Chrome Extension Development Task List

## Project Setup
- [x] Initialize project with TypeScript and Vite
- [x] Create basic manifest.json (Manifest V3)
- [x] Set up development environment with hot reloading
- [x] Create initial README
- [x] Create base privacy policy

## Core Extension Structure
- [x] Create directory structure for extension components
  - background service worker
  - content scripts
  - popup
  - utils
  - types
- [x] Set up TypeScript configuration
- [x] Configure build process
- [x] Implement basic message passing between components

## Video Watching Tracking
- [ ] Implement content script for detecting video watch events
- [ ] Create storage schema for watched videos
- [ ] Set up chrome.storage.local for storing watch history
- [ ] Implement watch time threshold detection
- [ ] Add video metadata collection (title, ID, URL, etc.)

## Pairwise Comparison UI
- [ ] Design UI for comparison prompt
- [ ] Implement comparison modal/popup component
- [ ] Create logic for selecting which videos to compare
- [ ] Add user interaction handlers
- [ ] Implement API client for sending comparison results

## Video Difficulty Display
- [ ] Create content script for thumbnail modification
- [ ] Implement video ID extraction from page
- [ ] Create batch API client for fetching difficulty ratings
- [ ] Design and implement difficulty indicator UI
- [ ] Handle dynamic page loading (scroll events)
- [ ] Add mutation observers for dynamic content

## Extension Popup
- [ ] Design popup UI
- [ ] Implement language selection interface
- [ ] Create language preference storage
- [ ] Add user settings management

## API Integration
- [ ] Design API client architecture
- [ ] Implement API endpoints integration
- [ ] Create TypeScript interfaces for API responses

## Storage Management
- [ ] Design storage schema
- [ ] Implement storage utilities
- [ ] Add storage quota management

## Deployment
- [ ] Prepare for Chrome Web Store submission
- [ ] Create scaled versions of extension icon
- [ ] Create store assets
- [ ] Write store description
- [ ] Implement update mechanism

