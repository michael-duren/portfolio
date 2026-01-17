import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { logger } from "@nanostores/logger";

const isDev = import.meta.env.DEV;

export const formSuccessful = atom(false);

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
    theme: theme,
    formSuccessful: formSuccessful,
  });
}
