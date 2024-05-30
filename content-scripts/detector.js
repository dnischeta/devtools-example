// That script is injected into inspected page (active tab).
// Don't forget to add that script into manifest.json as a web accessible resource.

// Emit message on the window
function sendDetectionMessage(message) {
  window.postMessage({
    key: "_app-devtools-send-message",
    message,
  });
}

function detect() {
  let delay = 1000;
  let detectRemainingTries = 10;

  function runDetect() {
    const appDetected = !!window.__APP__; // TODO: replace with actual app detection

    if (appDetected) {
      sendDetectionMessage(
        {
          devtoolsEnabled: true,
          appDetected: true,
        },
        "*",
      );
    }
  }

  if (detectRemainingTries > 0) {
    detectRemainingTries--;
    setTimeout(() => {
      runDetect();
    }, delay);
    delay *= 5;
  }

  setTimeout(() => {
    runDetect();
  }, 100);
}

if (document instanceof HTMLDocument) {
  detect();
}
