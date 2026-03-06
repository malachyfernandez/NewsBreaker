document.addEventListener("DOMContentLoaded", () => {
  // Dismiss button handling.
  const dismissButton = document.querySelector(".dismiss-button");
  if (dismissButton) {
    dismissButton.addEventListener("click", () => {
      const pointer = document.getElementById("settingsPointer");
      pointer.classList.add("dismissing");
      pointer.addEventListener("transitionend", () => {
        pointer.remove();
      });
    });
  }

  const autoEnableCheckbox = document.getElementById("autoEnableCheckbox");
  const githubLink = document.getElementById("github-link");

  // Load settings from storage.
  chrome.storage.local.get({ 
    extensionEnabled: true,
    autoEnable: true
  }, (result) => {
    autoEnableCheckbox.checked = result.autoEnable;
  });

  autoEnableCheckbox.addEventListener("change", () => {
    const autoEnable = autoEnableCheckbox.checked;
    chrome.storage.local.set({ autoEnable }, () => {
      console.log("Auto-enable setting updated to", autoEnable);
    });
  });

  githubLink.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: githubLink.href });
  });
});
