import { continueAnimation, isAnimationComplete } from '../store/store';
import {
  terminalCommands,
  audioFiles,
  blip,
  pluck,
  caretUpBoldIcon,
} from './constants';

// global vars
let sound = false;

// functions

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const playSample = (sample: string) => {
  new Audio(sample).play();
};

const typedTitle = async () => {
  const titleText = document.querySelector('#title');
  if (!titleText) return;
  const title = 'Michael Duren';

  for (let char of title) {
    titleText.textContent += char;
    await sleep(40);
  }
  await sleep(500);
};

const playRandomAudio = (i?: number) => {
  if (i) {
    const audio = new Audio(audioFiles[i]);
    audio.play();
    return;
  }
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const audio = new Audio(audioFiles[randomIndex]);
  audio.play();
};

const type = 200;
const fast = 100;

const longPause = 1500;

const runTerminal = async (sound: boolean, completed: boolean) => {
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  if (!terminalInput || !terminalOutput) return;

  if (completed) {
    terminalInput.textContent = 'Have Fun';
    for (let command of terminalCommands) {
      for (let output of command.output) {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 fade-in';

        const iconDiv = document.createElement('div');
        iconDiv.className = 'w-4 h-4 rotate-90';
        iconDiv.innerHTML = caretUpBoldIcon;

        const textDiv = document.createElement('div');
        textDiv.textContent = output;

        li.appendChild(iconDiv);
        li.appendChild(textDiv);

        terminalOutput.appendChild(li);
        sleep(100);
      }
    }
    return;
  }

  for (let command of terminalCommands) {
    for (let i = 0; i < command.command.length; i++) {
      if (!continueAnimation.get()) return;
      if (sound) playRandomAudio(i);
      terminalInput!.textContent += command.command[i];
      if (i % 4 === 0) {
        await sleep(type);
      } else {
        await sleep(fast);
      }
    }
    for (let output of command.output) {
      if (!continueAnimation.get()) return;
      if (sound) playSample(blip);
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2 fade-in';

      const iconDiv = document.createElement('div');
      iconDiv.className = 'w-4 h-4 rotate-90';
      iconDiv.innerHTML = caretUpBoldIcon;

      const textDiv = document.createElement('div');
      textDiv.textContent = output;

      li.appendChild(iconDiv);
      li.appendChild(textDiv);

      terminalOutput.appendChild(li);
      await sleep(200);
    }
    await sleep(longPause);
    if (terminalInput.textContent !== 'Have Fun') {
      terminalInput.textContent = '';
    }
  }
  isAnimationComplete.set(true);
};

// functions to run on each page load by astro
document.addEventListener('astro:page-load', () => {
  typedTitle();
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (sound) {
          playSample(pluck);
        }
        continueAnimation.set(false);
      });
    });
  }

  const rubberDuck = document.querySelector('#rubber-duck');
  if (rubberDuck) {
    rubberDuck.addEventListener('click', () => {
      new Audio('/assets/keyboard-samples/duck-squeek.mp3').play();
    });
  }
  const rubberDuckBlue = document.querySelector('#rubber-duck-blue');
  if (rubberDuckBlue) {
    rubberDuckBlue.addEventListener('click', () => {
      new Audio('/assets/keyboard-samples/duck-squeek-blue.mp3').play();
    });
  }

  if (!isAnimationComplete.get()) {
    // if animation has not run yet we want to allow the user to select sound or no sound
    return;
  }
  runTerminal(sound, isAnimationComplete.get());
});

const modalButtonSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-sound'
);
const modalButtonNoSound: HTMLButtonElement | null = document.querySelector(
  '#modal-button-no-sound'
);
if (modalButtonSound && modalButtonNoSound) {
  modalButtonSound.addEventListener('click', () => {
    sound = true;
    runTerminal(true, false);
  });
  modalButtonNoSound.addEventListener('click', () => {
    sound = false;
    runTerminal(false, false);
  });
}
