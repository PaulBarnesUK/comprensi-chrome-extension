# Language Level for YouTube

This Chrome extension is for language learners using YouTube for comprehensible input. It overlays community-sourced language level indicators onto video thumbnails, helping you to gauge whether a video matches your level **before** you watch it. The goal is to make finding level-appropriate content less time-consuming.

By comparing videos you've watched, you contribute to the community ratings system. This collaborative approach means the more you use it, the better it becomes for everyone. Each comparison you make helps refine the language level indicators, creating a continuously improving resource for the entire language learning community.

[→ Install the extension now](#installation)

## Features

- **Visual Indicators**: See language levels directly on YouTube thumbnails
- **Contribute by Comparing**: Simple comparisons after watching videos help improve the system
- **Multiple Languages**: Support for 10 languages including Spanish, French, German, and more

## Installation

### For Early Testers

1. Download the [latest release zip file](https://github.com/PaulBarnesUK/youtube-language-level/releases/latest)
2. Unzip the file to a location on your computer
3. Open Chrome and navigate to `chrome://extensions`
4. Enable "Developer mode" using the toggle in the top-right corner
5. Click "Load unpacked" and select the unzipped folder
6. The extension should now be installed and active

Note: This is an early development version. The extension will soon be available on the Chrome Web Store.

Feedback from early users is really needed!! Please report any issues through GitHub issues or reach out directly.

## Quick Start

1. [Install the extension](#installation)
2. Open the extension popup and select your target language(s)
3. Browse YouTube normally - you'll see level indicators on thumbnails
4. After watching videos, respond to occasional comparison prompts
5. The more videos you watch and compare, the better the recommendations become

## How It Works

![Language level indicators on YouTube thumbnails](/docs/images/screenshot-thumbnails.png)

The extension shows language level indicators on YouTube thumbnails with scores like "54/100". These scores are **relative** - they only show how difficult a video is compared to other videos in the system, not absolute difficulty categories.

However, to help give you a rough idea at a glance the indicator has a coloured progress bar based on the video's level:

- Green bars generally indicate the easiest content ![Total Beginner Indicator](/docs/images/screenshot-indicator-total-beginner.png)
- Blue bars suggest beginner-friendly videos ![Beginner Indicator](/docs/images/screenshot-indicator-beginner.png)
- Yellow bars show intermediate difficulty ![Intermediate Indicator](/docs/images/screenshot-indicator-intermediate.png)
- Red bars point to more challenging content ![Intermediate Indicator](/docs/images/screenshot-indicator-advanced.png)
- Purple bars typically mark the most difficult videos ![Expert Indicator](/docs/images/screenshot-indicator-expert.png)

When you watch videos, you'll occasionally be asked which one was harder to understand. Your answers help build this relative scoring system and improve the indicators for everyone.

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

### I don't see any level indicators, what's up??

Indicators are only displayed once enough comparisons have been gathered that the system is confident in the video's difficulty level. As a result, early users will see fewer indicators while the system builds up data. I have imported data from <https://comprensi.com> for Spanish, but the data is still very sparse.

## Development

This project is open source and welcomes contributions. If you're interested in helping improve this extension for language learners, please reach out and I can help you with the setup. I'm particularly interested in feedback from language learners and developers who can help make this tool more effective.

## License

This project is licensed under the ISC License - a permissive free software license that lets people do anything with your code with proper attribution and without warranty. See the [LICENSE](LICENSE) file for details.
