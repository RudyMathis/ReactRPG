
import styles from './UI.module.css';

const GameReference = () => {
    return (
        <section className={styles.gameReference}>
            <h1>Game Reference</h1>
            <article>
                <h2>Elements</h2>
                <ul>
                    <li><span>Fire</span> <span>Causes Burn debuff</span></li>
                    <li><span>Ice</span> <span>Causes Frozen debuff</span></li>
                    <li><span>Lightning</span> <span>Depletes 50% of targets mana</span></li>
                    <li><span>Dark</span> <span>Removes buffs and resistances from target</span></li>
                    <li><span>Holy</span> <span>Causes Weaken debuff</span></li>
                    <li><span>Physical/Normal</span> <span>Uneffected by resistances, but affected by defense</span></li>
                </ul>
            </article>
            <article>
                <h2>Vulnerabilities</h2>
                <h3>Element attacks are specifically weak to their own element so attacking an enemy with Fire will be weak to Fire</h3>
                <ul>
                    <li><span>Fire</span> <span>Strong against Ice</span></li>
                    <li><span>Ice</span> <span>Strong against Fire</span></li>
                    <li><span>Lightning</span> <span>Strong against Water</span></li>
                    <li><span>Dark</span> <span>Strong against Holy</span></li>
                    <li><span>Holy</span> <span>Strong against Dark</span></li>
                </ul>
            </article>
            <article>
                <h2>Types of Resources</h2>
                <h3>Under the health bar are different colored bars</h3>
                <ul>
                    <li><span>Magic</span> <span>Colored blue this resource can be regenerated between rounds or specific abilities like meditate</span></li>
                    <li><span>Energy</span> <span>Colored yellow similar to magic but spells cost more and can only be regenerated between rounds</span></li>
                    <li><span>Rage</span> <span>Colred red this resource needs spells to increase it before using spells that consume it</span></li>
                </ul>
            </article>
            <article>
                <h2>Experince and Leveling</h2>
                <p>After every round you gain experience points which you can use to level up. Leveling up increases your base stats, this is imporant as every after 3 rounds you will move on to a new level and the enemies will get tougher</p>
            </article>
            <article>
                <h2>Blessings</h2>
                <p>Blessings can be obtained at the end of each round. Blessings have various permenant effects including increased attack, giving abilities effects like Burn or even adding resistances</p>
            </article>
            <article>
                <h2>Enemies</h2>
                <p>There are a variety of enemies in this game all with different attack patterns and stats. All enemies can be each type of element which means they are weak to one element and strong to another. There are also special enemies with unique abilities.</p>
            </article>
        </section>
    );
}

export default GameReference