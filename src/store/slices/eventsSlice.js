import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { eventsService } from "../../services/api"

// Thunks
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    return await eventsService.getEvents()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Función para cargar eventos registrados desde localStorage
const loadRegisteredEvents = () => {
  try {
    const savedEvents = localStorage.getItem("registeredEvents")
    return savedEvents ? JSON.parse(savedEvents) : []
  } catch (error) {
    console.error("Error loading registered events from localStorage:", error)
    return []
  }
}

// Slice inicial
const initialState = {
  events: [],
  registeredEvents: loadRegisteredEvents(),
  loading: false,
  error: null,
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const eventId = action.payload
      if (!state.registeredEvents.includes(eventId)) {
        state.registeredEvents.push(eventId)
        // Guardar en localStorage
        localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
      }
    },
    unregisterFromEvent: (state, action) => {
      const eventId = action.payload
      state.registeredEvents = state.registeredEvents.filter((id) => id !== eventId)
      // Actualizar localStorage
      localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
    },
    registerEventFromQR: (state, action) => {
      const eventId = action.payload
      if (!state.registeredEvents.includes(eventId)) {
        state.registeredEvents.push(eventId)
        // Guardar en localStorage
        localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { registerForEvent, unregisterFromEvent, registerEventFromQR } = eventsSlice.actions
export default eventsSlice.reducer

