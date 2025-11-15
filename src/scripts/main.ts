import { sleep } from './sleep';
import { sound, startAnimation } from '../store/store';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration: ServiceWorkerRegistration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
} else {
  console.error('Service workers are not supported.');
}

const typedTitle = async () => {
  const titleText = document.querySelector('#title');
  if (!titleText) return;
  const title = 'Michael Duren';

  for (let char of title) {
    titleText.textContent += char;
    await sleep(40);
  }
  await sleep(500);
};

// functions to run on each page load by astro
document.addEventListener('DOMContentLoaded', () => {
  typedTitle();
});

// Modal button handlers
const modalButtonSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-sound'
);
const modalButtonNoSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-no-sound'
);
if (modalButtonSound && modalButtonNoSound) {
  modalButtonSound.addEventListener('click', () => {
    sound.set(true);
    startAnimation.set(true);
    localStorage.setItem('hasSeenSoundModal', 'true');
  });
  modalButtonNoSound.addEventListener('click', () => {
    sound.set(false);
    startAnimation.set(true);
    localStorage.setItem('hasSeenSoundModal', 'true');
  });
}
