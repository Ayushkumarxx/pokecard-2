import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Hook for fetching a list of Pokémon with pagination
 * @param {number} itemsPerPage - Number of items to fetch per page (default: 20)
 * @param {number} initialPage - Initial page to fetch (default: 1)
 * @returns {Object} Pokemon list data and pagination controls
 */
const usePokemonList = (itemsPerPage = 20, initialPage = 1) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredTotalCount, setFilteredTotalCount] = useState(0);
  const [filteredTotalPages, setFilteredTotalPages] = useState(0);
  const [limit, setLimit] = useState(itemsPerPage);

  // Calculate offset based on current page and limit
  const offset = (currentPage - 1) * limit;

  // Fetch Pokémon list with current pagination settings
  const fetchPokemonList = useCallback(
    async (types = []) => {
      try {
        setError(null);
        const allPokemon = [];

        if (types.length === 0) {
          setLoading(true);
          // Get paginated list of Pokémon
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
          );

          const { results, count } = response.data;
          setTotalCount(count);
          setTotalPages(Math.ceil(count / limit));

          // Create batches of 5 Pokémon to fetch in parallel to avoid overwhelming the API
          const batches = [];
          for (let i = 0; i < results.length; i += 5) {
            batches.push(results.slice(i, i + 5));
          }

          // Process batches sequentially

          for (const batch of batches) {
            const batchData = await Promise.all(
              batch.map(async (pokemon) => {
                const detailResponse = await axios.get(pokemon.url);
                return detailResponse.data;
              })
            );

            allPokemon.push(...batchData);
          }
        } // Fetch with type filtering
        else {
          // If types are selected, fetch all Pokémon of each type and then filter
          const typePromises = types.map((type) =>
            axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)
          );

          const typeResponses = await Promise.all(typePromises);

          // Get Pokémon URLs from each type response
          const pokemonSets = typeResponses.map(
            (response) =>
              new Set(response.data.pokemon.map((entry) => entry.pokemon.url))
          );

          // Find Pokémon that match ALL selected types (intersection)
          let matchingPokemonUrls = [];
          if (pokemonSets.length > 0) {
            matchingPokemonUrls = [...pokemonSets[0]];

            if (pokemonSets.length > 1) {
              matchingPokemonUrls = matchingPokemonUrls.filter((url) =>
                pokemonSets.every((set) => set.has(url))
              );
            }
          }

          // Update total count and pages for pagination
          setFilteredTotalCount(matchingPokemonUrls.length);
          setFilteredTotalPages(Math.ceil(matchingPokemonUrls.length / limit));

          // Apply pagination to the filtered results
          const paginatedOffset = (currentPage - 1) * limit;
          const paginatedUrls = matchingPokemonUrls.slice(
            paginatedOffset,
            paginatedOffset + limit
          );

          // Create batches of 5 Pokémon to fetch in parallel
          const batches = [];
          for (let i = 0; i < paginatedUrls.length; i += 5) {
            batches.push(paginatedUrls.slice(i, i + 5));
          }

          for (const batch of batches) {
            const batchData = await Promise.all(
              batch.map(async (url) => {
                const detailResponse = await axios.get(url);
                return detailResponse.data;
              })
            );

            allPokemon.push(...batchData);
          }
        }

        const formattedPokemon = allPokemon.map((p) => ({
          id: p.id,
          name: p.name,
          image:
            p.sprites.other["official-artwork"].front_default ||
            p.sprites.front_default,
          types: p.types.map((type) => type.type.name),
          stats: {
            hp: p.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
            attack:
              p.stats.find((stat) => stat.stat.name === "attack")?.base_stat ||
              0,
            defense:
              p.stats.find((stat) => stat.stat.name === "defense")?.base_stat ||
              0,
            // specialAttack:
            //   p.stats.find((stat) => stat.stat.name === "special-attack")
            //     ?.base_stat || 0,
            // specialDefense:
            //   p.stats.find((stat) => stat.stat.name === "special-defense")
            //     ?.base_stat || 0,
            speed:
              p.stats.find((stat) => stat.stat.name === "speed")?.base_stat ||
              0,
          },
          // abilities: p.abilities.map((ability) => ({
          //   name: ability.ability.name,
          //   isHidden: ability.is_hidden,
          // })),
          // moves: p.moves.slice(0, 5).map((move) => move.move.name), // Get just first 5 moves for list view
          // height: p.height,
          // weight: p.weight,
          // species: p.species.name,
        }));

        if (types.length > 0) {
          return formattedPokemon;
        }
        setPokemon(formattedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setError("Failed to fetch Pokémon list. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit, offset]
  );

  // Navigation functions
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const changeItemsPerPage = useCallback((newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  // Fetch data whenever pagination changes
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return {
    pokemon,
    loading,
    error,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      filteredTotalCount,
      filteredTotalPages,
      itemsPerPage: limit,
    },
    fetchPokemonList,
    nextPage,
    prevPage,
    goToPage,
    changeItemsPerPage,
    refreshList: fetchPokemonList,
  };
};

export default usePokemonList;
