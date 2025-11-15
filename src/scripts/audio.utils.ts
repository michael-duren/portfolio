export const playSample = (audioEl: HTMLAudioElement) => {
  audioEl.pause();
  audioEl.currentTime = 0;
  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
};

export const stopSample = (audioEl: HTMLAudioElement) => {
  audioEl.pause();
  audioEl.currentTime = 0;
};
