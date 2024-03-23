chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.playAudio && message.target === "offscreen") {
      playAudio(message.playAudio);
      sendResponse("Audio played");
    }
  });
  
  function playAudio({ source, volume }) {
    const audio = new Audio(source);
    audio.volume = volume;
    audio.play();
  }