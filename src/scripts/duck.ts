import { playSample, stopSample } from './audio.utils';
import { sound } from '../store/store';

const soundBool = sound.get() === 'true';

const squeekHigh: HTMLAudioElement | null =
  document.querySelector('#squeek-high');
const squeekLow: HTMLAudioElement | null =
  document.querySelector('#squeek-low');

const rubberDuck = document.querySelector('#rubber-duck');
if (rubberDuck) {
  rubberDuck.addEventListener('click', () => {
    if (squeekHigh && soundBool) {
      stopSample(squeekHigh);
      playSample(squeekHigh);
    }
  });
}
const rubberDuckBlue = document.querySelector('#rubber-duck-blue');
if (rubberDuckBlue) {
  rubberDuckBlue.addEventListener('click', () => {
    if (squeekLow && soundBool) {
      stopSample(squeekLow);
      playSample(squeekLow);
    }
  });
}
