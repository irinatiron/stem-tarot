import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./ReadingPage.module.css";
import StyledButtonComponent from "../components/StyledButton";
import { IoCheckmark } from "react-icons/io5";
import Galaxy from "../components/GalaxyBackground";

export default function ReadingPage() {
    const [cards, setCards] = useState<TarotCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; position: number }[]>([]);
    const [showModal, setShowModal] = useState(false);
    const positions = ["Pasado", "Presente", "Futuro"];
    useEffect(() => {
        getAllCards()
            .then(fetchedCards => {
                // Barajar 
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
        // Reordenar las cartas al reiniciar
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
                        {selectedCards[index] ? <p>Carta seleccionada <IoCheckmark />
</p> : <p>Selecciona una carta</p>}
                    </div>
                ))}
            </div>
            {/* Botones */}
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
            {/* Botones */}
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
                        <h2 className={styles.modalTitle}>Tu lectura de Tarot</h2>
                        {positions.map((pos, index) => (
                            <div key={pos} className={styles.readingCard}>
                                <h2 className={getTitleClass(index)}>
                                    {pos}: {selectedCards[index].card.arcaneName}
                                </h2>
                                <img
                                    src={selectedCards[index].card.arcaneImage.imageSrc}
                                    alt={selectedCards[index].card.arcaneName}
                                />
                                <p className={styles.arcaneDescription}>{selectedCards[index].card.arcaneDescription}</p>
                                <h2 className={getTitleClass(index)}>
                                    Diosa asociada: {selectedCards[index].card.goddessName}
                                </h2>
                                <p className={styles.goddessDescription}>{selectedCards[index].card.goddessDescription}</p>
                            </div>
                        ))}
                        <div className={styles.returnContainer}>
                            <StyledButtonComponent onClick={handleReset} variant="secondary">
                                Realizar otra lectura
                            </StyledButtonComponent>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
