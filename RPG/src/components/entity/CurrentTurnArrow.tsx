import { useAtomValue } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';
import styles from './Entity.module.css';
import { CharacterType } from '../../atom/CharacterAtom';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CurrentTurnArrow = ({ character }: CharacterDisplayProps) => {
    const tutorial = useAtomValue(tutorialAtom);

    return (
        <div className={styles.currentTurnArrow} {...(tutorial.isTutorial && tutorial.tutorialEntity === character.type ? { 'data-tutorial-layer': 'entity' } : {})}>
            <img src="/assets/Arrow.png" />
        </div>
    );
};

export default CurrentTurnArrow;