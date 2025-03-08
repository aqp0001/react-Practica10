"use client"
import { useDispatch, useSelector } from "react-redux"
import { setSortOrder } from "../store/slices/gamesSlice"

const SortSelector = () => {
  const dispatch = useDispatch()
  const currentSort = useSelector((state) => state.games.sortOrder)

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value))
  }

  return (
    <div className="flex items-center space-x-2 mb-4">
      <label htmlFor="sort-select" className="text-white font-medium">
        Ordenar por:
      </label>
      <select
        id="sort-select"
        className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2"
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="none">Por defecto</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="rating">Valoración (Mayor-Menor)</option>
        <option value="released">Fecha de lanzamiento (Reciente-Antiguo)</option>
      </select>
    </div>
  )
}

export default SortSelector

