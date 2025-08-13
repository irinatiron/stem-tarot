import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css"; 

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="mainContainer">
            <div className={styles.logoContainer}>
                <h1 className={styles.title}>TAROT STEM</h1>
                <button className={styles.button} onClick={() => navigate("/cartas")}>Comenzar</button>
            </div>
        </div>
    );
}
