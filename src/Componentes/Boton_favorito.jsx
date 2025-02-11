import React, { useState, useEffect } from "react";

const FavoritoButton = ({ gameId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setIsFavorite(favoritos.includes(gameId));
  }, [gameId]);

  const toggleFavorite = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const updatedFavorites = isFavorite
      ? favoritos.filter((id) => id !== gameId)
      : [...favoritos, gameId];

    localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-6 py-3 text-lg rounded-md transition duration-300 mt-4 ${
        isFavorite ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      {isFavorite ? "♥ En favoritos" : "Añadir a favoritos"}
    </button>
  );
};

export default FavoritoButton;
