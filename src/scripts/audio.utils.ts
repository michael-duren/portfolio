export const playSample = (audioEl: HTMLAudioElement) => audioEl.play();
export const stopSample = (audioEl: HTMLAudioElement) => {
  audioEl.pause();
  audioEl.currentTime = 0;
};
