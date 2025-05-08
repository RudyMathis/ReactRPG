import { HighScoreAtom } from "../atom/persistant/HighScoreAtom";
import { ScoreAtom } from "../atom/persistant/ScoreAtom";
import { UserAtom } from "../atom/persistant/UserAtom";
import { storeAtom } from "../atom/storeAtom";

export const SubmitHighScore = () => {
    const highScores = storeAtom.get(HighScoreAtom);
    const userName = storeAtom.get(UserAtom);
    const score = storeAtom.get(ScoreAtom);
    const date = new Date().toLocaleDateString();

    const newEntry: [string, number, string] = [userName, score, date];
    const updatedScores = [...highScores, newEntry].sort((a, b) => b[1] - a[1]).slice(0, 10);
    localStorage.setItem('HighScores', JSON.stringify(updatedScores));
    storeAtom.set(HighScoreAtom, updatedScores);
};