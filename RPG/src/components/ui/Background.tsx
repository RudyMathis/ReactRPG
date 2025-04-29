import styles from './UI.module.css';
const Background = () => {  
    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.crt}></div>
            <div className={styles.glow}></div>
            <img className={styles.backgroundBorder} src="/assets/backgrounds/crt_frame.png" />
        </>
    )
}

export default Background