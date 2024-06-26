////////////////////////////////////////////////////
// AUDIO
//
// Backgrond noise
//
// createOffScreen() copied from background.js: bad practice but we gotta schmove
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'sound-effect/sound.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'playing sounds' 
    });
}
async function playBackgroundNoise(source = '/sound-effect/kitten.mp3', volume = 1, loop = true) {
    await createOffscreen();
    chrome.runtime.sendMessage({ 
        type: "play_audio",
        data: { 
            audio: { source, volume, loop }
        }
    });
}
const createBackgroundNoise = (tab) => {
    playBackgroundNoise();
}



///////////////////////////////////////////////
// ANIMATION
// 
// Cat animation
const appendCat = function (imgSrc) {
    if (document.getElementById("cat") === null) {
        const cat = document.createElement("img");
        cat.setAttribute("id", "cat");
        cat.setAttribute("src", chrome.runtime.getURL(imgSrc));
        document.body.appendChild(cat);
    }
}
const executeCatScript = (tab) => {
    const catSrc = "/assets/images/cat-nyan-cat.gif";
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/cats.css"],
    })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: appendCat,
        args: [catSrc]
    })
}


///////////////////////////////////////////////////////
// Actual implementation: this happens when popup.html is finished loading

document.addEventListener('DOMContentLoaded', documentEvents, false);
let colorValue;
let colorBgValue;
let fontValue;


function documentEvents() {
    // ON POPUP LOAD:
    // - play bg audio
    // - create animated cat
    chrome.tabs.query(
        {
            url: [ "*://*/*" ]
        },
        (tabs) => tabs.forEach(tab => {
            createBackgroundNoise(tab)
            executeCatScript(tab)
        })
    )
    
    ////////////////////////////////////////////////////////
    // UI stuff
    document.getElementById('colorText').addEventListener("change", function(event) {
        colorValue = event.target.value;
    });

    let colorButton = document.getElementById('colorButton')

    // ON BUTTON CLICK IN POPUP
    colorButton.addEventListener("click", function(event) {
        chrome.tabs.query(
            {
                url: [ "*://*/*" ]
            },
            (tabs) => tabs.forEach(tab => {
                chrome.scripting.insertCSS({
                    css: `* {
                        color: ${colorValue};
                    }`,
                    target: { tabId: tab.id }
                })
            })
        )
    })

    document.getElementById('colorBg').addEventListener("change", function(event) {
        colorBgValue = event.target.value;
    });
    let colorBgButton = document.getElementById('colorBgButton')
    colorBgButton.addEventListener("click", function(event) {
        chrome.tabs.query({}, (tabs) => tabs.forEach(tab => 
            chrome.scripting.insertCSS({
            css: `* {
                background-color: ${colorBgValue};
            }
            `,
            target: { tabId: tab.id }
        })))
    })

    // document.getElementById('fontText').addEventListener("change", function(event) {
    //     fontValue = event.target.value;
        
    // });

    // let fontButton = document.getElementById('fontButton')
    // fontButton.addEventListener("click", function(event) {
    //     alert(fontValue)
    //     chrome.tabs.query({}, (tabs) => tabs.forEach(tab => 
    //         chrome.scripting.insertCSS({
    //         css: `* {
    //             font: ${fontValue};
    //         }
    //         `,
    //         target: { tabId: tab.id }
    //     })))
    // })
}
