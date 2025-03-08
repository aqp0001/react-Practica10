import React from "react";
import { Link } from "react-router-dom";

const Tarjeta = ({ id, name, img }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center shadow-lg hover:scale-105 transition-transform duration-300 w-72">
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={img}
        alt={name}
      />
      <h5 className="mt-2 text-lg text-white">{name}</h5>
      <Link to={`/game/${id}`}>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600 transition">
          Ver más
        </button>
      </Link>
    </div>
  );
};

export default Tarjeta;
