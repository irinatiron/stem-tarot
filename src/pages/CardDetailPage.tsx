import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./CardDetailPage.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StyledButtonComponent from "../components/StyledButton";


export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<TarotCard | null>(null);
  const [showGoddess, setShowGoddess] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard).catch(console.error);
    }
  }, [id]);

  if (!card) return <p className={styles.loadingText}>Cargando...</p>;

  // Abrir modal
  const openModal = (imageSrc: string, title: string) => {
    setModalImage(imageSrc);
    setModalTitle(title);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalImage(null);
    setModalTitle("");
  };

  return (
    <>
      <h1 className="pageTitle">
        Detalle de la carta:{" "}
        <span className={styles.arcaneNameTitle}>{card.arcaneName}</span>
      </h1>

      <div className={`${styles.cardDetailContainer} mainContainer`}>
        {!showGoddess ? (
          <div className={styles.cardFullWidth}>
            <img
              className={`${styles.arcaneImage} ${styles.clickableImage}`}
              src={card.arcaneImage.imageSrc}
              alt={card.arcaneName}
              onClick={() => openModal(card.arcaneImage.imageSrc, card.arcaneName)}
            />
            <div className={styles.arcaneDescriptionContainer}>
              <h2 className={styles.arcaneName}>{card.arcaneName}</h2>
              <p className={styles.arcaneDescription}>{card.arcaneDescription}</p>
            </div>
            <button
              className={styles.nextButton}
              onClick={() => setShowGoddess(true)}
            >
              Ver diosa <MdKeyboardArrowRight size={50} />
            </button>
          </div>
        ) : (
          <div className={styles.cardFullWidth}>
            <button
              className={styles.previousButton}
              onClick={() => setShowGoddess(false)}
            >
              <MdKeyboardArrowLeft size={50} /> Ver arcano
            </button>

            <div className={styles.goddessDescriptionContainer}>
              <h2 className={styles.goddessName}>
                Diosa asociada: {card.goddessName}
              </h2>
              <p className={styles.goddessDescription}>
                {card.goddessDescription}
              </p>
            </div>
            <img
              className={`${styles.goddessImage} ${styles.clickableImage}`}
              src={card.goddessImage.imageSrc}
              alt={card.goddessName}
              onClick={() => openModal(card.goddessImage.imageSrc, card.goddessName)}
            />
          </div>
        )}

        <div className={styles.returnContainer}>
          <StyledButtonComponent onClick={() => navigate("/cartas")}>
        Regresar a las cartas
      </StyledButtonComponent>
        </div>
      </div>

      {/* Modal para mostrar imágenes expandidas */}
      {modalImage && (
        <div className={styles.imageModal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              <svg viewBox="0 0 24 24" className={styles.closeIcon}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <img
              src={modalImage}
              alt={modalTitle}
              className={styles.modalImage}
            />
            <div className={styles.modalTitle}>{modalTitle}</div>
          </div>
        </div>
      )}
    </>
  );
}
