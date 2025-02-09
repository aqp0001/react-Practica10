import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tarjeta from "../componentes/Tarjeta";
import Carrusel from "../componentes/Carrusel";
import useGamesApi from "../services/Api";
import PaginaInfo from "../pages/Pagina_info";

const Home = ({ games, topRatedGames }) => {
  const [search, setSearch] = useState("");

  // Filtrar juegos según la búsqueda
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen p-5 flex flex-col items-center" 
      style={{ backgroundColor: "black" }} // Fondo negro aplicado con style
    >
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-white mb-6 text-center">🎮 Explora Videojuegos</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar videojuegos..."
        className="w-full max-w-lg px-4 py-2 rounded-md text-black text-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Carrusel de juegos mejor calificados */}
      {topRatedGames.length > 0 ? (
        <Carrusel games={topRatedGames} />
      ) : (
        <p className="text-white text-center text-lg">Cargando juegos destacados...</p>
      )}

      {/* Grid de tarjetas de videojuegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
          ))
        ) : (
          <p className="text-white text-center col-span-full text-lg">No se encontraron resultados...</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const { games, topRatedGames } = useGamesApi();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home games={games} topRatedGames={topRatedGames} />} />
        <Route path="/game/:id" element={<PaginaInfo games={games} />} />
      </Routes>
    </Router>
  );
};

export default App;