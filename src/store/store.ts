import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { logger } from '@nanostores/logger';

export const isAnimationComplete = atom(false);
export const continueAnimation = atom(true);
export const startAnimation = atom(false);
type Sound = 'true' | 'false';
export const sound = persistentAtom<Sound>('sound', 'true');

logger({
  isAnimationComplete: isAnimationComplete,
  continueAnimation: continueAnimation,
  startAnimation: startAnimation,
});
