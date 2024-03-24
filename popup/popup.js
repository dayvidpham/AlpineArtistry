
document.addEventListener('DOMContentLoaded', documentEvents  , false);

let colorValue;

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
}

// TODO: selected color changes must persist for new page reloads as well
// need to pass the selected color change over to background.js applyStyle()