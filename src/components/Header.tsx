import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <span className={styles.starburst2}></span>
                Goddess Tarot
                <span className={styles.starburst2}></span>
            </h1>
        </header>
    );
}
