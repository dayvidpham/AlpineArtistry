
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
    
chrome.tabs.query({}, (tabs) => tabs.forEach( tab => 
    chrome.scripting.insertCSS({
    files: ['css/colors.css'],
    target: { tabId: tab.id }
})));


function applyColor(){
    chrome.tabs.query({}, (tabs) => tabs.forEach( tab => 
        chrome.scripting.insertCSS({
        files: ['css/colors.css'],
        target: { tabId: tab.id }
    })))
};

// --- On Reloading or Entering example.com --- 
chrome.webNavigation.onCommitted.addListener((details) => {
    if (["reload", "link", "typed", "generated"].includes(details.transitionType)) {

        applyColor();

        // If you want to run only when the reload finished (at least the DOM was loaded)
        chrome.webNavigation.onCompleted.addListener(function onComplete() {

            codeAfterReloadAndFinishSomeLoading();

            chrome.webNavigation.onCompleted.removeListener(onComplete);
        });
    }
});