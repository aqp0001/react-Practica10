import React from "react";
import { useParams, Link } from "react-router-dom";
import FavoritoButton from "../Componentes/Boton_favorito";
import { useGameDetails } from "../services/Api"; 

const PaginaInfo = () => {
  const { id } = useParams();
  const { game, error, loading } = useGameDetails(id);

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

      <div className="relative mb-8 w-full flex justify-center">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ width: "100%", height: "auto", maxWidth: "600px", objectFit: "cover" }}
        />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl text-left mb-6">
        <h2 className="text-2xl font-semibold mb-4">Descripción:</h2>
        <p className="text-lg">{game.description_raw || "No disponible"}</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl text-center mb-6">
        <p className="text-lg mb-2">
          <strong>🎭 Géneros:</strong>{" "}
          {game.genres?.map((g) => (
            <Link key={g.id} to={`/genero/${g.slug}`} className="text-blue-400 hover:underline">
              {g.name}
            </Link>
          )).reduce((prev, curr) => [prev, ", ", curr], []) || "No disponible"}
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
        <p className="text-lg mb-2">
          <strong>🏷️ Tags:</strong>{" "}
          {game.tags?.length > 0
            ? game.tags.map((t, index) => (
                <span key={t.id}>
                  {index > 0 && ", "}
                  <Link to={`/tags/${t.slug}`} className="text-blue-400 hover:underline">
                    {t.name}
                  </Link>
                </span>
              ))
            : "No disponible"}
        </p>

        <p className="text-lg mb-2">
          <strong>🏢 Publisher:</strong>{" "}
          {game.publishers?.length > 0
            ? game.publishers.map((p, index) => (
                <span key={p.id}>
                  {index > 0 && ", "}
                  <Link to={`/publisher/${encodeURIComponent(p.slug)}`} className="text-blue-400 hover:underline">
                    {p.name}
                  </Link>
                </span>
              ))
            : "No disponible"}
        </p>
      </div>

      <FavoritoButton gameId={game.id} />

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
