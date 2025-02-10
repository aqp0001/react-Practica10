import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaginaInfo = ({ games }) => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const foundGame = games.find((g) => g.id.toString() === id);
        
        if (foundGame) {
          setGame(foundGame);
        } else {
          const response = await fetch(
            `https://api.rawg.io/api/games/${id}?key=7533378071154d42917b6b92485bcede`
          );

          if (!response.ok) throw new Error("Juego no encontrado en la API");

          const data = await response.json();
          setGame(data);
        }
      } catch (error) {
        setError("Hubo un error al cargar el juego. Intenta nuevamente.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, games]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black w-full">
        <p className="text-white text-2xl font-semibold">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black w-full">
        <p className="text-white text-2xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black w-full">
        <p className="text-white text-2xl font-semibold">🎮 Juego no encontrado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 text-white bg-black w-full">
      <h1 className="text-4xl font-extrabold mb-4 text-center">{game.name}</h1>

      {/* Imagen del juego */}
      <div className="relative mb-8 w-full flex justify-center">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "600px", // Puedes ajustar el tamaño máximo según lo desees
            objectFit: "cover",
          }}
        />
      </div>

      {/* Información adicional del juego */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl text-center">
        <p className="text-lg mb-2">
          <strong>🎭 Géneros:</strong> {game.genres?.map((g) => g.name).join(", ") || "No disponible"}
        </p>
        <p className="text-lg mb-2">
          <strong>🎮 Plataformas:</strong> {game.platforms?.map((p) => p.platform.name).join(", ") || "No disponible"}
        </p>
        <p className="text-lg mb-2">
          <strong>📅 Fecha de lanzamiento:</strong> {game.released || "No disponible"}
        </p>
        <p className="text-lg mb-2">
          <strong>⭐ Puntuación:</strong> {game.rating || "No disponible"}
        </p>
      </div>

      {/* Botón para volver */}
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
