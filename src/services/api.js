import axios from "axios"

const API_KEY = "7533378071154d42917b6b92485bcede"
const BASE_URL = "https://api.rawg.io/api"

// Configuración de Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
})

// Servicios para juegos
export const gamesService = {
  getGames: async (page = 1, pageSize = 20) => {
    const response = await apiClient.get("/games", {
      params: { page, page_size: pageSize },
    })
    return response.data
  },

  getTopRatedGames: async () => {
    const response = await apiClient.get("/games", {
      params: { ordering: "-rating", page_size: 10 },
    })
    return response.data
  },

  searchGames: async (query, page = 1, pageSize = 20) => {
    const response = await apiClient.get("/games", {
      params: { search: query, page, page_size: pageSize },
    })
    return response.data
  },

  getGameDetails: async (gameId) => {
    const response = await apiClient.get(`/games/${gameId}`)
    return response.data
  },

  getGamesByTag: async (tag, page = 1, pageSize = 12) => {
    const formattedTag = tag.replace(/\s+/g, "").toLowerCase()
    const response = await apiClient.get("/games", {
      params: { tags: formattedTag, page, page_size: pageSize },
    })
    return response.data
  },

  getGamesByPublisher: async (publisher, page = 1, pageSize = 12) => {
    const formattedPublisher = publisher.replace(/\s+/g, "").toLowerCase()
    const response = await apiClient.get("/games", {
      params: { publishers: formattedPublisher, page, page_size: pageSize },
    })
    return response.data
  },
}

// Servicios para publishers
export const publishersService = {
  getPublishers: async (page = 1, pageSize = 20) => {
    const response = await apiClient.get("/publishers", {
      params: { page, page_size: pageSize },
    })
    return response.data
  },

  searchPublishers: async (query, page = 1, pageSize = 20) => {
    const response = await apiClient.get("/publishers", {
      params: { search: query, page, page_size: pageSize },
    })
    return response.data
  },
}

// Servicio para eventos (simulado)
export const eventsService = {
  getEvents: async () => {
    // Simulamos una petición API que devuelve los eventos después de un pequeño retraso
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(events)
      }, 500)
    })
  },
}

// Datos de eventos simulados
export const events = [
  {
    id: 1,
    title: "Gaming Expo 2025",
    location: "New York",
    image: "/events/gaming_expo.jpg",
    description: "La mayor exposición de videojuegos del año con los últimos lanzamientos y tecnologías.",
    date: "2025-05-15",
  },
  {
    id: 2,
    title: "Indie Game Developers Meetup",
    location: "San Francisco",
    image: "/events/indie_meetup.jpg",
    description: "Reunión de desarrolladores independientes para compartir ideas y experiencias.",
    date: "2025-06-22",
  },
  {
    id: 3,
    title: "Esports Championship",
    location: "Los Angeles",
    image: "/events/esports.jpg",
    description: "Campeonato mundial de deportes electrónicos con los mejores equipos del mundo.",
    date: "2025-07-10",
  },
  {
    id: 4,
    title: "Retro Gaming Festival",
    location: "Chicago",
    image: "/events/retro_gaming.jpg",
    description: "Festival dedicado a los videojuegos clásicos y retro con torneos y exhibiciones.",
    date: "2025-08-05",
  },
]

