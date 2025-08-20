import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Goddess Tarot · Proyecto realizado en colaboración con <strong>Factoría F5</strong>
      </p>
    </footer>
  );
}
