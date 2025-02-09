import React from "react";
import { Link } from "react-router-dom";

const Tarjeta = ({ id, name, img }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center w-64 shadow-lg transition-transform duration-300 hover:scale-105">
      <img className="w-full object-cover rounded-lg" style={{ height: "200px" }} src={img} alt={name} />
      <div className="mt-2">
        <h5 className="text-lg text-white">{name}</h5>
      </div>
      <Link to={`/game/${id}`}>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 mt-2 hover:bg-red-600">
          Ver más información
        </button>
      </Link>
    </div>
  );
};

export default Tarjeta;
