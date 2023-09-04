import React, { useState, useEffect } from 'preact/hooks';

const CaretUpBoldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
  >
    <path
      fill="currentColor"
      d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17Z"
    />
  </svg>
);

const TerminalText = () => {
  const [titleText, setTitleText] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  useEffect(() => {
    const typeTitle = async () => {
      const title = 'Michael Duren';
      for (let char of title) {
        setTitleText((prev) => prev + char);
        await sleep(40);
      }
      await sleep(500);
    };

    const runCommands = async () => {
      for (let command of terminalCommands) {
        for (let i = 0; i < command.command.length; i++) {
          setTerminalInput((prev) => prev + command.command[i]);
          if (i % 2 === 0) {
            await sleep(500);
          } else {
            await sleep(100);
          }
        }
        setTerminalOutput((prev) => [...prev, ...command.output]);
        await sleep(2000);
        setTerminalInput('');
      }
    };

    typeTitle().then(runCommands);
  }, []);

  return (
    <div className="terminal">
      <div id="title">{titleText}</div>
      <div id="terminal-input">{terminalInput}</div>
      <ul id="terminal-output">
        {terminalOutput.map((output, idx) => (
          <li key={idx} className="flex items-center gap-2 fade-in">
            <div className="w-4 h-4 rotate-90">
              <CaretUpBoldIcon />
            </div>
            <div>{output}</div>
          </li>
        ))}
      </ul>
      test
    </div>
  );
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

export default TerminalText;
