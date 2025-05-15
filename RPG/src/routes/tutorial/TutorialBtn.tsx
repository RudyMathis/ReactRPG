import Btn from "../../components/ui/Btn";
import { useHandleTutorialStart } from "./useHandleTutorialStart";

export const TutorialBtn = () => {
    const handleTutorialStart = useHandleTutorialStart();
    return <Btn onClick={handleTutorialStart} text="Tutorial" />;
};