import React, { useEffect, useState } from "react";
import "../../styles/animations.css";
import Exports from "../../shared/utils/export";
import FilterTypes from "./components/FilterTypes";
import usePokemonList from "../../shared/hooks/usePokemonList";
import usePokemonDetail from "../../shared/hooks/usePokemonDetail";
import ListPageLoder from "./components/ListPageLoader";
import Footer from "./components/Footer";
import SectionLoader from "../../shared/components/SectionLoader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import usePokemonTypes from "../../shared/hooks/usePokemonTypes";
import PaginationControls from "./components/PaginationControls";

const ListPage = () => {
  // State for filters and UI state
  const [selectedTypes, setSelectedTypes] = useState([]); // Selected types for filtering
  const [allTypes, setAllTypes] = useState([]); // List of all available types
  const [searchTerm, setSearchTerm] = useState(""); // Search term for Pokémon search
  const [filteredPokemon, setFilteredPokemon] = useState(null); // Filtered Pokémon list

  // Add state for tracking sort configuration
  const [sortConfig, setSortConfig] = useState({
    field: "id", // Default sorting by id
    direction: "asc", // Default sorting direction
  });
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page
  const [sectionLoading, setSectionLoading] = useState(false); // Section loading state

  // Use our custom hooks
  const {
    pokemon,
    loading,
    pagination,
    nextPage,
    prevPage,
    goToPage,
    changeItemsPerPage,
    fetchPokemonList,
  } = usePokemonList(itemsPerPage);

  const {
    pokemon: specificPokemon,
    loading: searchLoading,
    fetchPokemon: fetchSpecificPokemon,
  } = usePokemonDetail();

  const {
    types: pokemonTypes,
    loading: typesLoading,
    error: typesError,
  } = usePokemonTypes();

  const totalPages =
    selectedTypes.length > 0
      ? pagination.filteredTotalPages // Use filtered total pages when types are selected
      : pagination.totalPages; // Use total pages otherwise

  // Extract all unique types when pokemon data is loaded
  useEffect(() => {
    if (pokemonTypes) {
      setAllTypes(pokemonTypes); // Set available types once they are fetched
    }
  }, [pokemonTypes]);

  // Filter and fetch specific Pokémon when searchTerm or selectedTypes change
  // Modified handleSort to update sortConfig state
  const handleSort = (field, direction) => {
    if (!filteredPokemon || filteredPokemon.length === 0) return;

    let sortedPokemon = [...filteredPokemon];

    switch (field) {
      case "id":
        sortedPokemon.sort((a, b) => {
          return direction === "asc" ? a.id - b.id : b.id - a.id;
        });
        break;
      case "alphabetical":
        sortedPokemon.sort((a, b) => {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
        break;
      default:
        // Default sort by id ascending
        sortedPokemon.sort((a, b) => a.id - b.id);
    }

    setSortConfig({ field, direction });
    setFilteredPokemon(sortedPokemon); // Set sorted Pokémon list
  };

  // Modified useEffect to apply current sort when filters change
  useEffect(() => {
    let isCurrent = true; // flag to cancel outdated requests
    const filterAndFetch = async () => {
      // Only proceed if we have Pokémon data
      if (!pokemon || pokemon.length === 0) return;

      let results = pokemon;

      // Filter by search term
      if (searchTerm.trim() !== "") {
        results = results.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by types
      if (selectedTypes.length > 0) {
        if (searchTerm.trim() && results.length > 0) {
          setSectionLoading(true);
          results = results.filter((p) =>
            p.types.some((type) => selectedTypes.includes(type))
          );
        } else {
          setSectionLoading(true);
          results = await fetchPokemonList(selectedTypes); // Fetch filtered list by types
        }
      }

      // If no results, try to fetch specific Pokémon (only once)
      if (results.length === 0 && searchTerm?.trim().length > 3) {
        const fetched = await fetchSpecificPokemon(searchTerm.trim());
        if (
          fetched &&
          (selectedTypes.length === 0 ||
            fetched.types.some((type) => selectedTypes.includes(type)))
        ) {
          results = [fetched]; // Set fetched Pokémon if valid
        }
      }

      // Apply current sort configuration to the filtered results
      if (results.length > 0 && sortConfig.field) {
        switch (sortConfig.field) {
          case "id":
            results.sort((a, b) => {
              return sortConfig.direction === "asc" ? a.id - b.id : b.id - a.id;
            });
            break;
          case "alphabetical":
            results.sort((a, b) => {
              return sortConfig.direction === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            });
            break;
          default:
            break;
        }
      }

      if (isCurrent) {
        setFilteredPokemon(results);
        setSectionLoading(false);
      }
    };

    filterAndFetch();

    return () => {
      isCurrent = false; // cancel this fetch if a new one starts
    };

    // Add sortConfig to dependencies if you want sorting to trigger re-filtering
  }, [pokemon, searchTerm, selectedTypes, fetchSpecificPokemon]);

  // Function to handle search term input changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to toggle Pokémon types for filtering
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => {
      const newTypes = new Set(prev);
      newTypes.has(type) ? newTypes.delete(type) : newTypes.add(type);
      return [...newTypes]; // Toggle type in the selected types list
    });
  };

  const handleClearAll = () => {
    setSelectedTypes([]); // Clear all selected types
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setSectionLoading(true);
    setItemsPerPage(newValue); // Update items per page
    changeItemsPerPage(newValue);
  };

  // Function to handle page change with section loading
  const handlePageChange = (action, pageNum = null) => {
    setSectionLoading(true);
    if (action === "next") {
      nextPage(); // Go to next page
    } else if (action === "prev") {
      prevPage(); // Go to previous page
    } else if (action === "goto" && pageNum !== null) {
      goToPage(pageNum); // Go to specific page
    }
  };

  // Initial loading state: display full loading animation only on first load
  if ((loading && !sectionLoading) || filteredPokemon === null) {
    return <ListPageLoder />; // Show loader until data is ready
  }

  // Render the main content after loading is complete
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navbar with search functionality */}
      <Exports.components.navbar onSearch={handleSearch} />

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Filter component to select Pokémon types */}
        <FilterTypes
          types={allTypes}
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
          onClearAll={handleClearAll}
          onSort={handleSort}
        />

        {/* Content section that can show section loader */}
        <div className="min-h-[500px]">
          {searchLoading ? (
            // Loading state when searching for a specific Pokémon
            <SectionLoader
              message={`Searching for "${searchTerm}"...`}
              minHeight="h-[60vh]"
            />
          ) : sectionLoading ? (
            // Section-specific loader for pagination changes
            <SectionLoader />
          ) : filteredPokemon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredPokemon.map((poke) => (
                <Exports.components.pokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          ) : (
            <Exports.components.noResults searchTerm={searchTerm} />
          )}
        </div>

        {/* Bottom pagination controls for large result sets */}
        {filteredPokemon.length > 0 && (
          <PaginationControls
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            handlePageChange={handlePageChange}
            pagination={pagination}
            totalPages={totalPages}
            selectedTypes={selectedTypes}
            show={filteredPokemon.length > 0}
          />
        )}
      </div>

      {/* Footer with PokeAPI attribution */}
      <Footer />
    </div>
  );
};

export default ListPage;
