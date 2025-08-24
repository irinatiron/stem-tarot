import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import type { TarotCard } from "../types/tarot";
import { Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import styles from "./HomePage.module.css";
import Galaxy from "../components/GalaxyBackground";
import ScrollToTopButton from "../components/ScrollToTopButton";  

export default function HomePage() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [cardTransforms, setCardTransforms] = useState<{ rotate: number; x: number; y: number }[]>([]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    getAllCards()
      .then((cards) => {
        const shuffled = shuffleArray(cards); 
        setCards(shuffled);
        const transforms = shuffled.map(() => ({
          rotate: Math.floor(Math.random() * 31 - 15),
          x: Math.floor(Math.random() * 12 - 6),
          y: Math.floor(Math.random() * 12 - 6),
        }));
        setCardTransforms(transforms);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="mainContainer">
      <Galaxy />
      <ScrollToTopButton />
      <h1 className="pageTitle">Cartas del Tarot</h1>
      <p className="pageIntro">
        Explora las 22 cartas de los Arcanos Mayores del Tarot. Cada una encierra símbolos y arquetipos que revelan aspectos esenciales de la experiencia humana. Haz clic en una carta para descubrir su interpretación y la diosa contemporánea asociada.
      </p>

      <div className={styles.cardsContainer}>
        {cards.map((card, index) => {
          const transform = cardTransforms[index];
          return (
            <motion.div
              key={index} 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: easeOut,
                delay: index * 0.1, 
              }}
              style={{
                display: "inline-block",
                rotate: transform?.rotate || 0,
                x: transform?.x || 0,
                y: transform?.y || 0,
              }}
            >
              <Link to={`/carta/${card.id}`}>
                <img
                  src="/images/card-back.png"
                  alt="Carta boca abajo"
                  className={styles.cardBack}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
