import { continueAnimation, isAnimationComplete } from '../store/store';
import { sound } from '../store/store';
import { audioManager } from './web-audio';

const playPluckSound = () => {
  if (!sound.get()) return;
  audioManager.play('/audio/pluck.mp3', 0.5);
};

const handleNavClick = () => {
  playPluckSound();
  continueAnimation.set(false);
  isAnimationComplete.set(true);
};

const addNavLinkListeners = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      link.removeEventListener('click', handleNavClick);
      link.addEventListener('click', handleNavClick);
    });
  }
};

document.addEventListener('astro:page-load', () => {
  addNavLinkListeners();
});
