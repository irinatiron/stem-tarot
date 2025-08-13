import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./CardDetailPage.module.css"; 

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<TarotCard | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard).catch(console.error);
    }
  }, [id]);

  if (!card) return <p>Cargando...</p>;

  return (
    <div className={`${styles.cardDetailContainer} mainContainer`}>
      <div className={styles.cardContent}>
        <div className={styles.cardImageContainer}>
          <h2>{card.arcaneName}</h2>
          <img src={card.arcaneImage.imageSrc} alt={card.arcaneName} width="200" />
          <p>{card.arcaneDescription}</p>
        </div>

        <div className={styles.cardGoddessContainer}>
          <h2>Diosa: {card.goddessName}</h2>
          <img src={card.goddessImage.imageSrc} alt={card.goddessName} width="200" />
          <p>{card.goddessDescription}</p>
        </div>
      </div>
      <div className={styles.returnContainer}>
        <button className={styles.button} onClick={() => navigate("/cartas")}>Regresar a las cartas</button>
      </div>
    </div>
  );
}
