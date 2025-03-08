import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { gamesService } from "../../services/api"

// Thunks
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page = 1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      return await gamesService.getGames(page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchTopRatedGames = createAsyncThunk("games/fetchTopRatedGames", async (_, { rejectWithValue }) => {
  try {
    return await gamesService.getTopRatedGames()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const searchGames = createAsyncThunk(
  "games/searchGames",
  async ({ query, page = 1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      return await gamesService.searchGames(query, page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchGameDetails = createAsyncThunk("games/fetchGameDetails", async (gameId, { rejectWithValue }) => {
  try {
    return await gamesService.getGameDetails(gameId)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchGamesByTag = createAsyncThunk(
  "games/fetchGamesByTag",
  async ({ tag, page = 1, pageSize = 12 }, { rejectWithValue }) => {
    try {
      return await gamesService.getGamesByTag(tag, page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchGamesByPublisher = createAsyncThunk(
  "games/fetchGamesByPublisher",
  async ({ publisher, page = 1, pageSize = 12 }, { rejectWithValue }) => {
    try {
      return await gamesService.getGamesByPublisher(publisher, page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchPublishers = createAsyncThunk(
  "games/fetchPublishers",
  async ({ page = 1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      return await gamesService.getPublishers(page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const searchPublishers = createAsyncThunk(
  "games/searchPublishers",
  async ({ query, page = 1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      return await gamesService.searchPublishers(query, page, pageSize)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

// Slice inicial
const initialState = {
  games: [],
  topRatedGames: [],
  searchResults: [],
  gameDetails: null,
  publishers: [],
  publisherSearchResults: [],
  gamesByTag: [],
  gamesByPublisher: [],
  loading: false,
  error: null,
  totalPages: 1,
  sortOrder: "none", // 'name', 'rating', 'released'
}

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload

      // Aplicar ordenación a los juegos actuales
      const sortGames = (games) => {
        if (!games.length) return games

        const sorted = [...games]
        switch (action.payload) {
          case "name":
            return sorted.sort((a, b) => a.name.localeCompare(b.name))
          case "rating":
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          case "released":
            return sorted.sort((a, b) => new Date(b.released || 0) - new Date(a.released || 0))
          default:
            return games
        }
      }

      state.games = sortGames(state.games)
      state.searchResults = sortGames(state.searchResults)
      state.gamesByTag = sortGames(state.gamesByTag)
      state.gamesByPublisher = sortGames(state.gamesByPublisher)
    },
    clearGameDetails: (state) => {
      state.gameDetails = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchTopRatedGames
      .addCase(fetchTopRatedGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopRatedGames.fulfilled, (state, action) => {
        state.loading = false
        state.topRatedGames = action.payload.results
      })
      .addCase(fetchTopRatedGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // searchGames
      .addCase(searchGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchGameDetails
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false
        state.gameDetails = action.payload
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchGamesByTag
      .addCase(fetchGamesByTag.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGamesByTag.fulfilled, (state, action) => {
        state.loading = false
        state.gamesByTag = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 12)
      })
      .addCase(fetchGamesByTag.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchGamesByPublisher
      .addCase(fetchGamesByPublisher.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGamesByPublisher.fulfilled, (state, action) => {
        state.loading = false
        state.gamesByPublisher = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 12)
      })
      .addCase(fetchGamesByPublisher.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchPublishers
      .addCase(fetchPublishers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.loading = false
        state.publishers = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // searchPublishers
      .addCase(searchPublishers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchPublishers.fulfilled, (state, action) => {
        state.loading = false
        state.publisherSearchResults = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(searchPublishers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSortOrder, clearGameDetails } = gamesSlice.actions
export default gamesSlice.reducer

