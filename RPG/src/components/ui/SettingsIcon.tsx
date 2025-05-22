import { useEffect, useRef, useState } from 'react';
import styles from './UI.module.css';
import SoundManager from '../../gameData/SoundManager';
import { useAtomValue } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';
import GameReference from './GameReference';
import Btn from './Btn';

const SettingsIcon = () => {
    const [open, setOpen] = useState(false);
    const [openGameReference, setOpenGameReference] = useState(false);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                openGameReference &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenGameReference(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openGameReference]);

    const handleGameReference = () => {
        setOpenGameReference(prev => !prev);
    };

    return (
        <div className={styles.settingsContainer} {...(tutorial.isTutorial && { 'data-tutorial-layer': 'top' })}>
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
                    <Btn onClick={handleGameReference} text="Game Reference" />
                    <div className={styles.scrollWrapper}>
                        {openGameReference && <GameReference/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsIcon;