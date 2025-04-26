function isAdPlaying() {
  // Basic check: YouTube shows a .ad-showing class on the player during ads
  const player = document.querySelector('.html5-video-player');
  return player?.classList.contains('ad-showing');
}

function clickSkipButtonIfPresent() {
  const normalSkipButton = document.querySelector(".ytp-ad-skip-button");
  const modernSkipButton = document.querySelector(".ytp-ad-skip-button-modern");

  if (normalSkipButton) {
    console.log("clicking normal skip button");
    normalSkipButton.click();
  }

  if (modernSkipButton) {
    console.log("clicking modern skip button");
    modernSkipButton.click();
  }
}

function seekAdToEndIfPresent() {
  const video = document.getElementsByClassName('video-stream')[0];
  if (!video) return;

  console.log("isAd", isAdPlaying());

  if (isAdPlaying()) {
    console.log("seeking to end of ad");
    try {
      video.muted = true;
      video.currentTime = video.duration !== NaN ? video.duration * 2 : 10000;
      video.paused && video.play();
    } catch (e) {
      console.error("Error seeking to end of ad", e);
    }
    clickSkipButtonIfPresent();
  }
}

// Run every 500ms
setInterval(seekAdToEndIfPresent, 500);
