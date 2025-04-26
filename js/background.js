// RELOAD ALL YOUTUBE TABS WHEN THE EXTENSION IS FIRST INSTALLED
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.info("EXTENSION INSTALLED");
    chrome.tabs.query({}, (tabs) => {
      tabs
        .filter((tab) => tab.url?.startsWith("https://www.youtube.com/"))
        .forEach(({ id }) => {
          chrome.tabs.reload(id);
        });
    });
  } else if (details.reason === "update") {
    console.info("EXTENSION UPDATED");
  }
});

// Function that will run inside YouTube tabs
function seekAdToEndIfPresentBackground() {
  const isAdPlaying = () => {
    const player = document.querySelector('.html5-video-player');
    return player?.classList.contains('ad-showing') || player?.classList.contains('ad-interrupting');
  };

  const clickSkipButtonIfPresent = () => {
    document.querySelector(".ytp-ad-skip-button")?.click();
    document.querySelector(".ytp-ad-skip-button-modern")?.click();
  };

  const seekAdToEnd = () => {
    const video = document.getElementsByClassName('video-stream')[0];
    if (!video) return;

    if (isAdPlaying()) {
      console.log("[Injected] Ad detected, seeking to end...");
      try {
        video.muted = true;
        video.currentTime = video.duration !== NaN ? video.duration * 2 : 10000;
        video.paused && video.play();
      } catch (e) {
        console.error("Error seeking to end of ad", e);
      }
      clickSkipButtonIfPresent();
    }
  };

  // Start checking every 500ms
  setInterval(seekAdToEnd, 500);
}

// WHEN A TAB UPDATES
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    String(tab.url).includes("https://www.youtube.com/watch")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: seekAdToEndIfPresentBackground,
    });
  }
});
