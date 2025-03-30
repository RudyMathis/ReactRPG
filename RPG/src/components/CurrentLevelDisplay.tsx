import { useAtom } from "jotai";
import { GameLevelAtom } from "../atom/GameLevelAtom";

const CurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom); // Use `useAtom` for reactivity

    return (
        <h1>Current {currentGameLevel.level} - {currentGameLevel.round}</h1>
    );
}

export default CurrentLevelDisplay;
