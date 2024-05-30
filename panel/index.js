const button = document.querySelector("button");

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) {
    return;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
        <p>${JSON.stringify(message)}</p>
    `,
  );
});

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  await chrome.tabs.sendMessage(tab.id, "reset");
});
