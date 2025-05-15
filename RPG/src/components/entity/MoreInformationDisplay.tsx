import { useAtomValue } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';
import styles from './Entity.module.css';

type CharacterDetailProps = {
    spellInfo: string;
}

const MoreInformationBtn = ({ spellInfo }: CharacterDetailProps) => {
    const tutorial = useAtomValue(tutorialAtom);
    const isClick = {...(tutorial?.isClick && { 'data-tutorial': tutorial?.isClick })}
    const isDisabled ={...(tutorial?.isDisabled && { 'data-tutorial-disabled': tutorial?.isDisabled })} 
    return (
        <div 
            className={styles.moreInformationWrapper} 
            {...isClick}
            {...isDisabled}
        >
            <span className={styles.moreInformationIcon}>&#128712;</span>
            <div className={styles.moreInformationText}>
                <p>{spellInfo}</p>
            </div>
        </div>
    );
}

export default MoreInformationBtn;