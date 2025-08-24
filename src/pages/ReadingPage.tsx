import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./ReadingPage.module.css";
import StyledButtonComponent from "../components/StyledButton";
import { IoCheckmark } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import Galaxy from "../components/GalaxyBackground";

export default function ReadingPage() {
    const [cards, setCards] = useState<TarotCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; position: number }[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState("");

    const positions = ["Pasado", "Presente", "Futuro"];

    useEffect(() => {
        getAllCards()
            .then(fetchedCards => {
                const shuffled = [...fetchedCards];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setCards(shuffled);
            })
            .catch(console.error);
    }, []);

    const handleSelectCard = (card: TarotCard) => {
        if (selectedCards.length >= 3) return;
        if (selectedCards.find(c => c.card.id === card.id)) return;

        const position = selectedCards.length;
        setSelectedCards(prev => [...prev, { card, position }]);
    };

    const handleReset = () => {
        setSelectedCards([]);
        setShowModal(false);
        setCurrentIndex(0);
        setCards(prev => {
            const shuffled = [...prev];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    };

    const handleReading = () => {
        setShowModal(true);
        setCurrentIndex(0);
    };

    const getBorderClass = (cardId: number) => {
        const selected = selectedCards.find(c => c.card.id === cardId);
        if (!selected) return "";
        if (selected.position === 0) return styles.borderPast;
        if (selected.position === 1) return styles.borderPresent;
        if (selected.position === 2) return styles.borderFuture;
        return "";
    };

    const getTitleClass = (index: number) => {
        const selected = selectedCards[index];
        if (!selected) return "";
        if (selected.position === 0) return styles.titlePast;
        if (selected.position === 1) return styles.titlePresent;
        if (selected.position === 2) return styles.titleFuture;
        return "";
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % 3); // circular hacia adelante
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + 3) % 3); // circular hacia atrás
    };

    const currentCard = selectedCards[currentIndex];
    const prevIndex = (currentIndex - 1 + 3) % 3;
    const nextIndex = (currentIndex + 1) % 3;


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
        <div className="mainContainer">
            <Galaxy />
            <h1 className="pageTitle">Lectura de Tarot</h1>
            <p className="pageIntro">Elige 3 cartas de los Arcanos Mayores (22 cartas en total) para realizar la lectura.</p>

            {/* Posiciones */}
            <div className={styles.positionsContainer}>
                {positions.map((pos, index) => (
                    <div key={pos} className={styles.position}>
                        <h2 className={getTitleClass(index)}>{pos}</h2>
                        {selectedCards[index] ? (
                            <p>Carta seleccionada <IoCheckmark /></p>
                        ) : (
                            <p>Selecciona una carta</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Botones al comienzo */}
            <div className={styles.buttonsContainer}>
                {selectedCards.length > 0 && (
                    <StyledButtonComponent onClick={handleReset}>
                        Reiniciar
                    </StyledButtonComponent>
                )}
                {selectedCards.length === 3 && (
                    <StyledButtonComponent onClick={handleReading}>
                        Realizar lectura
                    </StyledButtonComponent>
                )}
            </div>

            {/* Cartas disponibles */}
            <div className={styles.cardsContainer}>
                {cards.map(card => (
                    <img
                        key={card.id}
                        src="/images/card-back.png"
                        alt="Carta boca abajo"
                        className={`${styles.cardBack} ${getBorderClass(card.id)}`}
                        onClick={() => handleSelectCard(card)}
                    />
                ))}
            </div>

            {/* Botones al final */}
            <div className={styles.buttonsContainer}>
                {selectedCards.length > 0 && (
                    <StyledButtonComponent onClick={handleReset}>
                        Reiniciar
                    </StyledButtonComponent>
                )}
                {selectedCards.length === 3 && (
                    <StyledButtonComponent onClick={handleReading}>
                        Realizar lectura
                    </StyledButtonComponent>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2 className={styles.modalTitle}><span className={styles.starburst2}></span>Tu lectura de Tarot<span className={styles.starburst2}></span></h2>
                        {currentCard && (
                            <div className={styles.readingCard}>
                                <h2 className={getTitleClass(currentIndex)}>
                                    {positions[currentIndex]}</h2>
                                <div className={styles.readingCardDivider}>
                                    <div className={styles.cardSection}>
                                        <h2 className={getTitleClass(currentIndex)}>{currentCard.card.arcaneName}</h2>

                                        <p className={styles.arcaneDescription}>
                                            <img
                                                src={currentCard.card.arcaneImage.imageSrc}
                                                alt={currentCard.card.arcaneName}
                                                className={`${styles.arcaneImage} ${styles.clickableImage}`}
                                                onClick={() => openModal(currentCard.card.arcaneImage.imageSrc, currentCard.card.arcaneName)}
                                            />
                                            {currentCard.card.arcaneDescription}</p>

                                    </div><div className={styles.cardSection}>
                                        <h2 className={getTitleClass(currentIndex)}>Diosa asociada: {currentCard.card.goddessName}</h2>

                                        <p className={styles.goddessDescription}>
                                            <img
                                                src={currentCard.card.goddessImage.imageSrc}
                                                alt={currentCard.card.goddessName}
                                                className={`${styles.goddessImage} ${styles.clickableImage}`}
                                                onClick={() => openModal(currentCard.card.goddessImage.imageSrc, currentCard.card.goddessName)}
                                            />
                                            {currentCard.card.goddessDescription}</p>

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Controles del carrusel */}
                        <div className={styles.carouselControls}>
                            <button onClick={prevSlide} className={styles.carouselButton}>
                                <MdKeyboardArrowLeft size={50} /> {positions[prevIndex]}
                            </button>
                            <button onClick={nextSlide} className={styles.carouselButton}>
                                {positions[nextIndex]} <MdKeyboardArrowRight size={50} />
                            </button>
                        </div>

                        <div className={styles.returnContainer}>
                            <StyledButtonComponent onClick={handleReset} variant="secondary">
                                Realizar otra lectura
                            </StyledButtonComponent>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para mostrar imágenes expandidas */}
            {modalImage && (
                <div className={styles.imageModal} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.modalClose} onClick={closeModal}><IoIosCloseCircle /></button>
                        <img
                            src={modalImage}
                            alt={modalTitle}
                            className={styles.modalImage}
                        />
                        <div className={styles.modalTitle}>{modalTitle}</div>
                    </div>
                </div>
            )}

        </div>


    );
}
