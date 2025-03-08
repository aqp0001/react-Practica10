import { createSlice } from "@reduxjs/toolkit"

// Función para cargar favoritos desde localStorage
const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem("favorites")
    return savedFavorites ? JSON.parse(savedFavorites) : []
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error)
    return []
  }
}

// Slice inicial
const initialState = {
  user: {
    id: 1,
    name: "Usuario",
    avatar: "/avatar.png",
  },
  favorites: loadFavorites(),
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const gameId = action.payload
      const index = state.favorites.indexOf(gameId)

      if (index === -1) {
        // Añadir a favoritos
        state.favorites.push(gameId)
      } else {
        // Eliminar de favoritos
        state.favorites.splice(index, 1)
      }

      // Guardar en localStorage
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    },
  },
})

export const { toggleFavorite } = userSlice.actions
export default userSlice.reducer

