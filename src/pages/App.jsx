import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tarjeta from "../componentes/Tarjeta";
import Carrusel from "../componentes/Carrusel";
import useGamesApi from "../services/Api";
import PaginaInfo from "../pages/Pagina_info";

const Home = () => {
  const [search, setSearch] = useState(""); // Estado para el valor de búsqueda
  const { games, topRatedGames, searchResults, loading } = useGamesApi(search); // Pasamos `search` al hook

  // Función para manejar la búsqueda cuando el usuario hace clic en el botón
  const handleSearch = () => {
    setSearch(search); // Actualiza el estado de búsqueda con el valor del input
  };

  return (
    <div
      className="min-h-screen p-5 flex flex-col items-center"
      style={{ backgroundColor: "black" }}
    >
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
        🎮 Explora Videojuegos
      </h1>

      {/* Buscador */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar videojuegos..."
          className="w-full max-w-lg px-4 py-2 rounded-md text-black text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualiza el valor del input
        />
        <button
          onClick={handleSearch} // Ejecuta la búsqueda al hacer clic
          className="ml-4 px-6 py-2 rounded-lg bg-blue-600 text-white text-lg"
        >
          Buscar
        </button>
      </div>

      {/* Carrusel de juegos mejor calificados */}
      {topRatedGames.length > 0 ? (
        <Carrusel games={topRatedGames} />
      ) : (
        <p className="text-white text-center text-lg">
          Cargando juegos destacados...
        </p>
      )}

      {/* Grid de tarjetas de videojuegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        {/* Si hay resultados de búsqueda, mostramos esos */}
        {(searchResults.length > 0 || search) ? (
          searchResults.map((game) => (
            <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
          ))
        ) : (
          // Si no hay búsqueda y no hay resultados, mostramos los juegos iniciales
          games.length > 0 ? (
            games.map((game) => (
              <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
            ))
          ) : (
            <p className="text-white text-center col-span-full text-lg">
              No se encontraron resultados...
            </p>
          )
        )}
      </div>

      {/* Indicador de carga */}
      {loading && <p className="text-white text-center mt-4">Cargando juegos...</p>}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<PaginaInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
