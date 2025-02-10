import React, { useState, useEffect } from "react";

// Componente para manejar la lógica de añadir/quitar de favoritos
const FavoritoButton = ({ gameId }) => {
  // Estado para manejar si el juego está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Comprobamos si el juego ya está en los favoritos (usando localStorage)
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favoritos.includes(gameId)) {
      setIsFavorite(true);
    }
  }, [gameId]);

  const toggleFavorite = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    if (isFavorite) {
      // Si el juego ya está en favoritos, lo quitamos
      const updatedFavorites = favoritos.filter((id) => id !== gameId);
      localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Si no está en favoritos, lo agregamos
      favoritos.push(gameId);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setIsFavorite(true);
    }
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
