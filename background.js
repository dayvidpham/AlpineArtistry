chrome.action.onClicked.addListener(tab => {
    // Send a message to the active tab
    chrome.scripting.insertCSS({
        target: {
            tabId: tab.id
        },
        css: `* {
                    font-family: 'Helvetica', sans-serif !important;
                }`
    })
})

