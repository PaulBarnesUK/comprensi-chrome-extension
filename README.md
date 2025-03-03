# Language Level for YouTube

A Chrome extension that helps language learners track and rate the difficulty of YouTube videos through pairwise comparisons using the TrueSkill rating system.

## Features

- Track watched YouTube videos
- Rate video difficulty through pairwise comparisons
- Display difficulty indicators on video thumbnails
- Filter difficulty ratings by language
- Personalized language learning settings

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Chrome browser

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the extension for production
- `npm run preview` - Preview the production build
- `npm run check` - Type-check the codebase

### Loading the Extension

1. Build the extension:
   ```bash
   npm run build
   ```
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` directory

## Project Structure

```
src/
├── assets/         # Icons and static assets
├── background/     # Service worker
├── content/        # Content scripts
├── popup/          # Extension popup
├── types/         # TypeScript type definitions
└── utils/         # Shared utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - a permissive free software license that lets people do anything with your code with proper attribution and without warranty. See the [LICENSE](LICENSE) file for details.