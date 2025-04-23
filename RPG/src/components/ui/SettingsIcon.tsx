import { useEffect, useRef, useState } from 'react';
import styles from './UI.module.css';
import AudioManager from '../../gameData/AudioManager';

const SettingsIcon = () => {
    const [open, setOpen] = useState(false);
    const [volume, setVolume] = useState(50);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const handleOpenSettings = () => {
        setOpen(prev => !prev);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        AudioManager.setVolume(newVolume); // ← apply volume to music
        localStorage.setItem('volume', newVolume.toString());
    };

    useEffect(() => {
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume !== null) {
            const parsed = Number(savedVolume);
            setVolume(parsed);
            AudioManager.setVolume(parsed);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div className={styles.settingsContainer}>
            <img
                src="/assets/Settings_Icon.png"
                className={styles.settingsIcon}
                onClick={handleOpenSettings}
                alt="Settings"
            />

            <div
                className={styles.settingsOverlay}
                data-open={open}
            >
                <div className={styles.settingsMenu} data-open={open} ref={menuRef}>
                    <h1>Settings</h1>

                    <div className={styles.settingsRow}>
                        <label htmlFor="volume">Volume: {volume}</label>
                        <input
                            type="range"
                            id="volume"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>

                    <div className={styles.settingsRow}>Gamepedia</div>
                    <div className={styles.settingsRow}>Credits</div>
                </div>
            </div>
        </div>
    );
};

export default SettingsIcon;