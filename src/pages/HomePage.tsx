import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";


export default function HomePage() {
    const [cards, setCards] = useState<TarotCard[]>([]);

    useEffect(() => {
        getAllCards().then(setCards).catch(console.error);
    }, []);

    return (
        <div className="mainContainer">
            <h1 className="pageTitle">Cartas del Tarot</h1>
            <p className="pageIntro">Haz clic en una carta para ver su significado.</p>
            <div className={styles["cardsContainer"]}>
                {cards.map(card => (
                    <Link to={`/card/${card.id}`} key={card.id}>
                        <img
                            src="/images/card-back.png"
                            alt="Carta boca abajo"
                            className={styles.cardBack}
                        />

                    </Link>
                ))}
            </div>
        </div>
    );
}
