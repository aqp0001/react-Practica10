import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tarjeta from "../Componentes/Tarjeta";
import Carrusel from "../Componentes/Carrusel";
import useGamesApi from "../services/Api";
import Header from "../Componentes/header";
import Footer from "../Componentes/footer";
import PaginaInfo from "../pages/Pagina_info";

const Home = () => {
  const [search, setSearch] = useState("");
  const { games, topRatedGames, searchResults, loading } = useGamesApi(search);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow p-5 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-8 text-center">🎮 Explora Videojuegos</h1>

        <div className="flex w-full max-w-lg space-x-4">
          <input
            type="text"
            placeholder="Buscar videojuegos..."
            className="flex-1 px-4 py-3 rounded-md text-black text-lg focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition">
            Buscar
          </button>
        </div>

        <div className="w-full max-w-6xl mt-8">
          {topRatedGames.length > 0 ? (
            <Carrusel games={topRatedGames} />
          ) : (
            <p className="text-center text-lg">Cargando juegos destacados...</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl">
          {loading ? (
            <p className="text-center col-span-full text-lg">Cargando juegos...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((game) => (
              <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
            ))
          ) : games.length > 0 ? (
            games.map((game) => (
              <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg">No se encontraron resultados...</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const HomeWrapper = () => {
  const { games, searchResults } = useGamesApi("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<PaginaInfo games={[...games, ...searchResults]} />} />
      </Routes>
    </Router>
  );
};

export default HomeWrapper;
