chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "play_audio") {
      playAudio(msg.data.audio);
    }
  });
  
function playAudio({ source, volume, loop }) {
    const audio = new Audio(source);
    if(loop) {
      audio.loop = "loop";
    }
    audio.volume = volume;
    audio.play();
}