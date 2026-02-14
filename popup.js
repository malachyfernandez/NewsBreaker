document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleSwitch');
  const settingsButton = document.getElementById('settings-button');

  // Load initial state (Default to autoEnable setting)
  chrome.storage.local.get(['extensionEnabled', 'autoEnable'], (res) => {
    toggle.checked = res.autoEnable !== false && res.extensionEnabled !== false; 
  });

  // Save state on change
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ extensionEnabled: toggle.checked });
  });

  // Settings button opens the options page.
  if (settingsButton) {
    settingsButton.addEventListener('click', (event) => {
      event.preventDefault();
      const optionsUrl = chrome.runtime.getURL('options.html');
      chrome.tabs.create({ url: optionsUrl });
    });
  }
});
