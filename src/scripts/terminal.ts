// global vars

let play = false;
let sound = false;

const audioFiles = [
  '/assets/keyboard-samples/1.wav',
  '/assets/keyboard-samples/2.wav',
  '/assets/keyboard-samples/3.wav',
  '/assets/keyboard-samples/4.wav',
  '/assets/keyboard-samples/5.wav',
  '/assets/keyboard-samples/6.wav',
  '/assets/keyboard-samples/7.wav',
  '/assets/keyboard-samples/8.wav',
  '/assets/keyboard-samples/9.wav',
  '/assets/keyboard-samples/10.wav',
];

const blip = '/assets/keyboard-samples/blip.wav';
const pluck = '/assets/keyboard-samples/pluck.mp3';

const caretUpBoldIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17Z"/></svg>';

// functions

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
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

const playSample = (sample: string) => {
  new Audio(sample).play();
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

const pause = 400;
const type = 200;
const fast = 100;

const longPause = 1500;

const runTerminal = async (sound: boolean) => {
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  if (!terminalInput || !terminalOutput) return;

  for (let command of terminalCommands) {
    for (let i = 0; i < command.command.length; i++) {
      if (sound) playRandomAudio(i);
      terminalInput!.textContent += command.command[i];
      if (i % 4 === 0) {
        await sleep(type);
      } else {
        await sleep(fast);
      }
    }
    for (let output of command.output) {
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
};

const startAnimation = (sound: boolean) => {
  play = true;
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  if (!terminalInput || !terminalOutput) return;

  terminalInput.textContent = '';
  terminalOutput.innerHTML = '';

  runTerminal(sound);
};

document.addEventListener('astro:page-load', () => {
  typedTitle();

  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks) {
    navLinks.forEach((link) => {
      if (sound) {
        link.addEventListener('click', () => {
          playSample(pluck);
        });
      }
    });
  }

  const modalButtonSound: HTMLButtonElement | null = document.querySelector(
    '#modal-button-sound'
  );
  const modalButtonNoSound: HTMLButtonElement | null = document.querySelector(
    '#modal-button-no-sound'
  );
  if (modalButtonSound && modalButtonNoSound) {
    modalButtonSound.addEventListener('click', () => {
      sound = true;
      startAnimation(true);
    });
    modalButtonNoSound.addEventListener('click', () => {
      sound = false;
      startAnimation(false);
    });
  }

  const homeButton = document.querySelector('#home-button');
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      startAnimation(sound);
    });
  }
});

document.addEventListener('astro:route-change', () => {
  play = false;
});

const terminalCommands = [
  {
    command: 'Welcome',
    output: [
      'Welcome to my portfolio site, there are a lot of fun things to check out here 🎉',
    ],
  },
  {
    command: 'I am...',
    output: [
      "I'm Michael...",
      'a',
      'Software Engineer',
      'Web Developer',
      'Musician',
      'Based in Twin Cities MN',
    ],
  },
  {
    command: 'Have Fun',
    output: ['Have fun exploring my site!', '🥳🥳🥳'],
  },
];
