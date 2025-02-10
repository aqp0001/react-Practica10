import React from "react";
import { Link } from "react-router-dom";

export const Tarjeta = ({ id, name, img }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 text-center shadow-lg transition-transform duration-300 hover:scale-105" style={{ width: "300px" }}>
      <img className="w-full object-cover rounded-lg" style={{ height: "180px", width: "100%" }} src={img} alt={name} />
      <div className="mt-2">
        <h5 className="text-base text-white">{name}</h5>
      </div>
      <Link to={`/game/${id}`}>
        <button className="bg-red-500 text-white py-1 px-3 text-sm rounded-md transition duration-300 mt-2 hover:bg-red-600 hover:scale-110">
          Ver más
        </button>
      </Link>
    </div>
  );
};

export const TarjetasLista = ({ juegos }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {juegos.map((juego) => (
        <div key={juego.id} className="flex-shrink-0" style={{ width: "calc(33.333% - 16px)" }}>
          <Tarjeta {...juego} />
        </div>
      ))}
    </div>
  );
};

export default Tarjeta;
