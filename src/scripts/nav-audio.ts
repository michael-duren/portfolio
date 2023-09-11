import { continueAnimation, isAnimationComplete } from '../store/store';
import { sound } from '../store/store';

const addNavLinkListeners = () => {
  const soundBool = sound.get() === 'true';
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const pluck = new Audio('/audio/pluck.mp3');
        if (soundBool) pluck.play();
        continueAnimation.set(false);
        isAnimationComplete.set(true);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  addNavLinkListeners();
});
