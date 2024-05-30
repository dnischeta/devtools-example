# Devtools example

[Official google extensions docs](https://developer.chrome.com/docs/extensions).

## Configuring toolbar action

There are fields in `manifest.json` which control action UI (see [example](https://developer.chrome.com/docs/extensions/reference/api/action#show_a_popup)):
- `"action.default_icon"` - relative URL to the icon (eg. `"icons/action_default.png"`);
- `"action.default_popup"` - relative URL to the action popup markup (eg. `"popups/action_default.html`").

__Change action appearance__

It's a common case for devtools: to indicate that active tab has target app for devtools. That feature may be implemented something like [that](https://developer.chrome.com/docs/extensions/reference/api/runtime#example-content-msg).

- Add `detector-shell.js` as a content script;
- Add `detector.js` which actually detects app on the active tab;
- Add `background.js` which listens for messages and uses `chrome.action.setIcon` and `chrome.action.setPopup`.

## Devtools panel

Firstly, you should add `"devtools_page": "panel/shell.html"` into the `manifest.json`. `shell.html` only adds script `shell.js`, which checks that inspected tab has your app and creates devtools panel using `chrome.devtools.panels.create`. Actual panels' markup is implemented in the `panel/app.html`.

_Notice:_ you don't have to add `panel/shell.js` neither `panel/app.html` into the `manifest.json`, because these content is requested from devtools page:

![Extension diagram](https://developer.chrome.com/static/docs/extensions/how-to/devtools/extend-devtools/image/architecture-diagram.png).

## Communication

### Inspected page -> devtools

### Devtools -> Inspected page

## Additional

### TypeScript

Install npm package [chrome-types](https://www.npmjs.com/package/chrome-types).
