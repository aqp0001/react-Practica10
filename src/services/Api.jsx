import { useState, useEffect } from "react";

const API_KEY = "7533378071154d42917b6b92485bcede";
const BASE_URL = "https://api.rawg.io/api";
const PAGE_SIZE = 20;

const useGamesApi = (search, currentPage) => {
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]); // Agregado
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/games?key=${API_KEY}&page=${currentPage || 1}&page_size=${PAGE_SIZE}`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener los juegos`);

        const data = await response.json();
        setGames(Array.isArray(data.results) ? data.results : []);
        setTotalPages(Math.max(1, Math.ceil((data.count || PAGE_SIZE) / PAGE_SIZE)));
      } catch (error) {
        console.error("Error al obtener juegos:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopRatedGames = async () => {
      try {
        const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener juegos populares`);

        const data = await response.json();
        setTopRatedGames(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.error("Error al obtener juegos populares:", error);
        setTopRatedGames([]);
      }
    };

    fetchGames();
    fetchTopRatedGames(); // Llamamos la función de juegos populares
  }, [currentPage]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);

    const fetchSearchResults = async () => {
      try {
        const url = `${BASE_URL}/games?key=${API_KEY}&search=${search}&page_size=${PAGE_SIZE}`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener resultados`);

        const data = await response.json();
        setSearchResults(Array.isArray(data.results) ? data.results : []);
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

const useGameDetails = (gameId) => {
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Juego no encontrado en la API");

        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError("Hubo un error al cargar el juego. Intenta nuevamente.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  return { game, error, loading };
};

const usePublishersApi = (search, currentPage) => {
  const [publishers, setPublishers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPublishers = async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/publishers?key=${API_KEY}&page=${currentPage || 1}&page_size=${PAGE_SIZE}`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron obtener los publishers`);

        const data = await response.json();
        setPublishers(Array.isArray(data.results) ? data.results : []);
        setTotalPages(Math.max(1, Math.ceil((data.count || PAGE_SIZE) / PAGE_SIZE)));
      } catch (error) {
        console.error("Error al obtener publishers:", error);
        setPublishers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, [currentPage]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);

    const fetchSearchResults = async () => {
      try {
        const url = `${BASE_URL}/publishers?key=${API_KEY}&search=${search}&page_size=${PAGE_SIZE}`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: No se encontraron publishers`);

        const data = await response.json();
        setSearchResults(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.error("Error en la búsqueda de publishers:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [search]);

  return { publishers, searchResults, loading, totalPages };
};

const useGamesByPublisher = (publisher, currentPage) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const formattedPublisher = publisher.replace(/\s+/g, "").toLowerCase();
        const url = `${BASE_URL}/games?publishers=${formattedPublisher}&page=${currentPage}&page_size=12&key=${API_KEY}`;
        console.log(url);  // Verifica la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al cargar los juegos");

        const data = await response.json();
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 12));
      } catch (error) {
        setError("Hubo un problema al cargar los juegos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (publisher) fetchGames();
  }, [publisher, currentPage]);

  return { games, loading, error, totalPages };
};

export { useGamesApi, useGameDetails, usePublishersApi, useGamesByPublisher };
