const caretUpBoldIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17Z"/></svg>';

let displayedOutput = [];

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
    await sleep(50);
  }
  await sleep(500);
};

const terminalCommands = [
  {
    command: 'Welcome',
    output: [
      'Welcome to my portfolio site, there are a lot of fun things to check out here 🎉',
    ],
  },
  {
    command: 'Michael Duren',
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
    output: [],
  },
];

const pause = 1000;
const type = 500;
const fast = 100;

const longPause = 2000;

const runTerminal = async () => {
  const terminalInput = document.querySelector('#terminal-input');
  const terminalOutput = document.querySelector('#terminal-output');
  if (!terminalInput || !terminalOutput) return;

  for (let command of terminalCommands) {
    for (let i = 0; i < command.command.length; i++) {
      terminalInput!.textContent += command.command[i];
      if (i % 2 === 0) {
        await sleep(type);
      } else {
        await sleep(fast);
      }
    }
    for (let output of command.output) {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2';

      const iconDiv = document.createElement('div');
      iconDiv.className = 'w-4 h-4 rotate-90';
      iconDiv.innerHTML = caretUpBoldIcon;

      const textDiv = document.createElement('div');
      textDiv.textContent = output;

      li.appendChild(iconDiv);
      li.appendChild(textDiv);

      terminalOutput.appendChild(li);
    }
    await sleep(longPause);
    terminalInput.textContent = '';
  }
};

typedTitle().then(() => {
  runTerminal();
});
