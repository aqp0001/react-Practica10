import { useState, useEffect } from "react";

const API_KEY = "7533378071154d42917b6b92485bcede"; // Reemplázala si es necesario
const BASE_URL = "https://api.rawg.io/api/games";
const PAGE_SIZE = 20; // Tamaño de página fijo

const useGamesApi = (search, currentPage) => {
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Obtener juegos principales
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&page=${currentPage}&page_size=${PAGE_SIZE}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener los juegos`);

        const data = await response.json();
        setGames(data.results || []); // Evita undefined
        setTotalPages(Math.ceil((data.count || 1) / PAGE_SIZE)); // Evita NaN
      } catch (error) {
        console.error("Error al obtener juegos:", error);
        setGames([]); // Evitar error de iteración
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [currentPage]);

  // 🔹 Obtener los juegos mejor calificados
  useEffect(() => {
    const fetchTopRatedGames = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&ordering=-rating&page_size=4`
        );
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener los juegos mejor calificados`);

        const data = await response.json();
        setTopRatedGames(data.results || []);
      } catch (error) {
        console.error("Error al obtener juegos mejor calificados:", error);
        setTopRatedGames([]);
      }
    };

    fetchTopRatedGames();
  }, []);

  // 🔹 Búsqueda de juegos
  useEffect(() => {
    if (!search) return; // No buscar si el input está vacío
    setLoading(true);

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&search=${search}&page_size=${PAGE_SIZE}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener resultados de búsqueda`);

        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [search]);

  return { games, topRatedGames, searchResults, loading, totalPages };
};

export default useGamesApi;
