import styles from '../Entity.module.css';

type CharacterDetailProps = {
    spellInfo: string;
}

const MoreInformationDisplay = ({ spellInfo }: CharacterDetailProps) => {
    return (
        <div className={styles.moreInformationWrapper}>
            <span className={styles.moreInformationIcon}>&#128712;</span>
            <div className={styles.moreInformationText}>
                <p>{spellInfo}</p>
            </div>
        </div>
    );
}

export default MoreInformationDisplay;