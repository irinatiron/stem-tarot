import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./CardDetailPage.module.css"; 
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<TarotCard | null>(null);
  const [showGoddess, setShowGoddess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard).catch(console.error);
    }
  }, [id]);

  if (!card) return <p className={styles.loadingText}>Cargando...</p>;

  return (
    <>
      <h1 className="pageTitle">
        Detalle de la carta: <span className={styles.arcaneNameTitle}>{card.arcaneName}</span>
      </h1>

      <div className={`${styles.cardDetailContainer} mainContainer`}>
        {/* Contenedor principal con ancho completo */}
        {!showGoddess ? (
          <div className={styles.cardFullWidth}>
            <h2 className={styles.arcaneName}>{card.arcaneName}</h2>
            <img 
              className={styles.arcaneImage} 
              src={card.arcaneImage.imageSrc} 
              alt={card.arcaneName} 
              width="300" 
            />
            <p className={styles.arcaneDescription}>{card.arcaneDescription}</p>
            <button 
              className={styles.nextButton} 
              onClick={() => setShowGoddess(true)}
            >
              <MdKeyboardArrowRight />

            </button>
          </div>
        ) : (
          <div className={styles.cardFullWidth}>
            
            <h2 className={styles.goddessName}>Diosa: {card.goddessName}</h2>
            <img 
              className={styles.goddessImage} 
              src={card.goddessImage.imageSrc} 
              alt={card.goddessName} 
              width="300" 
            />
            <p className={styles.goddessDescription}>{card.goddessDescription}</p>
            <button 
              className={styles.previousButton} 
              onClick={() => setShowGoddess(false)}
            >
              <MdKeyboardArrowLeft />

            </button>
          </div>
        )}

        <div className={styles.returnContainer}>
          <button 
            className={styles.buttonBack} 
            onClick={() => navigate("/cartas")}
          >
            Regresar a las cartas
          </button>
        </div>
      </div>
    </>
  );
}
