import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGamesByPublisher } from "../services/Api"; // Importa el hook reutilizable
import Tarjeta from "../Componentes/Tarjeta";
import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";

const Publisher = () => {
  const { publisher } = useParams(); // Captura el publisher desde la URL
  const [currentPage, setCurrentPage] = useState(1);
  const { games, loading, error, totalPages } = useGamesByPublisher(publisher, currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🕹️ Juegos de "{publisher}"</h1>

        {loading && <p className="text-center text-lg animate-pulse">Cargando juegos...</p>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl mx-auto">
          {games.length > 0 ? (
            games.map((game) => (
              <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
            ))
          ) : (
            !loading && <p className="text-center col-span-full text-lg">No se encontraron juegos de este publisher...</p>
          )}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-lg font-bold">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Publisher;