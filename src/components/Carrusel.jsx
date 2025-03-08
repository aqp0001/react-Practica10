import React, { useState } from "react";

const Carrusel = ({ games }) => {
  const [current, setCurrent] = useState(0);

  if (!games || games.length === 0) {
    return <p className="text-white text-center">Cargando...</p>;
  }

  const nextSlide = () => setCurrent((prev) => (prev + 1) % games.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + games.length) % games.length);

  return (
    <div className="relative flex items-center justify-center w-full mx-auto mt-5 max-w-4xl h-[500px]">
      <button
        className="absolute left-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <img
        src={games[current].background_image}
        alt={games[current].name}
        className="w-11/12 h-full object-cover rounded-lg"
      />
      <button
        className="absolute right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={nextSlide}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carrusel;
