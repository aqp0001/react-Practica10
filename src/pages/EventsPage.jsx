"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../store/slices/eventsSlice"
import EventCard from "../components/EventCard"
import Header from "../components/Header"
import Footer from "../components/Footer"

const EventsPage = () => {
  const dispatch = useDispatch()
  const { events, loading, error } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-5">
        <h1 className="text-5xl font-bold mb-8 text-center">🎮 Eventos de Videojuegos</h1>

        {loading && <p className="text-center text-lg animate-pulse">Cargando eventos...</p>}

        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl mx-auto">
          {events.length > 0
            ? events.map((event) => <EventCard key={event.id} event={event} />)
            : !loading && <p className="text-center col-span-full text-lg">No hay eventos disponibles</p>}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default EventsPage

