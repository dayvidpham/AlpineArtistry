
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
    font: `'Comic Sans MS', 'Comic Sans', 'Comic Neue', @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'), cursive`,
    color: "black",
    bgColor: "white",
    
}

function applyStyle(pageStyle) {
    const { font, color, bgColor } = pageStyle;
    chrome.tabs.query(
        {
            url: [ "*://*/*" ]
        },
        (tabs) => tabs.forEach(tab => {
            chrome.scripting.insertCSS({
                css: `* {
                    font: ${font};
                    color: ${color};
                    background-color: ${bgColor};
                }`,
                target: { tabId: tab.id }
            })
        })
    )
};

applyStyle(pageStyle);

// --- On Reloading or Entering example.com --- 
chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.url.startswith("chrome")) {
        return
    }
    if (["reload", "link", "typed", "generated"].includes(details.transitionType)) {
        applyStyle(pageStyle);

        // If you want to run only when the reload finished (at least the DOM was loaded)
        chrome.webNavigation.onCompleted.addListener(function onComplete() {
            chrome.webNavigation.onCompleted.removeListener(onComplete);
        });
    }
});

const appendCat = function (imgSrc) {
    if (document.getElementById("cat") === null) {
        const cat = document.createElement("img");
        cat.setAttribute("id", "cat");
        cat.setAttribute("src", chrome.runtime.getURL(imgSrc));
        //cat.src = chrome.runtime.getURL("./assets/images/cat-nyan-cat.gif");
        document.body.appendChild(cat);
    }
}

chrome.action.onClicked.addListener((tab) => {
    const catSrc = "/assets/images/cat-nyan-cat.gif";
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: appendCat,
        args: [catSrc]
    })
})


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

