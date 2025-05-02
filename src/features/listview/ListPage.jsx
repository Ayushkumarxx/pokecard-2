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

const ListPage = () => {
  // State for filters and UI state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState(null); // Initialize as null instead of empty array

  // Add state for tracking sort configuration
const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sectionLoading, setSectionLoading] = useState(false);

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
      ? pagination.filteredTotalPages
      : pagination.totalPages;
  // Extract all unique types when pokemon data is loaded
  useEffect(() => {
    if (pokemonTypes) {
      setAllTypes(pokemonTypes);
    }
  }, [pokemonTypes]);

  // Filter and fetch specific Pokémon when searchTerm or selectedTypes change
// Modified handleSort to update sortConfig state
const handleSort = (field, direction) => {
  if (!filteredPokemon || filteredPokemon.length === 0) return;

  let sortedPokemon = [...filteredPokemon];

  switch (field) {
    case 'id':
      sortedPokemon.sort((a, b) => {
        return direction === 'asc' ? a.id - b.id : b.id - a.id;
      });
      break;
    case 'alphabetical':
      sortedPokemon.sort((a, b) => {
        return direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      });
      break;
    default:
      // Default sort by id ascending
      sortedPokemon.sort((a, b) => a.id - b.id);
  }

  setSortConfig({ field, direction });
  setFilteredPokemon(sortedPokemon);
};

// Modified useEffect to apply current sort when filters change
useEffect(() => {
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
      setSectionLoading(true);
      results = await fetchPokemonList(selectedTypes);
    }

    // If no results, try to fetch specific Pokémon (only once)
    if (results.length === 0 && searchTerm?.trim().length > 3) {
      const fetched = await fetchSpecificPokemon(searchTerm.trim());
      if (
        fetched &&
        (selectedTypes.length === 0 ||
          fetched.types.some((type) => selectedTypes.includes(type)))
      ) {
        results = [fetched];
      }
    }

    // Apply current sort configuration to the filtered results
    if (results.length > 0 && sortConfig.field) {
      switch (sortConfig.field) {
        case 'id':
          results.sort((a, b) => {
            return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
          });
          break;
        case 'alphabetical':
          results.sort((a, b) => {
            return sortConfig.direction === 'asc' 
              ? a.name.localeCompare(b.name) 
              : b.name.localeCompare(a.name);
          });
          break;
        default:
          break;
      }
    }

    setFilteredPokemon(results);
    setSectionLoading(false);
  };

  filterAndFetch();
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
      return [...newTypes];
    });
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
  };



  
  // Function to handle items per page change
  const handleItemsPerPageChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setSectionLoading(true);
    setItemsPerPage(newValue);
    changeItemsPerPage(newValue);
  };

  // Function to handle page change with section loading
  const handlePageChange = (action, pageNum = null) => {
    setSectionLoading(true);
    if (action === "next") {
      nextPage();
    } else if (action === "prev") {
      prevPage();
    } else if (action === "goto" && pageNum !== null) {
      goToPage(pageNum);
    }
  };

  // Initial loading state: display full loading animation only on first load
  if ((loading && !sectionLoading) || filteredPokemon === null) {
    return <ListPageLoder />;
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
        {filteredPokemon && filteredPokemon.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-[#1A1A1A] p-4 rounded-lg shadow-sm">
            {/* Items per page selector */}
            <div className="items-per-page-selector mb-4 sm:mb-0 ">
              <label className="text-gray-300 mr-2 font-bold">
                Items per page:
              </label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#2A2A2A] text-white border border-[#3B4CCA] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFCB05] font-bold"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 bg-[#3B4CCA] text-white rounded-md disabled:opacity-50 hover:bg-[#2A3CAA] transition-colors shadow-md flex items-center font-bold gap-2 cursor-pointer"
              >
                <FaArrowLeft />
                Prev
              </button>

              {/* Show page numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate which page numbers to show
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange("goto", pageNum)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors shadow-md  font-semibold cursor-pointer ${
                        pagination.currentPage === pageNum
                          ? "bg-[#FFCB05] text-black font-bold"
                          : "bg-[#333] text-white hover:bg-[#444]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange("next")}
                disabled={pagination.currentPage === totalPages}
                className="px-3 py-1 bg-[#3B4CCA] text-white rounded-md disabled:opacity-50 hover:bg-[#2A3CAA] transition-colors shadow-md flex items-center font-semibold gap-2 cursor-pointer"
              >
                Next
                <FaArrowRight />
              </button>
            </div>

            {/* Page info */}
            <div className="text-gray-300 mt-4 sm:mt-0 hidden sm:block font-bold">
              Page {pagination.currentPage} of{" "}
              {selectedTypes.length > 0
                ? pagination.filteredTotalPages
                : pagination.totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Footer with PokeAPI attribution */}
      <Footer />
    </div>
  );
};

export default ListPage;
