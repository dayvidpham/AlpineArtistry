function changeBackgroundImage () {
    document.body.style.backgroundImage = `'${chrome.runtime.getURL(cursor)}', default`;
    //document.body.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg")';
}

chrome.action.onClicked.addListener((tab) => {
    image = 'url("/assets/images/cat_image.jpg")' ;
    if(!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: changeBackgroundImage,
            args: [image]
        });
    }
});

// function changeCursor(cursor) {
//     const elems = document.body.getElementsByTagName("*");
//     for(const i of elems){
//         //i.style.cursor = "url('assets/images/among_us.png'), default";
//         i.style.cursor = `url('${cursor}'), default`;
//     }
// }

// chrome.action.onClicked.addListener((tab) => {
//     if(!tab.url.includes('chrome://')) {
//         const cursor = "https://cdn.custom-cursor.com/packs/3704/among-us-character-in-pikachu-skin-pack.png";
//         chrome.scripting.executeScript({
//             target: {tabId: tab.id},
//             func: changeCursor,
//             args: [cursor]
//         });
//     }
// });