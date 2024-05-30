Object.defineProperty(window, '__APP_DEVTOOLS_MESSAGING__', {
    value: {
        send(message) {
            window.postMessage({
                key: '_app_devtools_message',
                message,
            });
        },
        on(message, cb) {
            window.addEventListener('message', (event) => {
                if (event.data.key === '_from_devtools' && event.data.type === message) {
                    cb()
                }
            })
        }
    }
})
