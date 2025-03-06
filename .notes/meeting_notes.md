# Meeting Notes

## March 3, 2024 - Initial Project Planning

### Project Requirements Discussion
- Chrome extension for YouTube video difficulty rating using TrueSkill algorithm
- External API will handle TrueSkill calculations
- Focus on normal YouTube videos (excluding Shorts)

### Core Functionality Requirements
1. Video Watch Tracking
   - Track watched videos in browser local storage
   - Store necessary video metadata

2. Pairwise Comparison
   - Prompt users to compare difficulty of watched videos
   - Send comparison data to external API
   - Trigger after watching videos

3. Difficulty Display
   - Show difficulty indicators on video thumbnails
   - Handle multiple page types (homepage, search results)
   - Support dynamic content loading (e.g. when user scrolls down page to load more videos)
   - Filter by user's selected languages

4. Language Settings
   - Allow users to select target languages
   - Only show difficulties for selected languages

### Key Decisions
- Using TypeScript for development
- Following Manifest V3 requirements
- Implementing local storage for watch history
- Creating modular architecture with separate concerns

### Continuous Development Practices
We will implement these practices throughout development rather than as isolated tasks:

1. **Testing**
   - Write unit tests alongside new features
   - Add integration tests for component interactions
   - Perform E2E testing for critical user flows
   - Set up CI pipeline incrementally

2. **Performance**
   - Implement caching strategies as features are built
   - Optimize API calls and DOM operations
   - Monitor and improve performance metrics
   - Add lazy loading where appropriate

3. **Security**
   - Follow security best practices from the start
   - Implement CSP headers progressively
   - Regular security audits
   - Data sanitization in all user inputs

4. **Documentation**
   - Maintain JSDoc comments with code
   - Update technical documentation as we build
   - Keep README current
   - Document API integrations as implemented

5. **Code Quality**
   - Use ESLint and Prettier
   - Regular code reviews
   - Maintain consistent coding standards
   - Refactor as needed

### Action Items
- Created initial task list
- Established project structure documentation
- Defined technical architecture
- Set up documentation tracking

### Next Steps
- Begin project setup with build tools
- Create initial manifest.json
- Set up development environment
- Start implementing core functionality

### Notes
- Need to consider handling of dynamically loaded content
- Important to implement efficient caching for API responses
- Must ensure unobtrusive user experience
- Privacy considerations for watch history storage 

## March 5, 2024 - Pairwise Comparison UI Design

### UI/UX Decisions
- Implemented a full-page modal design for video comparisons
- Modal will appear automatically when a video ends
- Modal includes three options: "This was harder" (for each video) and "Both equally difficult"
- Added community-focused messaging: "Your feedback helps fellow learners find videos that match their level. Every vote counts!"

### Design Elements
- Clear question: "Which video was harder to understand?"
- Video thumbnails with channel information and view counts
- Explicit action buttons with clear labeling
- Option to skip comparison
- Semi-transparent overlay to focus attention

### Implementation Plan
- For the first iteration, we will only implement the end-of-video modal
- Future iterations may include additional trigger points in the user journey
- Need to ensure the modal doesn't appear too frequently to avoid user fatigue

### Design Considerations
- Balance between being noticeable and not overly intrusive
- Clear visual hierarchy to guide user actions
- Community-focused language to encourage participation
- Simple, straightforward interaction flow

### Next Steps
- Implement the modal UI in code
- Create logic for determining when to show comparisons
- Test user experience with different timing scenarios
- Develop backend integration for sending comparison results 

## March 6, 2024 - Video Difficulty Display Implementation Plan

### Implementation Approach
We've decided to break down the Video Difficulty Display feature into smaller, manageable chunks to ensure clarity and maintainability:

1. **Basic Difficulty Indicator Component**
   - Create a new directory structure for the feature
   - Design and implement the basic indicator UI component
   - Test with static injection

2. **Video ID Extraction**
   - Implement functions to extract video IDs from thumbnails
   - Create utilities to identify thumbnail elements
   - Test extraction with console logging

3. **API Client for Difficulty Ratings**
   - Create a mocked API client initially
   - Implement batch fetching functionality
   - Define TypeScript interfaces for API responses

4. **Thumbnail Modification**
   - Create functions to inject indicators into thumbnails
   - Test with static/mocked data

5. **Dynamic Content Handling**
   - Implement mutation observers for new thumbnails
   - Add scroll event handling for lazy-loaded content
   - Optimize for performance

6. **Integration and Refinement**
   - Connect all components
   - Add error handling and fallbacks
   - Optimize performance
   - Integrate with user settings

### Key Decisions
- Start with a mocked API client to focus on UI implementation
- Implement one chunk at a time with testing between each step
- Follow a modular approach with clear separation of concerns
- Ensure each component is well-documented

### Next Steps
- Begin implementation of the basic difficulty indicator component
- Create the directory structure for the feature
- Design the indicator UI based on the provided designs 

## March 6, 2024 - Video ID Extraction Approach (Chunk 2)

### Data Structure Design
We've decided on the following data structure for tracking videos:

```typescript
interface DifficultyData {
  score: number;
  sigma: number; // Confidence/uncertainty
  language: string; // Language of the video content
}

interface VideoData {
  videoId: string;
  difficulty?: DifficultyData;
}

// Main tracking object
const videoRegistry: Record<string, VideoData> = {};
```

### Implementation Approach
1. **DOM Processing**:
   - Use data attributes to mark processed thumbnails (`data-difficulty-processed="true"`)
   - Use separate attribute for thumbnails with indicators (`data-difficulty-indicator="true"`)
   - Query selectors will filter out already processed elements for efficiency

2. **Thumbnail Scanning**:
   - Scan for thumbnails that haven't been processed yet
   - Extract video IDs and add to registry if not already present
   - Mark thumbnails as processed in the DOM
   - Batch fetch difficulty data for new video IDs only

3. **Indicator Injection**:
   - After receiving API data, update the registry with difficulty information
   - Find thumbnail elements for each video ID that don't have indicators yet
   - Create and inject difficulty indicators using the React component
   - Use language information from the API response

4. **Dynamic Content Handling**:
   - Use MutationObserver to detect new thumbnails
   - Apply the same processing logic to newly detected thumbnails
   - Implement debouncing to avoid excessive API calls during scrolling

### Key Decisions
- Use DOM data attributes rather than in-memory flags for tracking processed elements
- Only query for unprocessed elements to improve performance
- Wait for API data to provide language information
- Separate the concepts of "processed" (scanned and in registry) and "has indicator" (visual element added)

### Next Steps
- Implement video ID extraction from thumbnail elements
- Create the registry data structure
- Set up thumbnail scanning functionality
- Create a mock API client for testing 