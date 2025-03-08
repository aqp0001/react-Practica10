"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../store/slices/eventsSlice"
import EventCard from "../components/EventCard"
import Header from "../components/Header"
import Footer from "../components/Footer"

const MyEventsPage = () => {
  const dispatch = useDispatch()
  const { events, registeredEvents, loading, error } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  // Filtrar solo los eventos registrados
  const myEvents = events.filter((event) => registeredEvents.includes(event.id))

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🎮 Mis Eventos</h1>

        {loading && <p className="text-center text-lg animate-pulse">Cargando eventos...</p>}

        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl mx-auto">
          {myEvents.length > 0
            ? myEvents.map((event) => <EventCard key={event.id} event={event} />)
            : !loading && (
                <div className="text-center col-span-full">
                  <p className="text-lg mb-4">No te has registrado a ningún evento todavía</p>
                  <a
                    href="/eventos"
                    className="inline-block px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Explorar eventos
                  </a>
                </div>
              )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default MyEventsPage

