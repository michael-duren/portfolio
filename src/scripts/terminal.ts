import { terminalCommands } from './constants';
import JSConfetti from 'js-confetti';
import { playSample, stopSample } from './audio.utils';
import {
  continueAnimation,
  isAnimationComplete,
  startAnimation,
} from '../store/store';
import { caretUpBoldIcon } from './constants';
import { sleep } from './sleep';
import { sound } from '../store/store';

const keyboardSounds: NodeListOf<HTMLAudioElement> =
  document.querySelectorAll('.keyboard-sound');
const blip: HTMLAudioElement | null = document.querySelector('#blip');

// animation speeds
const type = 200;
const fast = 100;
const longPause = 1500;

/*
 * Functions
 */
const playRandomKeyboardSound = (i?: number) => {
  if (i) {
    keyboardSounds[i].play();
    return;
  }
  const randomIndex = Math.floor(Math.random() * keyboardSounds.length);
  keyboardSounds[randomIndex].play();
};

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
      }
    }
    return;
  }

  for (let command of terminalCommands) {
    // Type the command in the terminal
    for (let i = 0; i < command.command.length; i++) {
      if (!continueAnimation.get()) return;
      if (sound) playRandomKeyboardSound(i);
      terminalInput!.textContent += command.command[i];
      if (i % 4 === 0) {
        await sleep(type);
      } else {
        await sleep(fast);
      }
    }
    // display command output to screen
    for (let output of command.output) {
      if (!continueAnimation.get()) return; // if user clicks on a link we want to stop the animation
      if (sound && blip) playSample(blip); // if sound is enabled we want to play a blip sound
      // create the list item and append it to the terminal output
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
      if (blip) stopSample(blip);
    }
    await sleep(longPause);
    if (terminalInput.textContent !== 'Have Fun') {
      terminalInput.textContent = '';
    } else {
      const jsConfetti = new JSConfetti();
      await jsConfetti.addConfetti({});
    }
  }
  isAnimationComplete.set(true);
};

document.addEventListener('astro:page-load', () => {
  startAnimation.listen((startAnimation) => {
    console.log('startAnimation from termina.ts', sound);
    if (startAnimation) {
      runTerminal(eval(sound.get()), isAnimationComplete.get());
    }
  });
});
