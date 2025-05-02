import React, { useState, useCallback } from "react";
import usePokemonDetail from "../../shared/hooks/usePokemonDetail";
import Button from "./components/Button";
import BackButton from "./components/BackButton";
import StatBar from "./components/StatBar";
import TypeBadge from "./components/TypeBadge";

// Reusable Card Component
const Card = ({ children, gradient, className = "" }) => (
  <div
    className={`bg-gradient-to-br rounded-2xl p-4 shadow-lg border border-gray-700 ${className}`}
    style={{ background: gradient }}
  >
    {children}
  </div>
);

const ComparePokemons = () => {
  // State for search inputs
  const [leftSearchInput, setLeftSearchInput] = useState("");
  const [rightSearchInput, setRightSearchInput] = useState("");

  // Using our provided hook for each Pokémon
  const {
    pokemon: leftPokemon,
    loading: leftLoading,
    error: leftError,
    fetchPokemon: fetchLeftPokemon
  } = usePokemonDetail();

  const {
    pokemon: rightPokemon,
    loading: rightLoading,
    error: rightError,
    fetchPokemon: fetchRightPokemon
  } = usePokemonDetail();

  // Function to handle Pokémon searches
  const handleSearch = useCallback((e, input, fetchFn) => {
    e.preventDefault();
    if (input.trim()) {
      fetchFn(input.trim().toLowerCase());
    }
  }, []);

  // Function to get random Pokémon (ID between 1 and 898)
  const getRandomPokemon = useCallback(() => Math.floor(Math.random() * 898) + 1, []);

  // Function to fetch random Pokémon
  const handleRandom = useCallback((setInput, fetchFn) => {
    const randomId = getRandomPokemon();
    setInput(randomId.toString());
    fetchFn(randomId);
  }, [getRandomPokemon]);

  // Helper function to determine stat color based on comparison
  const getStatColor = useCallback((stat1, stat2) => {
    if (!stat1 || !stat2) return "bg-gray-600";
    if (stat1 > stat2) return "bg-green-500";
    if (stat1 < stat2) return "bg-red-500";
    return "bg-yellow-400";
  }, []);

  // Navigation function
  const handleBack = useCallback(() => window.history.back(), []);

  // Reusable SearchBox component
  const SearchBox = ({ searchInput, setSearchInput, side }) => (
    <Card
      gradient={side === "left" ? "from-blue-900 to-blue-700" : "from-red-900 to-red-700"}
      className="mb-4"
    >
      <form onSubmit={(e) => handleSearch(e, searchInput, side === "left" ? fetchLeftPokemon : fetchRightPokemon)} className="flex mb-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter Pokémon name or ID..."
          className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
        />
        <Button
          disabled={side === "left" ? leftLoading : rightLoading}
          className={`${side === "left" ? "bg-blue-400 hover:bg-blue-500" : "bg-red-400 hover:bg-red-500"} text-white rounded-l-none rounded-r-lg`}
        >
          {(side === "left" ? leftLoading : rightLoading) ? "..." : "Search"}
        </Button>
      </form>
      <Button
        onClick={() => handleRandom(setSearchInput, side === "left" ? fetchLeftPokemon : fetchRightPokemon)}
        disabled={side === "left" ? leftLoading : rightLoading}
        className={`w-full ${side === "left" ? "bg-blue-400 hover:bg-blue-500" : "bg-red-400 hover:bg-red-500"} text-white`}
      >
        Random
      </Button>
      {(side === "left" ? leftError : rightError) && (
        <p className="text-yellow-300 mt-2 text-xs">{side === "left" ? leftError : rightError}</p>
      )}
    </Card>
  );

  // PokemonCard component
  const PokemonCard = ({ pokemon, loading, side }) => {
    const cardGradient = side === "left"
      ? `radial-gradient(circle, #1e3a8a30, #1e3a8a10)`
      : `radial-gradient(circle, #b91c1c30, #b91c1c10)`;

    if (loading) {
      return (
        <Card gradient={cardGradient} className="animate-pulse min-h-[280px]">
          <div className="h-32 bg-gray-700 rounded-xl mb-3"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </Card>
      );
    }

    if (!pokemon) {
      return (
        <Card gradient={cardGradient} className="flex flex-col items-center justify-center min-h-[280px] border-2 border-gray-700">
          <div className="text-white text-center">
            <p className="text-lg font-bold mb-2">No Pokémon Selected</p>
            <p className="text-xs opacity-80">Search by name or ID</p>
          </div>
        </Card>
      );
    }

    return (
      <Card gradient={cardGradient}>
        <div className="relative flex justify-center">
          <div className={`absolute inset-0 ${side === "left" ? "bg-blue-500" : "bg-red-500"} rounded-full filter blur-xl opacity-30 transform scale-75`}></div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-32 sm:h-36 object-contain relative z-10 drop-shadow-xl"
          />
        </div>

        <div className="text-center mb-2 mt-2">
          <h2 className="text-lg sm:text-xl font-bold text-white capitalize">{pokemon.name}</h2>
          <p className={`text-sm ${side === "left" ? "text-blue-300" : "text-red-300"} font-mono`}>
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div className="flex justify-center gap-1">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </Card>
    );
  };

  // Simplified stat comparison renderer
  const renderStats = () => {
    if (!leftPokemon || !rightPokemon) return null;
    
    const stats = [
      { name: "HP", left: leftPokemon.stats.hp, right: rightPokemon.stats.hp },
      { name: "ATK", left: leftPokemon.stats.attack, right: rightPokemon.stats.attack },
      { name: "DEF", left: leftPokemon.stats.defense, right: rightPokemon.stats.defense },
      { name: "SP.ATK", left: leftPokemon.stats.specialAttack, right: rightPokemon.stats.specialAttack },
      { name: "SP.DEF", left: leftPokemon.stats.specialDefense, right: rightPokemon.stats.specialDefense },
      { name: "SPD", left: leftPokemon.stats.speed, right: rightPokemon.stats.speed }
    ];
    
    // Calculate totals
    const leftTotal = stats.reduce((sum, stat) => sum + stat.left, 0);
    const rightTotal = stats.reduce((sum, stat) => sum + stat.right, 0);
    
    return (
      <>
        {stats.map((stat) => (
          <div key={stat.name} className="grid grid-cols-11 gap-1 mb-2 items-center">
            <div className="col-span-5  max-md:col-span-3 flex items-center justify-end">
              <span className="text-xs sm:text-sm font-bold text-white mr-2">{stat.left}</span>
              <StatBar 
                value={stat.left} 
                maxValue={255} 
                color={getStatColor(stat.left, stat.right)} 
              />
            </div>
            <div className="col-span-1 max-md:col-span-5 text-center text-xs font-bold text-white">{stat.name}</div>
            <div className="col-span-5 max-md:col-span-3 flex items-center justify-end">
              <StatBar 
                value={stat.right} 
                maxValue={255} 
                color={getStatColor(stat.right, stat.left)} 
              />
                <span className="text-xs sm:text-sm font-bold text-white ml-2">{stat.right}</span>
              
            </div>
            
          </div>
        ))}
        
        {/* Total stats */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="grid grid-cols-11 gap-1 items-center">
            <div className="col-span-5 max-md:col-span-3 flex items-center justify-end">
              <span className="text-xs sm:text-sm font-bold text-white mr-2">{leftTotal}</span>
              <StatBar 
                value={leftTotal} 
                maxValue={720} 
                color={getStatColor(leftTotal, rightTotal)} 
              />
            </div>
            <div className="col-span-1 max-md:col-span-5 text-center text-xs font-bold text-white">TOTAL</div>
            <div className="col-span-5 max-md:col-span-3 flex items-center justify-end">
              <StatBar 
                value={rightTotal} 
                maxValue={720} 
                color={getStatColor(rightTotal, leftTotal)} 
              />
               <span className="text-xs sm:text-sm font-bold text-white ml-2">{rightTotal}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-5xl mx-auto px-3 py-6">
        {/* Back Button */}
        <BackButton onClick={handleBack} />
        
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Your Favorite Pokémon</h1>
        <div className="h-1 w-24 mb-6 rounded-full bg-white"></div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 mb-6">
          {/* Left column */}
          <div className="sm:col-span-3">
            <SearchBox
              searchInput={leftSearchInput}
              setSearchInput={setLeftSearchInput}
              side="left"
            />
            <PokemonCard
              pokemon={leftPokemon}
              loading={leftLoading}
              side="left"
            />
          </div>

          {/* VS section */}
          <div className="sm:col-span-1 flex items-center justify-center my-2 sm:my-0">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-800 flex items-center justify-center text-lg sm:text-xl font-black  border-2 border-gray-800">
                VS
              </div>
       
            </div>
          </div>

          {/* Right column */}
          <div className="sm:col-span-3">
            <SearchBox
              searchInput={rightSearchInput}
              setSearchInput={setRightSearchInput}
              side="right"
            />
            <PokemonCard
              pokemon={rightPokemon}
              loading={rightLoading}
              side="right"
            />
          </div>
        </div>

        {/* Stats comparison section */}
        {leftPokemon && rightPokemon && (
          <Card gradient="from-gray-900 to-gray-950" className="mt-6 p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-white">
              Stats Comparison
            </h2>

            <div className="grid grid-cols-11 gap-1 mb-4 items-center">
              <div className="col-span-5 text-right pr-1">
                <h3 className="font-bold text-sm sm:text-base capitalize text-blue-400">
                  {leftPokemon.name}
                </h3>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 pl-1">
                <h3 className="font-bold text-sm sm:text-base capitalize text-red-400">
                  {rightPokemon.name}
                </h3>
              </div>
            </div>

            {renderStats()}
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComparePokemons;