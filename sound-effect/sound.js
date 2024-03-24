chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "play_audio") {
      playAudio(msg.data.audio);
    }
  });
  
  function playAudio({ source, volume }) {
    const audio = new Audio(source);
    audio.volume = volume;
    audio.play();
  }