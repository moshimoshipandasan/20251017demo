const audioToggleButton = document.querySelector("[data-audio-toggle]");
const audioToggleLabel = audioToggleButton?.querySelector("[data-audio-label]");
const playLabel =
  audioToggleButton?.dataset.playLabel ?? audioToggleLabel?.textContent ?? "主題曲を再生";
const pauseLabel = audioToggleButton?.dataset.pauseLabel ?? "主題曲を停止";
const navToggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const bgAudio = document.getElementById("bg-audio");
let isAudioPlaying = false;

const toggleAudio = async () => {
  if (!bgAudio) {
    return;
  }

  try {
    if (!isAudioPlaying) {
      await bgAudio.play();
      audioToggleButton.classList.add("is-active");
      if (audioToggleLabel) {
        audioToggleLabel.textContent = pauseLabel;
      } else {
        audioToggleButton.textContent = pauseLabel;
      }
      isAudioPlaying = true;
    } else {
      bgAudio.pause();
      audioToggleButton.classList.remove("is-active");
      if (audioToggleLabel) {
        audioToggleLabel.textContent = playLabel;
      } else {
        audioToggleButton.textContent = playLabel;
      }
      isAudioPlaying = false;
    }
  } catch (error) {
    console.warn("Audio playback failed:", error);
  }
};

if (audioToggleButton) {
  audioToggleButton.addEventListener("click", toggleAudio);
}

if (bgAudio) {
  bgAudio.addEventListener("ended", () => {
    isAudioPlaying = false;
    audioToggleButton?.classList.remove("is-active");
    if (audioToggleLabel) {
      audioToggleLabel.textContent = playLabel;
    } else if (audioToggleButton) {
      audioToggleButton.textContent = playLabel;
    }
  });
}

if (navToggleButton && navLinks) {
  navToggleButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.24,
  },
);

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});
