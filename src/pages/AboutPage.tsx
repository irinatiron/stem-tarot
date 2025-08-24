import styles from "./AboutPage.module.css";
import Galaxy from "../components/GalaxyBackground";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className={`mainContainer ${styles.about}`}>
            <Galaxy />
            <h1 className="pageTitle">Sobre el proyecto</h1>

            <div className={styles.gridContainer}>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>El proyecto</h2>
                    <p>
                        <span className={styles.important}>Goddess Tarot</span> es una aplicación web desarrollada en React
                        que une la tradición del tarot con la inspiración de las <span className={styles.important}>diosas contemporáneas</span>:
                        mujeres que han marcado la historia de la ciencia y la tecnología (STEM).
                        Este proyecto nace como una práctica didáctica para consumir APIs en React y
                        fue realizado en colaboración con el equipo formativo de Factoría F5 Barcelona, quienes han creado la API de cartas de tarot.
                        <br />
                        Agradecimiento especial <a href="https://github.com/MAlexGG" target="_blank" className={styles.apiLink}>@MAlexGG</a> por la creación de la API.
                    </p>
                    <a href="https://github.com/irinatiron/stem-tarot/" target="_blank" rel="noreferrer" className={styles.iconLink}>
                        <h3><FaGithub /> Repositorio en GitHub</h3>
                    </a>
                    <a href="https://www.linkedin.com/in/irinatiron/" target="_blank" rel="noreferrer" className={styles.iconLink}>
                        <h3><FaLinkedin /> Realizado por Irina Tiron</h3>
                    </a>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Objetivo general</h2>
                    <p>
                        Desarrollar una aplicación web en React que permita:
                    </p>
                    <ul className={styles.aboutList}>
                        <li>Visualizar todas las cartas de tarot boca abajo en una página principal.</li>
                        <li>Descubrir la información detallada de cada carta y su diosa asociada.</li>
                        <li>Realizar una lectura de tres cartas asignadas a Pasado, Presente y Futuro.</li>
                        <li>Ofrecer una experiencia interactiva y educativa sobre tarot y mujeres STEM.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Niveles de desarrollo</h2>
                    <h3>Nivel 1: Visualización básica</h3>
                    <ul className={styles.aboutList}>
                        <li>GET de todas las cartas y renderizado en pantalla.</li>
                        <li>Navegación a una página de detalle con petición GET por ID.</li>
                        <li>Uso de hooks: <code>useEffect</code>, <code>useState</code>, <code>useParams</code>.</li>
                    </ul>
                    <h3>Nivel 2: Lectura de cartas</h3>
                    <ul className={styles.aboutList}>
                        <li>Selección de tres cartas máximo: Pasado, Presente y Futuro.</li>
                        <li>Visualización del significado y la diosa asociada según la posición.</li>
                        <li>Opción para reiniciar la lectura y comenzar de nuevo.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>API del proyecto</h2>
                    <p>
                        El proyecto consume la API pública creada por Factoría F5 Barcelona:   
                        <a href="https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot" target="_blank" rel="noreferrer" className={styles.apiLink}> disponible aquí.
                        </a>
                    </p>
                    <p>
                        Cada carta tiene información sobre el arcano, su descripción, la diosa contemporánea asociada
                        y sus respectivas imágenes con créditos de autoría y licencia.
                    </p>
                </section>
            </div>
        </div>
    );
}
