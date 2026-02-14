const styleId = 'gemini-source-remover-style';
const cssRule = 'sources-carousel-inline { display: none !important; }';

function applyState(isEnabled) {
  let styleEl = document.getElementById(styleId);
  
  if (isEnabled) {
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = cssRule;
      document.head.appendChild(styleEl);
    }
  } else {
    if (styleEl) {
      styleEl.remove();
    }
  }
}

// Initial check on page load
chrome.storage.local.get(['extensionEnabled', 'autoEnable'], (res) => {
  const isEnabled = res.autoEnable !== false && res.extensionEnabled !== false;
  applyState(isEnabled);
});

// Listen for live toggle changes from the popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.extensionEnabled) {
    applyState(changes.extensionEnabled.newValue);
  }
});
