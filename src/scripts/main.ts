import { sleep } from "./sleep";
import { hasSeenSoundModal, sound, startAnimation } from "../store/store";

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
  const setSound = (b: boolean) => {
    sound.set(b);
    startAnimation.set(true);
    hasSeenSoundModal.set(true);
  };
  if (modalButtonSound && modalButtonNoSound) {
    modalButtonSound.addEventListener("click", () => {
      setSound(true);
    });
    modalButtonNoSound.addEventListener("click", () => {
      setSound(false);
    });
  }
});
