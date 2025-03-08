"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerForEvent, unregisterFromEvent } from "../store/slices/eventsSlice"
import { generateEventQR } from "../utils/qrGenerator"

const EventCard = ({ event }) => {
  const dispatch = useDispatch()
  const registeredEvents = useSelector((state) => state.events.registeredEvents)
  const isRegistered = registeredEvents.includes(event.id)
  const [showQR, setShowQR] = useState(false)
  const [qrCode, setQrCode] = useState(null)

  const handleRegister = () => {
    if (isRegistered) {
      dispatch(unregisterFromEvent(event.id))
    } else {
      dispatch(registerForEvent(event.id))
    }
  }

  const handleShowQR = async () => {
    if (!qrCode) {
      const qrDataUrl = await generateEventQR(event.id)
      setQrCode(qrDataUrl)
    }
    setShowQR(true)
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg?height=200&width=400"}
          alt={event.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=200&width=400"
          }}
        />
        <div className="absolute top-0 right-0 m-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{formatDate(event.date)}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Ubicación:</span> {event.location}
        </p>
        <p className="text-gray-400 text-sm mb-4">{event.description}</p>

        <div className="flex flex-col space-y-2">
          <button
            onClick={handleRegister}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isRegistered ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isRegistered ? "Cancelar registro" : "Registrarse"}
          </button>

          <button
            onClick={handleShowQR}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            Compartir (QR)
          </button>
        </div>
      </div>

      {showQR && qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Comparte este evento</h3>
            <div className="flex justify-center mb-4">
              <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-gray-700 text-sm mb-4 text-center">
              Escanea este código QR para registrarte en "{event.title}"
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventCard

