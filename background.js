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
        justification: 'testing' // details for using the API
    });
}

chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener(function(state) {
    if (state === "idle") {
    //   setTimeout(function() {
        playSound();
    //   }, 10000); //60000 = 1 minute 
    }
  });