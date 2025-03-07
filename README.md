# Language Level for YouTube

A Chrome extension that helps language learners by estimating the difficulty level of YouTube videos through community feedback. By collaboratively rating videos through pairwise comparisons, users contribute to a community-driven system that enhances everyone's learning experience.

## Features

- Track watched YouTube videos
- Rate video difficulty through pairwise comparisons
- Display difficulty indicators on video thumbnails
- Filter difficulty ratings by language
- Personalized language learning settings
- Support for multiple languages: French, Spanish, Italian, German, Portuguese, English, Hindi, Korean, Japanese, and Chinese

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

### Directory Structure Documentation

This project includes a Bash script that generates a detailed directory structure markdown file:

- `update_directory.sh` - Generates a comprehensive directory structure in `.notes/directory_structure.md`

To update the directory structure documentation:

```bash
./update_directory.sh
```

This is to give AI coders context of the full codebase.

#### Git Hook Setup (Optional)

For developers who want to keep the directory structure documentation automatically updated:

1. Create a pre-commit hook:
   ```bash
   cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
   ```

2. Edit the pre-commit hook:
   ```bash
   #!/bin/bash
   
   # Get the root directory of the Git repository
   REPO_ROOT=$(git rev-parse --show-toplevel)
   
   echo "Running directory structure update script..."
   # Run the update_directory.sh script
   $REPO_ROOT/update_directory.sh
   
   # Add the updated directory structure file to the commit
   git add $REPO_ROOT/.notes/directory_structure.md
   
   # Exit with success status
   exit 0
   ```

3. Make it executable:
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

This will automatically update the directory structure documentation before each commit.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - a permissive free software license that lets people do anything with your code with proper attribution and without warranty. See the [LICENSE](LICENSE) file for details.