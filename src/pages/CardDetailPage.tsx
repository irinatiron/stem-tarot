import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/tarotService";
import type { TarotCard } from "../types/tarot";
import styles from "./CardDetailPage.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StyledButtonComponent from "../components/StyledButton";
import Galaxy from "../components/GalaxyBackground";
import { IoIosCloseCircle } from "react-icons/io";

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Hooks al inicio
  const [card, setCard] = useState<TarotCard | null>(null);
  const [showGoddess, setShowGoddess] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalCredit, setModalCredit] = useState<{ author: string; licenseUrl: string } | null>(null);
  const navigate = useNavigate();

  // Fetch de la carta 
  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard).catch(console.error);
    }
  }, [id]);

  if (!card) return <p className={styles.loadingText}>Cargando...</p>;

  // Abrir modal
  const openModal = (imageSrc: string, title: string, author: string, licenseUrl: string) => {
    setModalImage(imageSrc);
    setModalTitle(title);
    setModalCredit({ author, licenseUrl });
  };

  // Cerrar modal
  const closeModal = () => {
    setModalImage(null);
    setModalTitle("");
    setModalCredit(null);
  };

  return (
    <>
      <Galaxy />
      <h1 className="pageTitle">
        Detalle de la carta: <span className={styles.arcaneNameTitle}>{card.arcaneName}</span>
      </h1>

      <div className={`${styles.cardDetailContainer} mainContainer`}>
        {!showGoddess ? (
          <div className={styles.cardFullWidth}>
            <div className={styles.imageWrapper}>
              <img
                className={`${styles.arcaneImage} ${styles.clickableImage}`}
                src={card.arcaneImage.imageSrc}
                alt={card.arcaneName}
                onClick={() =>
                  openModal(
                    card.arcaneImage.imageSrc,
                    card.arcaneName,
                    card.arcaneImage.author,
                    card.arcaneImage.license
                  )
                }
              />
              <div className={styles.creditBadge}>
                ©
                <div className={styles.creditInfo}>
                  Autor: {card.arcaneImage.author} <br />
                  <a href={card.arcaneImage.imageSrc} target="_blank" rel="noreferrer">
                    {card.arcaneImage.license}
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.arcaneDescriptionContainer}>
              <h2 className={styles.arcaneName}>{card.arcaneName}</h2>
              <p className={styles.arcaneDescription}>{card.arcaneDescription}</p>
            </div>
            <button className={styles.nextButton} onClick={() => setShowGoddess(true)}>
              Ver diosa <MdKeyboardArrowRight size={50} />
            </button>
          </div>
        ) : (
          <div className={styles.cardFullWidth}>
            <button className={styles.previousButton} onClick={() => setShowGoddess(false)}>
              <MdKeyboardArrowLeft size={50} /> Ver arcano
            </button>
            <div className={styles.goddessDescriptionContainer}>
              <h2 className={styles.goddessName}>Diosa asociada: {card.goddessName}</h2>
              <p className={styles.goddessDescription}>{card.goddessDescription}</p>
            </div>
            <div className={styles.imageWrapper}>
              <img
                className={`${styles.goddessImage} ${styles.clickableImage}`}
                src={card.goddessImage.imageSrc}
                alt={card.goddessName}
                onClick={() =>
                  openModal(
                    card.goddessImage.imageSrc,
                    card.goddessName,
                    card.goddessImage.author,
                    card.goddessImage.licenseUrl
                  )
                }
              />
              <div className={styles.creditBadge}>
                ©
                <div className={styles.creditInfo}>
                  Autor: {card.goddessImage.author} <br />
                  <a href={card.goddessImage.licenseUrl} target="_blank" rel="noreferrer">
                    Licencia
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.returnContainer}>
          <StyledButtonComponent onClick={() => navigate("/cartas")}>
            Regresar a las cartas
          </StyledButtonComponent>
        </div>
      </div>

      {/* Modal para mostrar imágenes expandidas */}
      {modalImage && modalCredit && (
        <div className={styles.imageModal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <IoIosCloseCircle />
            </button>

            <div className={styles.imageWrapper}>
              <img src={modalImage} alt={modalTitle} className={styles.modalImage} />
              <div className={styles.creditBadge}>
                ©
                <div className={styles.creditInfo}>
                  Autor: {modalCredit.author} <br />
                  <a href={modalCredit.licenseUrl} target="_blank" rel="noreferrer">
                    Licencia
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.modalTitle}>{modalTitle}</div>
          </div>
        </div>
      )}
    </>
  );
}
