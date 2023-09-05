import { atom } from 'nanostores';

export const isAnimationComplete = atom(false);
export const continueAnimation = atom(true);
export const startAnimation = atom(false);
export const sound = atom(localStorage.getItem('sound') || '0');
