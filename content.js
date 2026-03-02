const styleId = 'newsbreaker-style';

// CSS to hide the modal and fix overflow
const cssRules = `
  /* Alternative targeting for browsers that don't support :has() */
  div[style*="position: fixed"][style*="z-index"] {
    display: none !important;
  }
`;

function removeModalAndFixOverflow() {
  // Remove modal by text content
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const text = element.textContent || '';
    if (text.includes('Welcome to News & Observer') || 
        text.includes('You must turn off your ad blocking software') ||
        text.includes('Powered By') && text.includes('Admiral')) {
      element.remove();
    }
  });

  // Remove any Admiral-related elements
  const admiralElements = document.querySelectorAll('a[href*="getadmiral.com"], [src*="getadmiral.com"]');
  admiralElements.forEach(el => {
    const parent = el.closest('div');
    if (parent) parent.remove();
  });

  // Fix overflow issues
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  
  // Remove any inline overflow styles
  const elementsWithOverflow = document.querySelectorAll('[style*="overflow: hidden"]');
  elementsWithOverflow.forEach(el => {
    el.style.overflow = '';
  });
}

function applyState(isEnabled) {
  let styleEl = document.getElementById(styleId);
  
  if (isEnabled) {
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = cssRules;
      document.head.appendChild(styleEl);
    }
    // Immediately try to remove existing modal
    removeModalAndFixOverflow();
  } else {
    if (styleEl) {
      styleEl.remove();
    }
  }
}

// Function to continuously check for and remove modal
function monitorForModal() {
  const observer = new MutationObserver((mutations) => {
    chrome.storage.local.get(['extensionEnabled'], (res) => {
      if (res.extensionEnabled !== false) {
        removeModalAndFixOverflow();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });
}

// Initial check on page load
chrome.storage.local.get(['extensionEnabled', 'autoEnable'], (res) => {
  const isEnabled = res.autoEnable !== false && res.extensionEnabled !== false;
  applyState(isEnabled);
  
  if (isEnabled) {
    monitorForModal();
  }
});

// Listen for live toggle changes from the popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.extensionEnabled) {
    applyState(changes.extensionEnabled.newValue);
    if (changes.extensionEnabled.newValue) {
      monitorForModal();
    }
  }
});

// Also listen for manual activation messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'breakNews') {
    removeModalAndFixOverflow();
    sendResponse({success: true});
  }
});
