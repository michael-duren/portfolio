import { terminalCommands } from "./constants";
import {
  continueAnimation,
  isAnimationComplete,
  startAnimation,
} from "../store/store";
import { caretUpBoldIcon } from "./constants";
import { sleep } from "./sleep";
import { sound } from "../store/store";
import { audioManager } from "./web-audio";

const type = 100;
const fast = 75;
const longPause = 500;

const keyboardSoundUrls = [
  "/audio/K1.mp3",
  "/audio/K2.mp3",
  "/audio/K3.mp3",
  "/audio/K4.mp3",
  "/audio/K5.mp3",
  "/audio/K6.mp3",
  "/audio/K7.mp3",
  "/audio/K8.mp3",
  "/audio/K9.mp3",
  "/audio/K10.mp3",
];

const playRandomKeyboardSound = () => {
  const randomIndex = Math.floor(Math.random() * keyboardSoundUrls.length);
  audioManager.play(keyboardSoundUrls[randomIndex]!, 0.6);
};

const scrollToBottom = (container: HTMLElement | null) => {
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const runTerminal = async (sound: boolean) => {
  const terminalInput = document.querySelector("#terminal-input");
  const terminalOutput = document.querySelector("#terminal-output");
  if (!terminalInput || !terminalOutput) return;

  const terminalContainer = terminalOutput.closest(
    ".overflow-y-auto",
  ) as HTMLElement;

  for (let command of terminalCommands) {
    for (let i = 0; i < command.command.length; i++) {
      if (!continueAnimation.get()) return;
      if (sound) playRandomKeyboardSound();
      terminalInput!.textContent! += command.command[i];
      if (i % 4 === 0) {
        await sleep(type);
      } else {
        await sleep(fast);
      }
    }

    for (let output of command.output) {
      if (!continueAnimation.get()) return;
      if (sound) audioManager.play("/audio/blip.mp3", 0.4);

      const li = document.createElement("li");
      li.className =
        "flex text-xs md:text-base font-semibold items-center gap-2 fade-in";

      const iconDiv = document.createElement("div");
      iconDiv.className = "w-4 h-4 rotate-90";
      iconDiv.innerHTML = caretUpBoldIcon;

      const textDiv = document.createElement("div");
      textDiv.textContent = output;

      li.appendChild(iconDiv);
      li.appendChild(textDiv);

      terminalOutput.appendChild(li);
      scrollToBottom(terminalContainer);
      await sleep(200);
    }
    await sleep(longPause);
    terminalInput.textContent = "";
  }
  isAnimationComplete.set(true);
};
const updateCompletedAnimation = () => {
  const terminalInput = document.querySelector("#terminal-input");
  const terminalOutput = document.querySelector("#terminal-output");
  if (!terminalInput || !terminalOutput) return;
  const lastCommand = terminalCommands[terminalCommands.length - 1];
  terminalInput.textContent = lastCommand?.command || "";
  for (let command of terminalCommands) {
    for (let output of command.output) {
      const li = document.createElement("li");
      li.className = "flex items-center gap-2 fade-in";

      const iconDiv = document.createElement("div");
      iconDiv.className = "w-4 h-4 rotate-90";
      iconDiv.innerHTML = caretUpBoldIcon;

      const textDiv = document.createElement("div");
      textDiv.textContent = output;

      li.appendChild(iconDiv);
      li.appendChild(textDiv);

      terminalOutput.appendChild(li);
    }
  }
};

document.addEventListener("astro:page-load", () => {
  if (startAnimation.get()) {
    runTerminal(sound.get());
  }

  startAnimation.listen((shouldStart) => {
    if (shouldStart) {
      runTerminal(sound.get());
    }
  });

  if (!continueAnimation.get()) {
    updateCompletedAnimation();
  }
});
