// This is the devtools script, which is called when the user opens the
// Chrome devtool on a page.

const PANEL_NAME = "App devtools";
const PANEL_ICON = "icons/action_active.png";
const PANEL_MARKUP = "panel/app.html";

let created = false;
let checkCount = 0;

chrome.devtools.network.onNavigated.addListener(createPanelIfHasApp);
const checkAppInterval = setInterval(createPanelIfHasApp, 1000);
createPanelIfHasApp();

function createPanelIfHasApp() {
  if (created || checkCount++ > 10) {
    clearInterval(checkAppInterval);
    return;
  }

  chrome.devtools.inspectedWindow.eval(
    "!!window.__APP__", // TODO: replace with an actual app detection
    (hasApp) => {
      if (!hasApp || created) {
        return;
      }
      clearInterval(checkAppInterval);
      created = true;
      chrome.devtools.panels.create(
        PANEL_NAME,
        PANEL_ICON,
        PANEL_MARKUP,
        (panel) => {
          // panel loaded
          panel.onShown.addListener(() => {});
          panel.onHidden.addListener(() => {});
        },
      );
    },
  );
}

