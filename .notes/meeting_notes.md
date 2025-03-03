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