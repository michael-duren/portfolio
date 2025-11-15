class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private isInitialized: boolean = false;

  async init() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AudioContext:', error);
    }
  }

  async loadSound(url: string): Promise<void> {
    if (!this.audioContext) await this.init();
    if (!this.audioContext) return;

    if (this.audioBuffers.has(url)) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(url, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound: ${url}`, error);
    }
  }

  async loadMultipleSounds(urls: string[]): Promise<void> {
    await Promise.all(urls.map(url => this.loadSound(url)));
  }

  play(url: string, volume: number = 1.0): void {
    if (!this.audioContext) return;

    const buffer = this.audioBuffers.get(url);
    if (!buffer) {
      console.warn(`Sound not loaded: ${url}`);
      return;
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start(0);
  }

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const audioManager = new AudioManager();
