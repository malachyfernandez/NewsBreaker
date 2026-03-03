# NewsBreaker Extension - Agent Guide

## Overview
NewsBreaker is a Chrome extension that removes News & Observer ad-blocker detection walls and modals. It automatically detects and removes overlays that block access to content when ad blockers are detected.

## Architecture

### Core Files
- **manifest.json** - Extension configuration, permissions, and file references
- **popup.html** + **popup.js** - Extension popup interface with toggle and manual "Break Now" button
- **content.js** - Content script that runs on News & Observer pages to remove ad-blocker detection walls
- **background.js** - Service worker for extension lifecycle
- **options.html** + **options.js** - Settings/welcome page

### Icon System (IMPORTANT)
The extension uses a **dual-icon system**:

#### App-Style Icons (for extension/browser):
- **icon-16.png** - Browser toolbar (16×16px)
- **icon-48.png** - Extension management page (48×48px)  
- **icon-128.png** - Chrome Web Store (128×128px)
- **Purpose**: Simplified, fills entire space, rounded corners, optimized for small sizes
- **Source**: Generated from app-icon.svg (temporary file, delete after PNG generation)

#### UI Icons (for interface):
- **newsbreak-icon.svg** - Detailed design with background bubble and effects
- **Used in**: popup.html (40×40px) and options.html (60×60px)
- **Purpose**: Complex design with gradients, light rays, fragments for larger display

## How It Works

### Ad-Blocker Detection Wall Removal
The `removeModalAndFixOverflow()` function in content.js targets specific modal structures:
```javascript
// Looks for unique text combination
if (text.includes('Welcome to News & Observer') && 
    text.includes('You must turn off your ad blocking software') &&
    text.includes('Powered By')) {
  // Traverse up to find top-level container (class="fEy1Z2XT" or fixed positioning)
  // Remove entire ad-blocker detection modal structure
}
```

### Key Features
- **Auto-Break**: Toggle switch for automatic ad-blocker detection wall removal
- **Manual Break**: "Break Now" button for immediate action
- **Continuous Monitoring**: MutationObserver watches for dynamic modal insertion
- **Overflow Fix**: Removes overflow:hidden styles that prevent scrolling

## Development Guidelines

### Updating Icons
1. **App Icons**: Modify app-icon.svg → Generate PNGs with:
   ```bash
   rsvg-convert -w 16 -h 16 -o icon-16.png app-icon.svg
   rsvg-convert -w 48 -h 48 -o icon-48.png app-icon.svg  
   rsvg-convert -w 128 -h 128 -o icon-128.png app-icon.svg
   ```
2. **UI Icons**: Modify newsbreak-icon.svg (no conversion needed)
3. **Delete temporary app-icon.svg** after PNG generation

### Target Website
- **Domain**: newsobserver.com
- **Modal Structure**: Look for div with class="fEy1Z2XT" containing specific text
- **Text Markers**: "Welcome to News & Observer", "You must turn off your ad blocking software", "Powered By"

### CSS Classes & IDs
- **Toggle Switch**: `#toggleSwitch`
- **Break Button**: `#break-button` 
- **Settings Button**: `#settings-button`
- **Logo Container**: `.logo`
- **Storage Keys**: `extensionEnabled`, `autoEnable`

## File Structure
```
GeminiSourcesRemover/
├── manifest.json          # Extension config
├── popup.html            # Popup UI (40px logo)
├── popup.js             # Popup logic
├── content.js           # Ad-blocker detection wall removal logic
├── background.js        # Service worker
├── options.html         # Settings page (60px logo)
├── options.js          # Settings logic
├── icon-16.png        # Browser toolbar
├── icon-48.png        # Extension management
├── icon-128.png       # Chrome Web Store
├── newsbreak-icon.svg  # UI icon (popup/settings)
└── agent.md           # This file
```

## Common Tasks

### Adding New Ad-Blocker Detection Patterns
1. Update `removeModalAndFixOverflow()` in content.js
2. Add new text markers to the if condition
3. Test on actual News & Observer pages
4. Consider both automatic and manual breaking

### Modifying UI
- **Popup**: Edit popup.html (structure) and popup.js (logic)
- **Settings**: Edit options.html (structure) and options.js (logic)
- **Styling**: Uses CSS custom properties in `:root`

### Debugging Ad-Blocker Detection Wall Removal
1. Open News & Observer article with ad-blocker detection wall
2. Use browser dev tools to inspect modal structure
3. Check if text markers match current detection
4. Verify modal container class/positioning
5. Test both auto and manual breaking

## Important Notes

### Security Considerations
- Extension only runs on newsobserver.com domain
- Uses minimal permissions (storage, activeTab)
- No external network requests or data collection

### Performance
- MutationObserver only watches when extension is enabled
- Efficient DOM traversal with depth limits
- Debounced modal removal to prevent layout thrashing

### Browser Compatibility
- Uses Manifest V3 (modern Chrome extension standard)
- CSS uses modern features (drop-shadow, gradients)
- SVG icons for scalability

## Testing

### Manual Testing
1. Load extension in Chrome developer mode
2. Visit newsobserver.com article with ad-blocker detection wall
3. Test auto-toggle functionality
4. Test manual "Break Now" button
5. Verify popup and settings pages display correctly

### Icon Testing
- Verify all sizes render correctly at their intended contexts
- Test app icons at 16px, 48px, 128px
- Test UI icons at 40px (popup) and 60px (settings)
- Ensure no scaling artifacts or blurriness

## Deployment

### Chrome Web Store
- Update version in manifest.json for new releases
- Ensure all icon sizes are present
- Test extension in incognito mode
- Verify permissions are minimal and appropriate

### Version Management
- Semantic versioning in manifest.json
- Document breaking changes in this agent.md
- Keep backup of working versions before major changes

## Troubleshooting

### Common Issues
- **Modal not removed**: Check text markers and modal structure
- **Extension not loading**: Verify manifest.json syntax
- **Icons not displaying**: Check file paths and PNG generation
- **Popup not opening**: Verify popup.html references and permissions

### Debug Tools
- Chrome Extensions page for errors
- DevTools console on target pages
- Extension storage inspector for settings
- Network tab for any unexpected requests

## Future Enhancements

### Potential Improvements
- Support for additional news sites
- More sophisticated modal detection patterns
- User customization options
- Statistics and usage tracking
- Keyboard shortcuts

### Code Quality
- Add comprehensive error handling
- Implement unit tests for content script
- Add TypeScript for better type safety
- Improve code documentation

---

**Last Updated**: Created for comprehensive agent understanding of NewsBreaker extension architecture and maintenance procedures.
