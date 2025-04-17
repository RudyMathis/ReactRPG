import { atom } from 'jotai';

export const generateNewBackground = () => {
    const backgrounds = [
        '/assets/backgrounds/Forest.png',
        '/assets/backgrounds/Desert.png',
        '/assets/backgrounds/Snow.png',
        '/assets/backgrounds/City.png',
        '/assets/backgrounds/Field.png'
    ];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

const savedBackground = localStorage.getItem('background');

export const backgroundAtom = atom(
    savedBackground || generateNewBackground()
);

export const setBackgroundAtom = atom(null, (_get, set) => {
    const newBg = generateNewBackground();
    localStorage.setItem('background', newBg);
    set(backgroundAtom, newBg);
});
