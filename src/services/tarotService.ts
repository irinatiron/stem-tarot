import { TarotCard } from "../types/tarot";

const API_URL = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot";

// Método GET para el READ
export const getAllCards = async (): Promise<TarotCard[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error fetching cards");
  return response.json();
};

export const getCardById = async (id: string): Promise<TarotCard> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error fetching card detail");
  return response.json();
};
