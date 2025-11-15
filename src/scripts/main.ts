import { sleep } from "./sleep";
import { hasSeenSoundModal, sound, startAnimation } from "../store/store";
import { audioManager } from "./web-audio";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration: ServiceWorkerRegistration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
} else {
  console.error("Service workers are not supported.");
}

const preloadAllSounds = async () => {
  const soundUrls = [
    '/audio/K1.mp3',
    '/audio/K2.mp3',
    '/audio/K3.mp3',
    '/audio/K4.mp3',
    '/audio/K5.mp3',
    '/audio/K6.mp3',
    '/audio/K7.mp3',
    '/audio/K8.mp3',
    '/audio/K9.mp3',
    '/audio/K10.mp3',
    '/audio/blip.mp3',
    '/audio/pluck.mp3',
    '/audio/bell.mp3',
    '/audio/squeek-high.mp3',
    '/audio/squeek-low.mp3',
  ];

  await audioManager.init();
  await audioManager.loadMultipleSounds(soundUrls);
};

const typedTitle = async () => {
  const titleText = document.querySelector("#title");
  if (!titleText) return;
  const title = "Michael Duren";

  for (let char of title) {
    titleText.textContent += char;
    await sleep(40);
  }
  await sleep(500);
};

document.addEventListener("DOMContentLoaded", () => {
  typedTitle();
});

document.addEventListener("astro:page-load", () => {
  const modalButtonSound: HTMLButtonElement | null = document.querySelector(
    "#modal-button-sound",
  );
  const modalButtonNoSound: HTMLButtonElement | null = document.querySelector(
    "#modal-button-no-sound",
  );
  const setSound = async (b: boolean) => {
    await preloadAllSounds();
    audioManager.resume();
    sound.set(b);
    startAnimation.set(true);
    hasSeenSoundModal.set(true);
  };

  const handleSoundClick = () => setSound(true);
  const handleNoSoundClick = () => setSound(false);

  if (modalButtonSound && modalButtonNoSound) {
    modalButtonSound.removeEventListener("click", handleSoundClick);
    modalButtonSound.addEventListener("click", handleSoundClick);
    modalButtonNoSound.removeEventListener("click", handleNoSoundClick);
    modalButtonNoSound.addEventListener("click", handleNoSoundClick);
  }
});
