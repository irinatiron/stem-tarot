import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Line from "../components/Line";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="mainContainer">
            <Line />
            <div className={styles.logoContainer}>
                <h1 className={styles.title}>Goddess Tarot</h1>
                <p className={styles.intro}>
                    Conecta con el pasado, presente y futuro de la ciencia a través de las cartas del tarot y sus Diosas contemporáneas.
                </p>

                <button className={styles.button} onClick={() => navigate("/cartas")}>
                    Comenzar
                    <div className={styles.button__horizontal}></div>
                    <div className={styles.button__vertical}></div>
                </button>

                <div className={styles.starburstContainer}>
                    <div className={styles.starburst}></div>
                    <div className={styles.starburst2}></div>
                    <div className={styles.starburst3}></div>
                    <div className={styles.starburst2}></div>
                    <div className={styles.starburst}></div>
                    <div className={styles.starburst2}></div>
                    <div className={styles.starburst3}></div>
                    <div className={styles.starburst2}></div>
                    <div className={styles.starburst}></div>
                </div>
            </div>
        </div>
    );
}
