import styles from './Loader.module.css'; // Adjust the path as necessary

export default function Loader() {
    return (
        <div className={styles.load}>
            <div className={styles.loader}>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
                <div className={styles.l}></div>
            </div>
        </div>
    );
}