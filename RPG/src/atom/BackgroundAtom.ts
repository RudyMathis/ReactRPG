import { atom } from 'jotai';

export const generateNewBackground = () => {
    const backgrounds = [
        'Cave',
        'City',
        'Desert',
        'Field',
        'Forest',
        'Snow',
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
