import styles from './Entity.module.css';

type CharacterDetailProps = {
    spellName: string;
    spellCost: number;
    spellElement: string;
    spellDamage: number;
}

const MoreInformationBtn = ({ spellName, spellCost, spellElement, spellDamage }: CharacterDetailProps) => {
    const costLabel = spellCost < 0 ? 'Adds' : 'Cost';
    const displayCost = Math.abs(spellCost);

    return (
        <div className={styles.moreInformationWrapper}>
            <span className={styles.moreInformationIcon}>&#128712;</span>
            <div className={styles.moreInformationText}>
                <p>Spell: {spellName}</p>
                <p>{costLabel}: {displayCost}</p>
                <p>Element: {spellElement}</p>
                <p>Damage: {spellDamage}</p>
            </div>
        </div>
    );
}


export default MoreInformationBtn;