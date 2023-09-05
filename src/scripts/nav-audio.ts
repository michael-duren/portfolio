import { continueAnimation } from '../store/store';

const addNavLinkListeners = () => {
  const pluck: HTMLAudioElement | null = document.querySelector('#pluck');

  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        console.log('CLICKED');
        new Audio('/audio/pluck.mp3').play();
        continueAnimation.set(false);
      });
    });
  }
};

document.addEventListener('astro:page-load', () => {
  addNavLinkListeners();
});
