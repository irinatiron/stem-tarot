import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Goddess Tarot · Proyecto realizado por <a href="https://github.com/irinatiron" target="_blank">Irina Tiron</a> en <a href="https://factoriaf5.org/" target="_blank">Factoría F5</a>
      </p>
    </footer>
  );
}
