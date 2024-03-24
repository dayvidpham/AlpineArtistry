// window.onload = () => {
//     generateElements();
//     //registerCallbacks();
// };

function changeCursor(cursorUrl) {
    const image = 
    document.body.style.cursor = `'${chrome.runtime.getURL(cursor)}', default`;
    console.error(document.body.style.cursor)
}

chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes('chrome://')) {
        // const cursor = "https://cdn.custom-cursor.com/packs/3704/among-us-character-in-pikachu-skin-pack.png";
        const cursor = "/assets/images/among_us.cur";

        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            // css: `
            //     * {
            //         cursor: url(/assets/images/among_us.cur), auto;
            //     }
            // `
            func: changeCursor,
            args: [cursor]
        });
        // console.error(chrome.runtime.getURL(cursor))
    }
});

// function showImage (imageUrl) {
//     const image = document.createElement('img');
//     image.src = imageUrl;
//     image.style.position = 'fixed';
//     image.style.left = `${event.clientX}px`;
//     image.style.top = `${event.clientY}px`;
//     image.style.width = '100px';
//     image.style.height = 'auto';
//     document.body.appendChild(image);
// }

// document.addEventListener('click', ()=>{
//     const imageUrl = 'assets/images/Pusheen_the_Cat.png';
//     showImage(imageUrl);
// })


// function generateElements(){
// chrome.storage.sync.get({
//     cursors: []
// }, (data) => {
//     const cursors = defaultCursors
//     // .map(i => chrome.runtime.getURL(i))
//     // .concat(data.cursors);

//     // const grid = document.getElementById("grid");
//     // while(grid.firstChild) grid.removeChild(grid.firstChild);

//     for(let cursor of cursors) {
//     const img = document.createElement("img");
//     img.src = cursor;
    
//     img.onclick = () => {
        
//         chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//         var currTab = tabs[0];
//         if (!currTab) return;
//         chrome.scripting.executeScript({
//             target: {
//             tabId: currTab.id
//             },
//             func: changeCursor,
//             args: [cursor]
//         });
//         });      
//     }
//     // grid.appendChild(img);
//     }
// });
// }

// function registerCallbacks() {
// document.getElementById("submit").onclick = onSubmitClicked;
// }

//   function onSubmitClicked(){
//     const input = document.getElementById("url").value;
//     if(!isValidHttpUrl(input)) {
//       alert("Image URL is not valid! Please enter the URL to an acceptable image type.");
//       return;
//     }
//     if(!isValidImage(input)) {
//       alert("The URL specified is not an image. Acceptable types: jpg, gif, png");
//       return;
//     }
//     getImageWidthHeight(input).then((width, height) => {
//       if(width > 32 || height > 32) {
//         alert("The image specified must be smaller than 32x32 pixels.");
//         return;
//       }

//       chrome.storage.sync.get({
//         cursors: []
//       }, (data) => {
//         data.cursors.push(input);
//         chrome.storage.sync.set({
//           cursors: data.cursors
//         }, () => {
//           generateElements();
//         })
//       });
//     });
//   }

//   function getImageWidthHeight(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.addEventListener("load", function() {
//         resolve(this.naturalWidth, this.naturalHeight);
//       });
//       img.src = url;
//     });
//   }

//   function isValidHttpUrl(string) {
//     let url;

//     try {
//       url = new URL(string);
//     } catch (_) {
//       return false;  
//     }

//     return url.protocol === "http:" || url.protocol === "https:";
//   }

//   function isValidImage(url) {
//     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
//   }