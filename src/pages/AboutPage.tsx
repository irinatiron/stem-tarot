import styles from "./AboutPage.module.css";

export default function AboutPage() {
    return (
        <div className={`mainContainer ${styles.about}`}>
            <h1 className="pageTitle">Sobre el proyecto</h1>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>El proyecto</h2>
                <p>
                    Goddess Tarot es una aplicación web que fusiona la tradición del tarot con
                    la inspiración de las diosas contemporáneas: mujeres que han marcado la historia
                    de la ciencia y la tecnología (STEM). A través de las cartas, podrás descubrir sus logros
                    y cómo influyen en nuestro presente y futuro.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Objetivos</h2>
                <ul className={styles.aboutList}>
                    <li>Conocer a las diosas contemporáneas de la ciencia y tecnología.</li>
                    <li>Realizar lecturas de tarot de 3 cartas (Pasado, Presente, Futuro).</li>
                    <li>Visualizar información detallada de cada carta y diosa asociada.</li>
                    <li>Explorar el simbolismo de cada carta y su influencia.</li>
                    <li>Aprender sobre la historia y los arcanos del tarot.</li>
                </ul>

            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Colaboración</h2>
                <p>
                    Este proyecto se desarrolla en el marco del bootcamp de Factoría F5 (Madrid),
                    con la colaboración del equipo formativo de Factoría F5 Barcelona,
                    quienes han creado la API de cartas de tarot.
                    Agradecimiento especial a @MAlexGG.
                </p>
            </section>
        </div>
    );
}
