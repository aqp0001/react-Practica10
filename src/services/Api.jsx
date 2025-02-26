import { useState, useEffect } from "react";

const API_KEY = "7533378071154d42917b6b92485bcede";
const BASE_URL = "https://api.rawg.io/api";
const PAGE_SIZE = 20;

const useGamesApi = (search, currentPage) => {
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/games?key=${API_KEY}&page=${currentPage || 1}&page_size=${PAGE_SIZE}`
        );
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

    fetchGames();
  }, [currentPage]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/games?key=${API_KEY}&search=${search}&page_size=${PAGE_SIZE}`
        );
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

const usePublishersApi = (search, currentPage) => {
  const [publishers, setPublishers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPublishers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/publishers?key=${API_KEY}&page=${currentPage || 1}&page_size=${PAGE_SIZE}`
        );
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
        const response = await fetch(
          `${BASE_URL}/publishers?key=${API_KEY}&search=${search}&page_size=${PAGE_SIZE}`
        );
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

  return { 
    publishers: Array.isArray(publishers) ? publishers : [], 
    searchResults: Array.isArray(searchResults) ? searchResults : [], 
    loading, 
    totalPages 
  };
};

export default useGamesApi;
