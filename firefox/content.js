const styleId = 'newsbreaker-style';

// CSS to hide the modal and fix overflow
const cssRules = `
  /* Alternative targeting for browsers that don't support :has() */
  div[style*="position: fixed"][style*="z-index"] {
    display: none !important;
  }
`;

function removeModalAndFixOverflow() {
  // Find the specific modal by its unique text content
  const allElements = document.querySelectorAll('*');
  let modalToRemove = null;
  
  allElements.forEach(element => {
    const text = element.textContent || '';
    // Look for the exact combination that identifies this modal
    if (text.includes('Welcome to News & Observer') && 
        text.includes('You must turn off your ad blocking software') &&
        text.includes('Powered By')) {
      modalToRemove = element;
    }
  });
  
  // If we found the modal, remove it by going up to the top-level modal container
  if (modalToRemove) {
    // Traverse up to find the modal container with the specific classes
    let currentElement = modalToRemove;
    let targetElement = null;
    
    // Look for the top-level container with the specific class structure
    for (let i = 0; i < 10; i++) { // Limit depth to prevent infinite loops
      if (currentElement && currentElement.classList) {
        // Check if this is the top-level modal container
        if (currentElement.classList.contains('fEy1Z2XT') || 
            (currentElement.style.position === 'fixed' && currentElement.style.zIndex > 1000)) {
          targetElement = currentElement;
          break;
        }
      }
      currentElement = currentElement.parentElement;
    }
    
    // If we found a target, remove it
    if (targetElement) {
      targetElement.remove();
    } else {
      // Fallback: remove the element we found directly
      modalToRemove.remove();
    }
  }

  // Additional cleanup: remove any remaining Admiral-related elements
  const admiralElements = document.querySelectorAll('a[href*="getadmiral.com"], [src*="getadmiral.com"]');
  admiralElements.forEach(el => {
    const parent = el.closest('div');
    if (parent && (parent.style.position === 'fixed' || parent.style.position === 'absolute')) {
      parent.remove();
    }
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
    browser.storage.local.get(['extensionEnabled'], (res) => {
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
browser.storage.local.get(['extensionEnabled', 'autoEnable'], (res) => {
  const isEnabled = res.autoEnable !== false && res.extensionEnabled !== false;
  applyState(isEnabled);
  
  if (isEnabled) {
    monitorForModal();
  }
});

// Listen for live toggle changes from the popup
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.extensionEnabled) {
    applyState(changes.extensionEnabled.newValue);
    if (changes.extensionEnabled.newValue) {
      monitorForModal();
    }
  }
});

// Also listen for manual activation messages
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'breakNews') {
    removeModalAndFixOverflow();
    sendResponse({success: true});
  }
});
