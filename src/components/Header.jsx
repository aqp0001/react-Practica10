import { Link } from "react-router-dom"
import UserAvatar from "./UserAvatar"

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-400 transition">
          🎮 Game Explorer
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-400 transition">
            Inicio
          </Link>
          <Link to="/buscarPublishers" className="hover:text-yellow-400 transition">
            Publishers
          </Link>
          <Link to="/eventos" className="hover:text-yellow-400 transition">
            Eventos
          </Link>
          <Link to="/favoritos" className="hover:text-yellow-400 transition">
            Favoritos
          </Link>
          <UserAvatar />
        </nav>
        <div className="md:hidden">
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}

export default Header

