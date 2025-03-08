"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGames, fetchTopRatedGames, searchGames } from "../store/slices/gamesSlice"
import Tarjeta from "../components/Tarjeta"
import Carrusel from "../components/Carrusel"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SortSelector from "../components/SortSelector"

const HomePage = () => {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  const { games, topRatedGames, searchResults, loading, totalPages, error } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(fetchGames({ page: currentPage }))
    dispatch(fetchTopRatedGames())
  }, [dispatch, currentPage])

  const handleSearchChange = (e) => setSearch(e.target.value)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      dispatch(searchGames({ query: search, page: 1 }))
      setCurrentPage(1)
    }
  }

  // Determinar qué juegos mostrar
  const displayedGames = searchResults.length > 0 ? searchResults : games

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🎮 Explora Videojuegos</h1>

        <div className="flex w-full max-w-lg mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="flex w-full space-x-4">
            <input
              type="text"
              placeholder="Buscar videojuegos..."
              className="flex-1 px-4 py-3 rounded-md text-white text-lg focus:outline-none bg-gray-800 border border-gray-700"
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

        <div className="w-full max-w-6xl mx-auto mt-8 mb-8">
          {topRatedGames.length > 0 ? (
            <Carrusel games={topRatedGames} />
          ) : (
            <p className="text-center text-lg animate-pulse">🎮 Cargando juegos destacados...</p>
          )}
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <SortSelector />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center col-span-full text-lg animate-pulse">Cargando juegos...</p>
          ) : error ? (
            <p className="text-center col-span-full text-lg text-red-500">Error: {error}</p>
          ) : displayedGames.length > 0 ? (
            displayedGames.map((game) => (
              <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg">No se encontraron resultados...</p>
          )}
        </div>

        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50 hover:bg-blue-700"
          >
            Anterior
          </button>
          <span className="text-lg font-bold">
            Página {currentPage} de {totalPages ?? 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage >= totalPages || loading}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50 hover:bg-blue-700"
          >
            Siguiente
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

