"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const user = useSelector((state) => state.user.user)
  const favorites = useSelector((state) => state.user.favorites)
  const registeredEvents = useSelector((state) => state.events.registeredEvents)

  const toggleDropdown = () => setIsOpen(!isOpen)

  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
          <img
            src={user.avatar || "/placeholder.svg?height=40&width=40"}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=40&width=40"
            }}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
            <p className="font-semibold">{user.name}</p>
          </div>

          <Link
            to="/favoritos"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Mis Favoritos ({favorites.length})
          </Link>

          <Link
            to="/mis-eventos"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Mis Eventos ({registeredEvents.length})
          </Link>

          <Link
            to="/eventos"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Explorar Eventos
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserAvatar

