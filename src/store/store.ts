import { atom } from "nanostores";
import { logger } from "@nanostores/logger";

const isDev = import.meta.env.DEV;

export const isAnimationComplete = atom(false);
export const continueAnimation = atom(true);
export const startAnimation = atom(false);
type Sound = "true" | "false";
export const sound = atom<Sound>("true");
export const formSuccessful = atom(false);

if (isDev) {
  logger({
    isAnimationComplete: isAnimationComplete,
    continueAnimation: continueAnimation,
    startAnimation: startAnimation,
  });
}
