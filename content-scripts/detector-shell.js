// It's a content script https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
// It injects a detector.js script into an active tab to inspect window object.
// It uses chrome.runtime.sendMessage to send a message to service-worker.

// Same key we have in detector.js
const EVENT_KEY = "_app-devtools-send-message";

window.addEventListener(
  "message",
  (event) => {
    if (event.data.key === EVENT_KEY) {
      chrome.runtime.sendMessage(event.data.message);
    }
  },
  false,
);

const detectorScript = document.createElement("script");
detectorScript.src = chrome.runtime.getURL("content-scripts/detector.js");
detectorScript.onload = () => {
  detectorScript.remove();
};
(document.head || document.documentElement).appendChild(detectorScript);
