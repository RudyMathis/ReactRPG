class AudioManager {
    private static instance: HTMLAudioElement;

    static getInstance(): HTMLAudioElement {
        if (!AudioManager.instance) {
            AudioManager.instance = new Audio('/assets/sfx/battle_music_1.mp3');
            AudioManager.instance.loop = true;
            AudioManager.instance.volume = 0.5;
        }
        return AudioManager.instance;
    }

    static setVolume(volume: number) {
        const audio = this.getInstance();
        audio.volume = volume / 100;
        if(audio.volume <= 0) AudioManager.stop();
    }

    static play() {
        const audio = this.getInstance();
        if (audio.paused) audio.play();
    }

    static stop(fadeDuration = 3000) {
        const audio = this.getInstance();
        const initialVolume = audio.volume;
        const step = 0.05;
        const fadeStepTime = fadeDuration * step;
    
        const fadeOut = () => {
            if (audio.volume > step) {
                audio.volume -= step;
                setTimeout(fadeOut, fadeStepTime);
            } else {
                audio.volume = 0;
                audio.pause();
                audio.currentTime = 0;
                audio.volume = initialVolume;
            }
        };
    
        fadeOut();
    }
    
}

export default AudioManager;