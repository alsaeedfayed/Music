export class Player {
  private audio: HTMLAudioElement | null = null;
  //pass call back to call next song
  constructor(private onEnded: () => void) {}

  play(url: string): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.audio = new Audio(url);
    this.audio.onended = this.onEnded;
    this.audio.play();
  }

  pause(): void {
    this.audio?.pause();
  }

  resume(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play();
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  isPlaying(): boolean {
    return this.audio != null && !this.audio.paused;
  }

  endSong(): void {}
}
