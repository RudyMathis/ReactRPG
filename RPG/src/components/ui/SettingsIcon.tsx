import { useEffect, useRef, useState } from 'react';
import styles from './UI.module.css';
import SoundManager from '../../gameData/SoundManager';
import { useAtomValue } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';

const SettingsIcon = () => {
    const [open, setOpen] = useState(false);
    const [volume, setVolume] = useState(50);
    const menuRef = useRef<HTMLDivElement>(null);
    const tutorial = useAtomValue(tutorialAtom);

    const handleOpenSettings = () => {
        setOpen(prev => !prev);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        SoundManager.setMusicVolume(newVolume / 100);
        localStorage.setItem('volume', newVolume.toString());
    };
    
    useEffect(() => {
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume !== null) {
            const parsed = Number(savedVolume);
            setVolume(parsed);
            SoundManager.setMusicVolume(parsed / 100);
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
        <div className={styles.settingsContainer} {...(tutorial?.isClick && { 'data-tutorial': tutorial?.isClick })}>
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

                    {/* <div className={styles.settingsRow}>Gamepedia</div>
                    <div className={styles.settingsRow}>Credits</div> */}
                </div>
            </div>
        </div>
    );
};

export default SettingsIcon;