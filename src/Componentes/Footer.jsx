import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-6 text-center mt-10">
      <p className="text-lg">
        © {new Date().getFullYear()} Game Explorer. Todos los derechos reservados.
      </p>
      <div className="mt-3 flex justify-center space-x-6">
        {["Twitter", "Facebook", "Instagram"].map((network) => (
          <a
            key={network}
            href={`https://${network.toLowerCase()}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            {network}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
