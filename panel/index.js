const button = document.querySelector('button');

chrome.runtime.onMessage.addListener((message) => {
    document.body.insertAdjacentHTML('beforeend', `
        <p>${JSON.stringify(message)}</p>
    `)
})

button.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    await chrome.tabs.sendMessage(tab.id, 'reset');
});