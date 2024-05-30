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

const ports = {};

chrome.runtime.onConnect.addListener((port) => {
  function messageListener(message, port) {
    if (port === ports.content) {
      console.log("From content");
    } else if (port === ports.panel) {
      console.log("From panel");

      if (message === "reset") {
        ports.content.postMessage("reset");
      }
    }
  }

  if (port.name === "content") {
    ports.content = port;
  } else if (port.name === "panel") {
    ports.panel = port;
  } else {
    throw new Error("Unknown port.");
  }

  port.onMessage.addListener(messageListener);

  port.onDisconnect.addListener(() => {
    port.onMessage.removeListener(messageListener);
  });
});
