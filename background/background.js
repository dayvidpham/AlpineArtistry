function changeBackgroundImage () {
    document.body.style.backgroundImage = "./assets/images/cat_image.jpg" ;
}

chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: changeBackgroundImage
        });
    }
});