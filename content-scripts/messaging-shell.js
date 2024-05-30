window.addEventListener(
  "message",
  (event) => {
    if (event.data.key === "_app_devtools_message") {
      chrome.runtime.sendMessage(event.data.message);
    }
  },
  false,
);

chrome.runtime.onMessage.addListener((message) => {
  window.postMessage({
    key: "_from_devtools",
    type: message,
  });
});

const messagingScript = document.createElement("script");
messagingScript.src = chrome.runtime.getURL("content-scripts/messaging.js");
messagingScript.onload = () => {
  messagingScript.remove();
};
(document.head || document.documentElement).appendChild(messagingScript);
