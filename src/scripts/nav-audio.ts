import { continueAnimation, isAnimationComplete } from '../store/store';
import { sound } from '../store/store';

const addNavLinkListeners = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        
        if (sound.get()) {
          const pluck = new Audio('/audio/pluck.mp3');
          pluck.play();
        }
        continueAnimation.set(false);
        isAnimationComplete.set(true);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  addNavLinkListeners();
});
