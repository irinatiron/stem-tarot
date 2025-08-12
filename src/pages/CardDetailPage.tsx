import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/tarotService";
import { TarotCard } from "../types/tarot";

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<TarotCard | null>(null);

  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard).catch(console.error);
    }
  }, [id]);

  if (!card) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{card.arcaneName}</h2>
      <img src={card.arcaneImage.imageSrc} alt={card.arcaneName} width="200" />
      <p>{card.arcaneDescription}</p>

      <h2>Diosa: {card.goddessName}</h2>
      <img src={card.goddessImage.imageSrc} alt={card.goddessName} width="200" />
      <p>{card.goddessDescription}</p>
    </div>
  );
}
