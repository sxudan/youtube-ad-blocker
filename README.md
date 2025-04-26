# YouTube Ad Blocker

A Chrome extension that automatically skips YouTube ads by seeking to the end of the video and clicking skip buttons when available.

## Features

- Automatically detects and skips YouTube ads
- Works on both video pages and home feed
- Mutes ads while skipping
- Handles both traditional and modern YouTube ad interfaces
- Reloads YouTube tabs when extension is installed/updated
- User-friendly popup interface with settings

## How It Works

The extension uses multiple approaches to skip ads:

1. **Content Script (`content.js`)**
   - Detects ads using YouTube's player classes
   - Seeks to the end of ad videos
   - Clicks skip buttons when available
   - Runs checks every 500ms

2. **Background Script (`background.js`)**
   - Handles extension installation and updates
   - Reloads YouTube tabs when extension is installed
   - Injects ad-skipping functionality into new YouTube tabs

3. **Popup Interface (`popup.js`)**
   - Provides visual feedback for active YouTube pages
   - Includes settings slider for user preferences
   - Shows different CTAs based on user interaction

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

Once installed, the extension works automatically on YouTube. No configuration is needed, but you can:

- Click the extension icon to see the popup interface
- Adjust settings using the slider
- View different CTAs based on your interaction level

## Technical Details

- Uses Manifest V3
- Implements both content scripts and background scripts
- Handles various YouTube ad formats
- Includes error handling and logging

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
