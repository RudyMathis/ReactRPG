import { useNavigate } from "react-router";
import Btn from "../Btn";
import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
export const ContinueGameBtn = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    
    const navigate = useNavigate();
    const handleStart = () => {
        currentGameLevel.isRoundOver = false
        navigate('/game');
    };
    
    return <Btn onClick={handleStart} text="Continue Game" className="ContinueGameBtn" />
};