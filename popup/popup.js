
document.addEventListener('DOMContentLoaded', documentEvents  , false);



let colorValue;
let colorBgValue;
let fontValue;


function documentEvents() {
    
    document.getElementById('colorText').addEventListener("change", function(event) {
        colorValue = event.target.value;
        
    });
    let colorButton = document.getElementById('colorButton')
    colorButton.addEventListener("click", function(event) {
        chrome.tabs.query({}, (tabs) => tabs.forEach(tab => 
            chrome.scripting.insertCSS({
            css: `* {
                color: ${colorValue};
            }
            `,
            target: { tabId: tab.id }
        })))
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
