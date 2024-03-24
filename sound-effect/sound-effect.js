chrome.idle.onStateChanged.addListener(function(state) {
  if (state === "idle") {
    setTimeout(function() {
      alert('Hurry up!')
    }, 10000); //60000 = 1 minute 
  }
});

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