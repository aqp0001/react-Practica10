"use client"

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, registerEventFromQR } from "../store/slices/eventsSlice"
import Header from "../components/Header"
import Footer from "../components/Footer"

const JoinEventPage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { events, loading, error } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  useEffect(() => {
    if (eventId && events.length > 0) {
      // Verificar si el evento existe
      const eventExists = events.some((event) => event.id === Number.parseInt(eventId))

      if (eventExists) {
        // Registrar al usuario en el evento
        dispatch(registerEventFromQR(Number.parseInt(eventId)))

        // Mostrar mensaje de éxito durante 3 segundos y luego redirigir
        const timer = setTimeout(() => {
          navigate("/mis-eventos")
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [eventId, events, dispatch, navigate])

  // Encontrar el evento por ID
  const event = events.find((e) => e.id === Number.parseInt(eventId))

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-5 flex flex-col items-center justify-center">
        {loading ? (
          <p className="text-center text-lg animate-pulse">Cargando...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-xl text-red-500 mb-4">Error: {error}</p>
            <button
              onClick={() => navigate("/eventos")}
              className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver todos los eventos
            </button>
          </div>
        ) : event ? (
          <div className="text-center max-w-md">
            <div className="mb-6 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">¡Registro exitoso!</h1>
            <p className="text-xl mb-6">
              Te has registrado al evento: <span className="font-bold">{event.title}</span>
            </p>
            <p className="text-gray-400 mb-8">Serás redirigido a tus eventos en unos segundos...</p>
            <button
              onClick={() => navigate("/mis-eventos")}
              className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver mis eventos
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Evento no encontrado</h1>
            <p className="text-xl mb-6">El evento que intentas buscar no existe o ha sido eliminado.</p>
            <button
              onClick={() => navigate("/eventos")}
              className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver todos los eventos
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default JoinEventPage

