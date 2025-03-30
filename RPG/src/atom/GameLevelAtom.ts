import { atom } from "jotai";

type GameLevel = 
    { 
        level: number, 
        round: number, 
        isLevelOver: boolean, 
        isRoundOver: boolean 
    };

const updateGameLevel = (level: number, round: number, isLevelOver: boolean, isRoundOver: boolean): GameLevel => {
    if (isLevelOver) {
        return { level, round, isLevelOver: false, isRoundOver: false };
    }
    
    if (isRoundOver) {
        return { level, round, isLevelOver: false, isRoundOver: false };
    }
    console.log("GameLevelAtom", level, round, isLevelOver, isRoundOver);
    return { level, round, isLevelOver: false, isRoundOver: false };
};

export const GameLevelAtom = atom<GameLevel>(updateGameLevel(1, 1, false, false));