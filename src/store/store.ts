import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { logger } from "@nanostores/logger";

const isDev = import.meta.env.DEV;

export const isAnimationComplete = atom(false);
export const continueAnimation = atom(true);
export const startAnimation = atom(false);
export const sound = atom(true);
export const formSuccessful = atom(false);
export const hasSeenSoundModal = atom(false);

export const theme = persistentAtom<"light" | "dark" | "system">(
  "theme",
  "system",
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

if (isDev) {
  logger({
    isAnimationComplete: isAnimationComplete,
    continueAnimation: continueAnimation,
    startAnimation: startAnimation,
    theme: theme,
  });
}
