"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGamesByPublisher } from "../store/slices/gamesSlice"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SortSelector from "../components/SortSelector"

const PublisherPage = () => {
  const { publisher } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  const { gamesByPublisher: games, loading, error, totalPages } = useSelector((state) => state.games)

  useEffect(() => {
    if (publisher) {
      dispatch(fetchGamesByPublisher({ publisher, page: currentPage }))
    }
  }, [dispatch, publisher, currentPage])

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🕹️ Juegos de "{publisher}"</h1>

        {loading && <p className="text-center text-lg animate-pulse">Cargando juegos...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        <div className="w-full max-w-6xl mx-auto">
          <SortSelector />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl mx-auto">
          {games.length > 0
            ? games.map((game) => <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />)
            : !loading && (
                <p className="text-center col-span-full text-lg">No se encontraron juegos de este publisher...</p>
              )}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-lg font-bold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublisherPage

