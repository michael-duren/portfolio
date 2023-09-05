import { playSample, stopSample } from './audio.utils';

const squeekHigh: HTMLAudioElement | null =
  document.querySelector('#squeek-high');
const squeekLow: HTMLAudioElement | null =
  document.querySelector('#squeek-low');

const rubberDuck = document.querySelector('#rubber-duck');
if (rubberDuck) {
  rubberDuck.addEventListener('click', () => {
    if (squeekHigh) {
      stopSample(squeekHigh);
      playSample(squeekHigh);
    }
  });
}
const rubberDuckBlue = document.querySelector('#rubber-duck-blue');
if (rubberDuckBlue) {
  rubberDuckBlue.addEventListener('click', () => {
    if (squeekLow) {
      stopSample(squeekLow);
      playSample(squeekLow);
    }
  });
}
