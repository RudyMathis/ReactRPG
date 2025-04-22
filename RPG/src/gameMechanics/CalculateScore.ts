import EnemyAtom from "../atom/BaseEnemyAtom";
import { GameLevelAtom } from "../atom/GameLevelAtom";
import { ScoreAtom } from "../atom/persistant/ScoreAtom";
import { storeAtom } from "../atom/storeAtom";

export const calculateScore = () => {
    const gameLevel = storeAtom.get(GameLevelAtom);
    const enemies = Object.values(storeAtom.get(EnemyAtom));

    const score = enemies.length + gameLevel.level + gameLevel.round;

    storeAtom.set(ScoreAtom, score);
    return score;
};
