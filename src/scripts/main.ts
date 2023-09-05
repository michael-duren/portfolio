import { playSample, stopSample } from './audio.utils';
import {
  continueAnimation,
  isAnimationComplete,
  startAnimation,
} from '../store/store';
import { sleep } from './sleep';

if (localStorage.getItem('sound') === null) {
  localStorage.setItem('sound', '0');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/scripts/sw.js')
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
document.addEventListener('astro:page-load', () => {
  typedTitle();

  if (!isAnimationComplete.get()) {
    // if animation has not run yet we want to allow the user to select sound or no sound
    return;
  }
});

const modalButtonSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-sound'
);
const modalButtonNoSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-no-sound'
);
if (modalButtonSound && modalButtonNoSound) {
  modalButtonSound.addEventListener('click', () => {
    localStorage.setItem('sound', '1');
    startAnimation.set(true);
    console.log('startAnimation', startAnimation.get());
  });
  modalButtonNoSound.addEventListener('click', () => {
    localStorage.setItem('sound', '0');
    startAnimation.set(true);
  });
}

console.log('Hello from main.ts');
