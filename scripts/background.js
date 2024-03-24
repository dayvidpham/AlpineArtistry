
// TODO: preserver state of extension(ON/OFF)
// extension is initally turned off when installed
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: 'OFF'
//     });
// });


// // // When the user clicks on the extension action
// chrome.action.onClicked.addListener(async (tab) => {

//     // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     console.log("tab.id:", tab.id)
//     // Next state will always be the opposite
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  
//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState
//     });
  
//     if (nextState === 'ON') {
//       // Insert the CSS file when the user turns the extension on
//       await chrome.scripting.insertCSS({
//         files: ['css/colors.css'],
//         target: { tabId: tab.id }
//       });
//       console.log("inside if statement tab.id:", tab.id)
//     } else if (nextState === 'OFF') {
//       // Remove the CSS file when the user turns the extension off
//       await chrome.scripting.removeCSS({
//         files: ['css/colors.css'],
//         target: { tabId: tab.id }
//       });
//     }
    
//   });

// Global default
let pageStyle = {
    enabled: true,
    font: "Comic Sans",
    color: "white",
    bgColor: "black",
}

function applyStyle(pageStyle) {
    const { font, color, bgColor } = pageStyle;
    chrome.tabs.query({}, (tabs) => tabs.forEach(tab => 
        chrome.scripting.insertCSS({
        css: `* {
            font: ${font};
            color: ${color};
            background-color: ${bgColor};
        }`,
        target: { tabId: tab.id }
    })))
};

applyStyle(pageStyle);

// --- On Reloading or Entering example.com --- 
chrome.webNavigation.onCommitted.addListener((details) => {
    if (["reload", "link", "typed", "generated"].includes(details.transitionType)) {
        applyStyle(pageStyle);

        // If you want to run only when the reload finished (at least the DOM was loaded)
        chrome.webNavigation.onCompleted.addListener(function onComplete() {
            chrome.webNavigation.onCompleted.removeListener(onComplete);
        });
    }
});

//idle audio
async function playSound(source = '/sound-effect/anime-wow.mp3', volume = 1) {
    await createOffscreen();
    await chrome.runtime.sendMessage({ 
        type: "play_audio",
        data: { 
            audio: { source, volume }
        }
    });
}

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'sound-effect/sound.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'notif for idling' 
    });
}

//15 seconds
chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener(function(state) {
    if (state === "idle") {
    //   setTimeout(function() {
        playSound();
    //   }, 10000); //60000 = 1 minute 
    }
  });


//=================== Change Background image =====================
function changeBackgroundImage () {
    //document.body.style.backgroundImage = `'${chrome.runtime.getURL(cursor)}', default`;
    document.body.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg")';
}

chrome.action.onClicked.addListener((tab) => {
    image = 'url("/assets/images/cat_image.jpg")';
    if(!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: changeBackgroundImage,
            //args: [image]
        });
    }
});

//================== Change cursor Image ===================
// function changeCursor(cursor) {
//     document.body.style.cursor = `'${chrome.runtime.getURL(cursor)}', default`;
//     console.error(document.body.style.cursor)
// }

// chrome.action.onClicked.addListener((tab) => {
//     if(!tab.url.includes('chrome://')) {
//         // const cursor = "https://cdn.custom-cursor.com/packs/3704/among-us-character-in-pikachu-skin-pack.png";
//         const cursor = "/assets/images/among_us.cur";

//         chrome.scripting.executeScript({
//             target: {tabId: tab.id},
//             // css: `
//             //     * {
//             //         cursor: url(/assets/images/among_us.cur), auto;
//             //     }
//             // `
//             func: changeCursor,
//             args: [cursor]
//         });
//         // console.error(chrome.runtime.getURL(cursor))
//     }
// });

//================= add image under cursor on click =================
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

