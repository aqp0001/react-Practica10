import React, { useState } from "react";
import Tarjeta from "../Componentes/Tarjeta";
import usePublishersApi from "../services/Api"; 
import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";

const BuscarPublishers = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { publishers, searchResults, loading, totalPages } = usePublishersApi(search, currentPage);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      
      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🎮 Explora Publishers</h1>

        <div className="flex w-full max-w-lg mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="flex w-full space-x-4">
            <input
              type="text"
              placeholder="Buscar publishers..."
              className="flex-1 px-4 py-3 rounded-md text-white text-lg focus:outline-none"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center col-span-full text-lg animate-pulse">Cargando publishers...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((publisher) => (
              <Tarjeta key={publisher.id} id={publisher.id} name={publisher.name} img={publisher.image_background} />
            ))
          ) : publishers.length > 0 ? (
            publishers.map((publisher) => (
              <Tarjeta key={publisher.id} id={publisher.id} name={publisher.name} img={publisher.image_background} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg">No se encontraron publishers...</p>
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

export default BuscarPublishers;
