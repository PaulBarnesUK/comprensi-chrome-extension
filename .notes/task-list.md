# Chrome Extension Development Task List

## Project Setup
- [x] Initialize project with TypeScript and Vite
- [x] Create basic manifest.json (Manifest V3)
- [x] Set up development environment with hot reloading
- [x] Create initial README
- [x] Create base privacy policy
- [x] Set up linting and code formatting

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
- [x] Implement content script for detecting video watch events
- [x] Create storage schema for watched videos
- [x] Set up chrome.storage.local for storing watch history
- [x] Implement watch time threshold detection
- [x] Add video metadata collection (title, ID, URL, etc.) NOT NECESSARY, TO BE REMOVED IN FUTURE

## Pairwise Comparison UI
- [x] Design UI for comparison prompt
- [x] Implement comparison modal/popup component
- [x] Create logic for selecting which videos to compare
- [x] Add user interaction handlers
- [ ] Implement API client for sending comparison results

## Video Difficulty Display
- [x] Create content script for thumbnail modification
- [x] Implement video ID extraction from page
- [x] Create batch API client for fetching difficulty ratings
- [x] Design and implement difficulty indicator UI
- [x] Handle dynamic page loading (scroll events)
- [x] Add mutation observers for dynamic content

## Extension Popup
- [x] Design popup UI
- [x] Implement language selection interface
- [x] Create language preference storage

## API Integration
- [ ] Design API client architecture
- [ ] Implement API endpoints integration
- [ ] Create TypeScript interfaces for API responses

## Deployment
- [ ] Prepare for Chrome Web Store submission
- [ ] Create scaled versions of extension icon
- [ ] Create store assets
- [ ] Write store description
- [ ] Implement update mechanism

## TODOs
- [x] Fix video watch tracking logic (very brittle right now)
- [x] Fix bug where video doesn't track if navigating from main page (duration gets stuck at zero and state.currentVideo is null)
- [x] Fix bug where channel name and video title get parsed incorrectly - I think they're getting pulled in too early or something
- [x] Implement language check (video lang should match user selected langs) before rendering difficulty indicator
- [x] Implement language check (video lang should match user selected langs) before prompting user for difficulty comparison

