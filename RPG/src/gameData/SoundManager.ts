class SoundManager {
    private static music: HTMLAudioElement | null = null;
    private static sfx: Record<string, HTMLAudioElement> = {};
    private static musicVolume = 0.5;
    private static sfxVolume = 1.0;

    // Getter for music
    static getMusic(): HTMLAudioElement | null {
        return SoundManager.music;
    }

    // MUSIC CONTROLS
    static playMusic(src: string, loop = true) {
        if (SoundManager.music) {
            SoundManager.music.pause();
        }
        SoundManager.music = new Audio(src);
        SoundManager.music.loop = loop;
        SoundManager.music.volume = SoundManager.musicVolume;
        SoundManager.music.play();
    }

    static stopMusic(fadeDuration = 1000) {
        if (SoundManager.music !== null) {
            const fadeSteps = 20;
            const interval = fadeDuration / fadeSteps;
            let currentStep = 0;
            const initialVolume = SoundManager.music.volume;
    
            const fadeOut = setInterval(() => {
                currentStep++;
                const newVolume = initialVolume * (1 - currentStep / fadeSteps);
                if (SoundManager.music) {  // Ensuring it's still not null
                    SoundManager.music.volume = Math.max(0, newVolume);
                }
    
                if (currentStep >= fadeSteps) {
                    clearInterval(fadeOut);
                    if (SoundManager.music) {
                        SoundManager.music.pause();
                        SoundManager.music.currentTime = 0;
                        SoundManager.music = null;
                    }
                }
            }, interval);
        }
    }

    static setMusicVolume(volume: number) {
        SoundManager.musicVolume = volume;
        if (SoundManager.music !== null) {
            SoundManager.music.volume = volume;
        }
    }
    
    // SFX CONTROLS
    static preloadSfx(name: string, src: string) {
        const audio = new Audio(src);
        SoundManager.sfx[name] = audio;
    }

    static playSfx(name: string) {
        const sound = SoundManager.sfx[name];
        if (sound) {
            const sfxClone = sound.cloneNode() as HTMLAudioElement;
            sfxClone.volume = SoundManager.sfxVolume;
            sfxClone.play().catch(error => {
                console.warn(`Failed to play SFX "${name}":`, error);
            });
        } else {
            console.warn(`SFX "${name}" not preloaded.`);
        }
    }

    static setSfxVolume(volume: number) {
        SoundManager.sfxVolume = volume;
    }
}

export default SoundManager;