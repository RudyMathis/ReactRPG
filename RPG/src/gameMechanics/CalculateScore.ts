import EnemyAtom from "../atom/BaseEnemyAtom";
import { GameLevelAtom } from "../atom/GameLevelAtom";
import { ScoreAtom } from "../atom/persistant/ScoreAtom";
import { UserAtom } from "../atom/persistant/UserAtom";
import { storeAtom } from "../atom/storeAtom";

export const calculateScore = () => {
    const updatedScore = storeAtom.get(ScoreAtom);
    const userName = storeAtom.get(UserAtom);
    const date = new Date();

    const enemies = Object.values(storeAtom.get(EnemyAtom));
    const gameLevel = storeAtom.get(GameLevelAtom);

    const score = enemies.length + (gameLevel.level + gameLevel.round);

    updatedScore.push([userName, score, date.toLocaleDateString()]);

    return score;
};