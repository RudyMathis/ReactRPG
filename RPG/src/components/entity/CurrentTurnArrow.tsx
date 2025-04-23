import styles from './Entity.module.css';

const CurrentTurnArrow = () => {
    return (
        <div className={styles.currentTurnArrow}>
            <img src="/assets/Arrow.png" />
        </div>
    );
};

export default CurrentTurnArrow;