document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleSwitch');
  const settingsButton = document.getElementById('settings-button');
  const breakButton = document.getElementById('break-button');

  // Load initial state (Default to autoEnable setting)
  chrome.storage.local.get(['extensionEnabled', 'autoEnable'], (res) => {
    toggle.checked = res.autoEnable !== false && res.extensionEnabled !== false; 
  });

  // Save state on change
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ extensionEnabled: toggle.checked });
  });

  // Manual break button
  if (breakButton) {
    breakButton.addEventListener('click', () => {
      // Send message to content script to break the news
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'breakNews' }, (response) => {
          if (response && response.success) {
            breakButton.textContent = '✓ Broken!';
            breakButton.style.background = '#27ae60';
            setTimeout(() => {
              breakButton.textContent = 'Break Now';
              breakButton.style.background = '';
            }, 2000);
          }
        });
      });
    });
  }

  // Settings button opens the options page.
  if (settingsButton) {
    settingsButton.addEventListener('click', (event) => {
      event.preventDefault();
      const optionsUrl = chrome.runtime.getURL('options.html');
      chrome.tabs.create({ url: optionsUrl });
    });
  }
});
