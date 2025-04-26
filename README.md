# Language Level for YouTube

This Chrome extension is for language learners using YouTube for comprehensible input. It overlays community-sourced difficulty scores onto video thumbnails, letting you know whether a video matches your level without needing to watch it first.

It's all based on user feedback so it will, every now and then, ask you to compare 2 recent videos you've watched and select the one you found easiest - that will then be used to help calculate the difficulty scores. It takes a few votes for it to be confident in a video's difficulty level but once it is, you will see an indicator over the video's thumbnail when browsing through YouTube.

![Difficulty scores on YouTube thumbnails](/docs/images/difficulty-indicators-preview.png)

[→ Install the extension now](https://github.com/PaulBarnesUK/youtube-language-level/releases/latest)

## Features

- **Visual Indicators**: See difficulty scores directly on YouTube thumbnails
- **Multiple Languages**: Support for 10 languages including Spanish, French, German, and more
- **Contribute by Comparing**: Simple comparisons after watching videos help improve the system

## Quick Start

1. [Install the extension](#installation)
2. Open the extension popup and select your target language(s)
3. Browse YouTube normally - you'll see difficulty scores on thumbnails
4. After watching videos, respond to occasional comparison prompts - the more videos we compare, the better the experience is for everyone.

## How It Works

The extension overlays difficulty scores on YouTube thumbnails with scores out of 100. These scores are **relative** - they show how difficult a video is compared to other videos in the system.

When you watch videos, you'll occasionally be asked which one was easier to understand. The system then leverages the [TrueSkill algorithm](https://en.wikipedia.org/wiki/TrueSkill) to take this user feedback and, over time, converge to a difficulty score that it is confident is correct. There are varying levels of confidence, the level of confidence at which difficulty scores will start displaying is when the algorithm is 95% confident that the calculated difficulty score is within 15 of it's "true" score.

## Installation

**[Watch the video installation guide](https://youtu.be/raZLk-4FvfI)** or follow the steps below:

1. Download the [latest release zip file](https://github.com/PaulBarnesUK/youtube-language-level/releases/latest)
2. Unzip the file to a location on your computer
3. Open Chrome and navigate to `chrome://extensions`
4. Enable "Developer mode" using the toggle in the top-right corner
5. Click "Load unpacked" and select the unzipped folder
6. The extension should now be installed and active

Note: This is a development version, as an early user you will help shape what the final version looks like. The extension will soon be available on the Chrome Web Store.

## Supported Languages

| Language | Flag |     | Language   | Flag |
| -------- | ---- | --- | ---------- | ---- |
| Spanish  | 🇪🇸   |     | Portuguese | 🇧🇷   |
| French   | 🇫🇷   |     | Japanese   | 🇯🇵   |
| German   | 🇩🇪   |     | Korean     | 🇰🇷   |
| Italian  | 🇮🇹   |     | Hindi      | 🇮🇳   |
| English  | 🇬🇧   |     | Chinese    | 🇨🇳   |

Select your target languages in the extension popup to see difficulty indicators for those languages.

## FAQ

### I don't see any difficulty scores, what's up??

Difficulty scores are only displayed once enough comparisons have been gathered that the system is confident in the video's difficulty. As a result, early users will see fewer indicators while the system builds up data. I have imported data from <https://comprensi.com> for Spanish, but the data is still very sparse.

## Development

This project is open source and welcomes contributions. If you're interested in helping improve this extension for language learners, please reach out and I can help you with the setup. I'm particularly interested in feedback from language learners and developers who can help make this tool more effective.

## License

This project is licensed under the ISC License - a permissive free software license that lets people do anything with your code with proper attribution and without warranty. See the [LICENSE](LICENSE) file for details.
