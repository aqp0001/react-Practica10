import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaginaInfo = ({ games }) => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Buscar el juego en la lista de juegos que recibimos
    const foundGame = games.find((g) => g.id.toString() === id);

    if (foundGame) {
      setGame(foundGame);
    } else {
      // Si no se encuentra en la lista, intentar buscar en la API
      const fetchGame = async () => {
        try {
          const response = await fetch(
            `https://api.rawg.io/api/games/${id}?key=7533378071154d42917b6b92485bcede`
          );
          const data = await response.json();
          setGame(data);
        } catch (error) {
          console.error("Error al obtener detalles del juego:", error);
        }
      };

      fetchGame();
    }
  }, [id, games]);

  if (!game) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-white text-center text-2xl font-semibold">🎮 Juego no encontrado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 text-white bg-black">
      <h1 className="text-4xl font-extrabold mb-4 text-center">{game.name}</h1>

      <div className="relative">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ width: "250px", height: "250px", objectFit: "cover" }}
        />
      </div>

      <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <p className="text-lg"><strong>🎭 Géneros:</strong> {game.genres?.map((g) => g.name).join(", ") || "No disponible"}</p>
        <p className="text-lg mt-2"><strong>🎮 Plataformas:</strong> {game.platforms?.map((p) => p.platform.name).join(", ") || "No disponible"}</p>
        <p className="text-lg mt-2"><strong>📅 Fecha de lanzamiento:</strong> {game.released || "No disponible"}</p>
        <p className="text-lg mt-2"><strong>⭐ Puntuación:</strong> {game.rating || "No disponible"}</p>
      </div>

      <button 
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        onClick={() => window.history.back()}
      >
        ⬅ Volver
      </button>
    </div>
  );
};

export default PaginaInfo;
