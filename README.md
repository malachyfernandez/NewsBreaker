# NewsBreaker 📰⚡

A browser extension that bypasses the News & Observer ad-blocker detection screen, allowing you to read articles without disabling your ad blocker.

## Features

- **Automatic Removal**: Automatically detects and removes News & Observer ad-blocker detection screens
- **Manual Override**: "Bypass Now" button for instant removal when needed
- **Smart Detection**: Uses multiple targeting methods to find and remove ad-blocker screens reliably
- **Overflow Fix**: Restores proper scrolling behavior by removing `overflow: hidden` styles
- **Toggle Control**: Choose between automatic and manual activation
- **Lightweight**: Minimal impact on page performance

## How It Works

NewsBreaker uses intelligent detection methods to identify and remove ad-blocker detection screens:

1. **Text-based Detection**: Finds elements containing "Welcome to News & Observer" and ad-blocker warnings
2. **Admiral Detection**: Removes Admiral-related ad-blocker detection scripts
3. **Style Fixing**: Removes `overflow: hidden` from HTML and body elements
4. **Continuous Monitoring**: Uses MutationObserver to catch dynamically loaded screens

## Installation

### Chrome/Edge/Brave (Chromium-based browsers)

1. Download the latest release from the [Releases page](https://github.com/malachyfernandez/News-and-Observer-Unblocker/releases)
2. Extract the ZIP file to a folder
3. Open your browser and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extracted folder
6. NewsBreaker will appear in your extensions list

### Firefox

1. Download the latest release from the [Releases page](https://github.com/malachyfernandez/News-and-Observer-Unblocker/releases)
2. Extract the ZIP file to a folder
3. Open Firefox and navigate to `about:addons`
4. Click the gear icon and select "Install Add-on From File"
5. Select the extracted folder
6. NewsBreaker will be installed

## Usage

### Automatic Mode (Default)

1. Visit any News & Observer article
2. The extension will automatically detect and remove the ad-blocker detection screen
3. The article content will be accessible immediately

### Manual Mode

1. Toggle off "Auto-Bypass Screen" in the extension popup
2. When you encounter the ad-blocker detection screen, click the NewsBreaker icon
3. Press the "Bypass Now" button to remove the screen
4. The article will be accessible

### Settings

- **Auto-Bypass Screen**: Toggle automatic removal on/off
- **Settings**: Access advanced options and preferences

## Compatibility

- ✅ Google Chrome
- ✅ Microsoft Edge  
- ✅ Brave Browser
- ✅ Opera
- ✅ Firefox (with minor modifications)
- ✅ Safari (with minor modifications)

## Supported Sites

- ✅ News & Observer (newsobserver.com)
- ✅ All subdomains (*.newsobserver.com)

## Privacy

NewsBreaker is designed with privacy in mind:

- **No Data Collection**: The extension does not collect, store, or transmit any personal data
- **Local Storage Only**: Settings are stored locally on your device
- **No Analytics**: No tracking or analytics scripts
- **Open Source**: All code is publicly available for review

See [PRIVACY.md](PRIVACY.md) for detailed privacy information.

## Technical Details

### Detection Methods

The extension uses multiple fallback methods to ensure reliable modal removal:

1. **Text Content Matching**: Scans for specific text strings in modal content
2. **URL Pattern Matching**: Detects Admiral-related URLs and scripts
3. **Style Attribute Detection**: Finds elements with `overflow: hidden` styles
4. **DOM Mutation Monitoring**: Continuously watches for new modal elements

### Permissions Required

- `storage`: Saves user preferences locally
- `activeTab`: Allows manual activation on the current page

## Development

### Building from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/malachyfernandez/News-and-Observer-Unblocker.git
   cd News-and-Observer-Unblocker
   ```

2. Load the extension in your browser using the developer mode instructions above

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Extension Not Working

1. **Check Permissions**: Ensure the extension has the necessary permissions
2. **Reload Extension**: Try disabling and re-enabling the extension
3. **Clear Cache**: Clear your browser cache and reload the page
4. **Check Updates**: Ensure you're using the latest version

### Ad-Blocker Screen Still Appears

1. **Manual Override**: Use the "Bypass Now" button
2. **Wait for Load**: Some screens load with a delay - give it a few seconds
3. **Refresh Page**: Try refreshing the page with the extension enabled

### Performance Issues

1. **Disable Auto Mode**: Switch to manual mode if you notice performance impacts
2. **Report Issues**: File an issue on GitHub with details about your setup

## Changelog

### v1.1.0
- Updated to clarify bypasses ad-blocker detection screen (not paywall)
- Updated UI text for clarity
- Improved description accuracy

### v1.0.0
- Initial release
- Automatic ad-blocker screen detection and removal
- Manual override functionality
- Overflow style fixing
- Settings page with toggle controls

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is intended for personal use and educational purposes only. Please respect the terms of service of the websites you visit and consider supporting journalism by subscribing to news services when possible.

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/malachyfernandez/News-and-Observer-Unblocker/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/malachyfernandez/News-and-Observer-Unblocker/issues)
- 📧 **Contact**: Create an issue on GitHub

---

**Made with ❤️ for bypassing ad-blocker detection screens**
