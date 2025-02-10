import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold">
          🎮 Game Explorer
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition">Inicio</Link>
          <Link to="/favoritos" className="hover:text-yellow-400 transition">Favoritos</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">Acerca</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
