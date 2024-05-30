Object.defineProperty(window, '__APP__', {
    value: true,
});

function initForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        sendMessageToDevtools({ content: data.get('content') });
    });

    if (window.__APP_DEVTOOLS_MESSAGING__) {
        window.__APP_DEVTOOLS_MESSAGING__.on('reset', () => form.reset());
    }
}

function sendMessageToDevtools(message) {
    if (window.__APP_DEVTOOLS_MESSAGING__) {
        window.__APP_DEVTOOLS_MESSAGING__.send(message);
    } else {
        console.error('window.__APP_DEVTOOLS_MESSAGING__ is not defined');
    }
}

initForm();