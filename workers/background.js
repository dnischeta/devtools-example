// https://developer.chrome.com/docs/extensions/reference/api/runtime#example-content-msg
chrome.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab && message.appDetected) {
    chrome.action.setIcon({
      tabId: sender.tab.id,
      path: chrome.runtime.getURL("icons/action_active.png"),
    });
    chrome.action.setPopup({
      tabId: sender.tab.id,
      popup: chrome.runtime.getURL("popups/action_active.html"),
    });
  }
});

let panelShown = false;
const buffer = [];

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab && message === "panel-shown") {
    panelShown = true;
    buffer.forEach((message) => {
      chrome.runtime.sendMessage(message);
    });
    buffer.length = 0;
  } else if (!panelShown) {
    buffer.push(message);
  }
});
