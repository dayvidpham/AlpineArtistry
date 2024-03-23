function changeBackgroundImage () {
    //document.body.style.backgroundImage = 'url("./assets/images/cat_image.jpg")' ;
    document.body.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg")';
}

chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: changeBackgroundImage
        });
    }
});