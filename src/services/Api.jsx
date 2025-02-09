import { useState, useEffect } from 'react';

const useGamesApi = () => {
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);

  useEffect(() => {
    // Obtener todos los juegos
    fetch('https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede')
      .then(response => response.json())
      .then(data => setGames(data.results))
      .catch(error => console.error("Error al realizar la solicitud:", error));

    // Obtener los 4 mejores juegos directamente ordenados
    fetch('https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede&ordering=-rating&page_size=4')
      .then(response => response.json())
      .then(data => setTopRatedGames(data.results))
      .catch(error => console.error("Error al realizar la solicitud:", error));
  }, []);

  return { games, topRatedGames };
};

export default useGamesApi;