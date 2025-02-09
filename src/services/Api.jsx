import { useState, useEffect } from 'react';

const useGamesApi = (search) => {
  const [games, setGames] = useState([]); // Juegos iniciales o predeterminados
  const [topRatedGames, setTopRatedGames] = useState([]); // Juegos mejor calificados
  const [searchResults, setSearchResults] = useState([]); // Resultados de la búsqueda
  const [loading, setLoading] = useState(false); // Estado de carga

  // Obtener juegos iniciales (al cargar la página)
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede&page_size=20'
        );
        const data = await response.json();
        setGames(data.results); // Establece los juegos iniciales
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Solo se ejecuta una vez al cargar la página

  // Obtener los juegos mejor calificados
  useEffect(() => {
    const fetchTopRatedGames = async () => {
      try {
        const response = await fetch(
          'https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede&ordering=-rating&page_size=4'
        );
        const data = await response.json();
        setTopRatedGames(data.results); // Establece los juegos mejor calificados
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchTopRatedGames();
  }, []); // Solo se ejecuta una vez al cargar

  // Realizar la búsqueda
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede&search=${search}`
          );
          const data = await response.json();
          setSearchResults(data.results); // Establece los resultados de búsqueda
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults(); // Llama a la búsqueda solo cuando `search` cambia
  }, [search]); // Se ejecuta cuando el valor de `search` cambia

  return { games, topRatedGames, searchResults, loading };
};

export default useGamesApi;
