"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGames } from "../store/slices/gamesSlice"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SortSelector from "../components/SortSelector"

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const { games, loading, error } = useSelector((state) => state.games)
  const favorites = useSelector((state) => state.user.favorites)

  useEffect(() => {
    dispatch(fetchGames({ page: 1, pageSize: 40 }))
  }, [dispatch])

  // Filtrar solo los juegos favoritos
  const favoriteGames = games.filter((game) => favorites.includes(game.id))

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">❤️ Mis Juegos Favoritos</h1>

        {loading && <p className="text-center text-lg animate-pulse">Cargando juegos...</p>}

        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        <div className="w-full max-w-6xl mx-auto">
          <SortSelector />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl mx-auto">
          {favoriteGames.length > 0
            ? favoriteGames.map((game) => (
                <Tarjeta key={game.id} id={game.id} name={game.name} img={game.background_image} />
              ))
            : !loading && (
                <div className="text-center col-span-full">
                  <p className="text-lg mb-4">No has añadido ningún juego a favoritos</p>
                  <a
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Explorar juegos
                  </a>
                </div>
              )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FavoritesPage

