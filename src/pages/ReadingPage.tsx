import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import { TarotCard } from "../types/tarot";
import styles from "./ReadingPage.module.css";

export default function ReadingPage() {
    const [cards, setCards] = useState<TarotCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; position: number }[]>([]);
    const [showModal, setShowModal] = useState(false);

    const positions = ["Pasado", "Presente", "Futuro"];

    useEffect(() => {
        getAllCards().then(setCards).catch(console.error);
    }, []);

    const handleSelectCard = (card: TarotCard) => {
        if (selectedCards.length >= 3) return;
        if (selectedCards.find(c => c.card.id === card.id)) return;

        const position = selectedCards.length; // 0=Pasado, 1=Presente, 2=Futuro
        setSelectedCards(prev => [...prev, { card, position }]);
    };

    const handleReset = () => {
        setSelectedCards([]);
        setShowModal(false);
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

    return (
        <div className="mainContainer">
            <h1 className="pageTitle">Lectura de Tarot</h1>

            {/* Posiciones Pasado - Presente - Futuro */}
            <div className={styles.positionsContainer}>
                {positions.map((pos, index) => (
                    <div key={pos} className={styles.position}>
                        <h2>{pos}</h2>
                        {selectedCards[index] ? (
                            <p>Carta seleccionada</p>
                        ) : (
                            <p>Selecciona una carta</p>
                        )}
                    </div>
                ))}
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
                    <button className={styles.resetButton} onClick={handleReset}>
                        Reiniciar lectura
                    </button>
                )}
                {selectedCards.length === 3 && (
                    <button className={styles.readButton} onClick={handleReading}>
                        Realizar lectura
                    </button>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Tu lectura de Tarot</h2>
                        {positions.map((pos, index) => (
                            <div key={pos} className={styles.readingCard}>
                                <h3>{pos}: {selectedCards[index].card.arcaneName}</h3>
                                <img
                                    src={selectedCards[index].card.arcaneImage.imageSrc}
                                    alt={selectedCards[index].card.arcaneName}
                                />
                                <p>{selectedCards[index].card.arcaneDescription}</p>
                                <h4>Diosa: {selectedCards[index].card.goddessName}</h4>
                                <p>{selectedCards[index].card.goddessDescription}</p>
                            </div>
                        ))}
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
