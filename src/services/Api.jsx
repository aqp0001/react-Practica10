import { useState, useEffect } from "react";

const API_KEY = "7533378071154d42917b6b92485bcede";
const BASE_URL = "https://api.rawg.io/api";

const useGameDetails = (gameId) => {
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener el juego`);

        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError("Hubo un error al cargar el juego. Intenta nuevamente.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  return { game, error, loading };
};

export { useGameDetails };
