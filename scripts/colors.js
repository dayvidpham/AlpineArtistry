// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   console.log("printing tabs")
//   console.log(tabs)
  
//   // chrome.runtime.reload()
// //   chrome.scripting.insertCSS({
// //     files: ['css/colors.css'],
// //     target: { tabId: tabs[0].id }
// //   });
// });

chrome.tabs.query({}, (tabs) => tabs.forEach( tab => 
    chrome.scripting.insertCSS({
    files: ['css/colors.css'],
    target: { tabId: tab.id }
    })));
//   chrome.tabs.executeScript(tabs[0].id, {
//     code: `document.body.style.setProperty('color','#FFE4E1','important');
//             [...document.querySelectorAll('p')].forEach(el => el.style.setProperty('color','#FFE4E1','important'));
//             [...document.querySelectorAll('li')].forEach(el => el.style.setProperty('color','#FFE4E1','important'));
//             [...document.querySelectorAll('h1')].forEach(el => el.style.setProperty('color','#FFE4E1','important'));`
//   });
// });

// sets badge to OFF when installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
  // chrome.tabs.query({}, (tabs) => tabs.forEach( tab => 
  //   chrome.scripting.insertCSS({
  //   files: ['css/colors.css'],
  //   target: { tabId: tab.id }
  //   })));
});


// // When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {

  // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  console.log("tab.id:", tab.id)
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  if (nextState === 'ON') {
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ['css/colors.css'],
      target: { tabId: tab.id }
    });
    console.log("inside if statement tab.id:", tab.id)
  } else if (nextState === 'OFF') {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ['css/colors.css'],
      target: { tabId: tab.id }
    });
  }
  
});
