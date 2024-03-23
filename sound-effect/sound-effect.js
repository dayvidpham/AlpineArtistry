async function playAudio() {
  if (!(await chrome.offscreen.hasDocument())) { // prevent double creation
    await chrome.offscreen.createDocument({
      url: "html/audio.html",
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
      justification: "play sound effects",
    });
  }

  const audioMessage = {
    target: "offscreen",
    playAudio: { source: "sound-effect/anime-wow.mp3", volume: 1 }, // volume is 0 to 1
  };
  
  await chrome.runtime.sendMessage(audioMessage);
}

// async function playSound(source = 'sound-effect/anime-wow.mp3', volume = 1) {
//   await createOffscreen();
//   await chrome.runtime.sendMessage({ play: { source, volume } });
// }

// async function createOffscreen() {
//   if (await chrome.offscreen.hasDocument()) return;
//   await chrome.offscreen.createDocument({
//       url: 'offscreen.html',
//       reasons: ['AUDIO_PLAYBACK'],
//       justification: 'testing'
//   });
// }
// // async function createSoundHtml(){
// //   if (chrome.offscreen.hasDocument()) return;
// //   await chrome.offscreen.createDocument({
// //     url: chrome.runtime.getURL('sound-effect/sound.html'),
// //     reasons: ['AUDIO_PLAYBACK'],
// //     justification: 'notification',
// //   });
// // }

// chrome.action.onClicked.addListener(tab => {
//   playSound();
// })




// function createSoundHtml(){
//   chrome.offscreen.createDocument({
//     url: chrome.runtime.getURL('sound.html'),
//     reasons: ['AUDIO_PLAYBACK'],
//     justification: 'notification',
// });
// }
// // chrome.action.onClicked.addListener((tab));
// chrome.idle.setDetectionInterval(15);

// chrome.idle.onStateChanged.addListener(function(state) {
//   if (state === "idle") {
//     setTimeout(function() {
//       createSoundHtml();
//     }, 10000); //60000 = 1 minute 
//   }
// });
// // chrome.action.onClicked.addListener((tab) => {
// //   main()
// // })



// // const THRESHOLD = 3 * 1000;
// // const GRACE_PERIOD = 10;

// // let interval = null;
// // let counter = GRACE_PERIOD;

// // let controller = new AbortController();
// // let signal = controller.signal;

// // let state;

// // async function main() {
// //   try {
// //     state = await IdleDetector.requestPermission(); 
// //   } catch {
// //     state = await Notification.requestPermission(); 
// //   }
// //   if (state !== 'granted') {
// //     alert('You need to grant the idle detection permission for this extension to work.');
// //   }    

// //   try {
// //     let idleDetector = new IdleDetector();    
// //     idleDetector.addEventListener('change', () => { 
// //       const userState = idleDetector.userState;
// //       const screenState = idleDetector.screenState;
// //       console.log(`Idle change: ${userState}, ${screenState}.`);

// //       if (userState === 'idle') {
// //         interval = setInterval(() => { 
// //           if (counter === 0) {
// //             clearInterval(interval);
// //             createSoundHtml();
// //             counter = GRACE_PERIOD;                    
// //           }
// //         }, 1000);       
// //       } else {
// //         clearInterval(interval);
// //         counter = GRACE_PERIOD;       
// //       }
// //     });
// //     idleDetector.start({
// //       threshold: THRESHOLD,
// //       signal,
// //     });  
// //   } catch (err) {
// //     console.error(err.name, err.message);
// //   }
// // };