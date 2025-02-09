import React, { useState } from 'react';

const Carrusel = ({ games }) => {
  const [current, setCurrent] = useState(0);

  if (!games || games.length === 0) {
    return <p className="text-white text-center">Cargando...</p>;
  }

  const nextSlide = () => setCurrent((prev) => (prev + 1) % games.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + games.length) % games.length);

  return (
    <div className="relative flex items-center justify-center w-full mx-auto mt-5" style={{ width: "1000px", height: "500px" }}>
      <button className="absolute left-2 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition" onClick={prevSlide}>
        {'<'}
      </button>
      <img src={games[current].background_image} alt={games[current].name} style={{ width: "90%", height: "500px", objectFit: "cover" }} className="rounded-lg mx-auto" />
      <button className="absolute right-2 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition" onClick={nextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default Carrusel;