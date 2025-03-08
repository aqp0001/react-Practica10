"use client"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "../store/slices/userSlice"

const FavoriteButton = ({ gameId }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.user.favorites)
  const isFavorite = favorites.includes(gameId)

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(gameId))
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`mt-4 flex items-center justify-center px-4 py-2 rounded-lg transition duration-300 ${
        isFavorite ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isFavorite ? "0" : "1.5"}
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    </button>
  )
}

export default FavoriteButton

