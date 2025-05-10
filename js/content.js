const targetWords = [
  "ad",
  "blockers",
  "violate",
  "youtube's",
  "terms",
  "of",
  "service",
];

function isAdPlaying() {
  // Basic check: YouTube shows a .ad-showing class on the player during ads
  const player = document.querySelector(".html5-video-player");
  return player?.classList.contains("ad-showing");
}

function isAdDialogPresent() {
  const dialogs = document.querySelectorAll("tp-yt-paper-dialog");

  const match = Array.from(dialogs).find((dialog) => {
    const text = dialog.textContent?.toLowerCase() || "";
    const matchedCount = targetWords.filter((word) =>
      text.includes(word)
    ).length;
    return matchedCount / targetWords.length >= 0.5;
  });

  if (match && match.style.display !== "none") {
    console.log("Matched dialog:");
    return true;
  } else {
    return false;
  }
}

function hideAdDialogs() {
  const dialogs = document.querySelectorAll("tp-yt-paper-dialog");
  dialogs.forEach((dialog) => {
    dialog.style.display = "none";
  });
  const backdrops = document.querySelectorAll("tp-yt-iron-overlay-backdrop");
  backdrops.forEach((backdrop) => {
    backdrop.style.display = "none";
  });

  ["wheel", "touchmove", "scroll"].forEach((event) => {
    window.addEventListener(event, (e) => e.stopPropagation(), {
      capture: true,
      passive: false,
    });
  });
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
  const video = document.getElementsByClassName("video-stream")[0];
  if (!video) return;

  console.log("isAd", isAdPlaying());

  if (isAdDialogPresent()) {
    hideAdDialogs();
    setTimeout(() => {
      video.paused && video.play();
    }, 500);
  }

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
