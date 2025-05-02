import React, { useState, useCallback } from "react";
import usePokemonDetail from "../../shared/hooks/usePokemonDetail";
import Button from "./components/Button";
import BackButton from "./components/BackButton";
import StatBar from "./components/StatBar";
import TypeBadge from "./components/TypeBadge";
// Reusable Card Component
const Card = ({ children, gradient, className }) => (
  <div
    className={`bg-gradient-to-br rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 ${className}`}
    style={{ background: gradient }}
  >
    {children}
  </div>
);

// Reusable Type Badge Component

const ComparePokemons = () => {
  // State for search inputs
  const [leftSearchInput, setLeftSearchInput] = useState("");
  const [rightSearchInput, setRightSearchInput] = useState("");

  // Using our provided hook for each Pokémon
  const {
    pokemon: leftPokemon,
    loading: leftLoading,
    error: leftError,
    fetchPokemon: fetchLeftPokemon,
    clearPokemon: clearLeftPokemon,
  } = usePokemonDetail();

  const {
    pokemon: rightPokemon,
    loading: rightLoading,
    error: rightError,
    fetchPokemon: fetchRightPokemon,
    clearPokemon: clearRightPokemon,
  } = usePokemonDetail();

  // Function to handle left Pokémon search
  const handleLeftSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (leftSearchInput.trim()) {
        fetchLeftPokemon(leftSearchInput.trim().toLowerCase());
      }
    },
    [leftSearchInput, fetchLeftPokemon]
  );

  // Function to handle right Pokémon search
  const handleRightSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (rightSearchInput.trim()) {
        fetchRightPokemon(rightSearchInput.trim().toLowerCase());
      }
    },
    [rightSearchInput, fetchRightPokemon]
  );

  // Function to get random Pokémon (ID between 1 and 898)
  const getRandomPokemon = useCallback(() => {
    return Math.floor(Math.random() * 898) + 1;
  }, []);

  // Function to fetch random Pokémon for left side
  const handleRandomLeft = useCallback(() => {
    const randomId = getRandomPokemon();
    setLeftSearchInput(randomId.toString());
    fetchLeftPokemon(randomId);
  }, [getRandomPokemon, fetchLeftPokemon]);

  // Function to fetch random Pokémon for right side
  const handleRandomRight = useCallback(() => {
    const randomId = getRandomPokemon();
    setRightSearchInput(randomId.toString());
    fetchRightPokemon(randomId);
  }, [getRandomPokemon, fetchRightPokemon]);

  // Helper function to determine stat color based on comparison
  const getStatColor = useCallback((stat1, stat2) => {
    if (!stat1 || !stat2) return "bg-gray-600";
    if (stat1 > stat2) return "bg-green-500";
    if (stat1 < stat2) return "bg-red-500";
    return "bg-yellow-400";
  }, []);

  // Navigation function
  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  // Function to render stat bars with comparison highlighting
  const renderStatBars = useCallback(
    (statName, leftStat, rightStat, maxStat = 255) => {
      const leftColor = getStatColor(leftStat, rightStat);
      const rightColor = getStatColor(rightStat, leftStat);

      return (
        <div className="grid grid-cols-11 gap-2 mb-3 items-center">
          <div className="col-span-5">
            <div className="flex items-center w-full justify-end">
              <span className="text-sm font-bold text-white mr-2">
                {leftStat}
              </span>
              <StatBar value={leftStat} maxValue={maxStat} color={leftColor} />
            </div>
          </div>

          <div className="col-span-1 text-center text-xs md:text-sm font-bold text-white">
            {statName}
          </div>

          <div className="col-span-5">
            <StatBar value={rightStat} maxValue={maxStat} color={rightColor} />
          </div>
        </div>
      );
    },
    [getStatColor]
  );

  // Reusable SearchBox component
  const SearchBox = useCallback(
    ({
      searchInput,
      setSearchInput,
      handleSearch,
      handleRandom,
      loading,
      error,
      side,
    }) => (
      <Card
        gradient={
          side === "left"
            ? "from-blue-900 to-blue-700"
            : "from-red-900 to-red-700"
        }
        className="mb-4"
      >
        <form onSubmit={handleSearch} className="flex mb-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Pokémon name or ID..."
            className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-blue-500 text-sm md:text-base"
          />
          <Button
            disabled={loading}
            className={`${
              side === "left"
                ? "bg-blue-400 hover:bg-blue-500"
                : "bg-red-400 hover:bg-red-500"
            } text-white rounded-l-none rounded-r-lg`}
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </form>
        <Button
          onClick={handleRandom}
          disabled={loading}
          className={`w-full ${
            side === "left"
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-red-400 hover:bg-red-500"
          } text-white`}
        >
          Random
        </Button>
        {error && (
          <p className="text-yellow-300 mt-2 text-xs md:text-sm">{error}</p>
        )}
      </Card>
    ),
    []
  );

  // PokemonCard component
  const PokemonCard = useCallback(({ pokemon, loading, side }) => {
    const cardGradient =
      side === "left"
        ? `radial-gradient(circle, #1e3a8a30, #1e3a8a10)` // Blue shade for dark theme
        : `radial-gradient(circle, #b91c1c30, #b91c1c10)`; // Red shade for dark theme

    if (loading) {
      return (
        <Card gradient={cardGradient} className="animate-pulse min-h-[300px]">
          <div className="h-36 bg-gray-700 rounded-xl mb-3"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </Card>
      );
    }

    if (!pokemon) {
      return (
        <Card
          gradient={cardGradient}
          className="flex flex-col items-center justify-center min-h-[300px] border-2 border-gray-700"
        >
          <div className="text-white text-center">
            <p className="text-xl font-bold mb-2">No Pokémon Selected</p>
            <p className="text-xs md:text-sm opacity-80">
              Search by name or ID
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card gradient={cardGradient}>
        <div className="relative">
          {/* Pokémon image with glow effect */}
          <div className="relative flex justify-center">
            <div
              className={`absolute inset-0 ${
                side === "left" ? "bg-blue-500" : "bg-red-500"
              } rounded-full filter blur-xl opacity-30 transform scale-75`}
            ></div>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full h-40 md:h-48 object-contain relative z-10 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Pokémon name and number */}
        <div className="text-center mb-3 mt-2">
          <h2 className="text-xl md:text-2xl font-bold text-white capitalize">
            {pokemon.name}
          </h2>
          <p
            className={`text-sm md:text-base ${
              side === "left" ? "text-blue-300" : "text-red-300"
            } font-mono`}
          >
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        {/* Type badges */}
        <div className="flex justify-center mb-2 gap-1">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </Card>
    );
  }, []);

  // AbilityItem component
  const AbilityItem = useCallback(
    ({ name, isHidden, side }) => (
      <div
        className={`bg-${
          side === "left" ? "blue" : "red"
        }-900 bg-opacity-30 p-2 rounded-lg capitalize text-sm md:text-base font-medium flex justify-between items-center`}
      >
        {name}
        {isHidden && (
          <span
            className={`text-xs bg-${
              side === "left" ? "blue" : "red"
            }-600 rounded-full px-2 py-0.5 font-bold`}
          >
            Hidden
          </span>
        )}
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white relative ">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Back Button */}
        <BackButton onClick={handleBack} />
        {/* Header */}

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Your Favorite Pokémon
        </h1>
        <div className="h-[4px] w-32 mb-8 rounded-full bg-white"></div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6 mb-6">
          {/* Left column */}
          <div className="md:col-span-3">
            <SearchBox
              searchInput={leftSearchInput}
              setSearchInput={setLeftSearchInput}
              handleSearch={handleLeftSearch}
              handleRandom={handleRandomLeft}
              loading={leftLoading}
              error={leftError}
              side="left"
            />
            <PokemonCard
              pokemon={leftPokemon}
              loading={leftLoading}
              side="left"
            />
          </div>

          {/* VS section (always visible) */}
          <div className="md:col-span-1 flex items-center justify-center my-2 md:my-0">
            <div className="relative">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-indigo-800 flex items-center justify-center text-xl md:text-2xl font-black shadow-xl border-4 border-gray-800">
                VS
              </div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-600 to-red-600 -z-10 blur-lg opacity-70 animate-pulse"></div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-3">
            <SearchBox
              searchInput={rightSearchInput}
              setSearchInput={setRightSearchInput}
              handleSearch={handleRightSearch}
              handleRandom={handleRandomRight}
              loading={rightLoading}
              error={rightError}
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
          <Card
            gradient="from-gray-800 to-gray-900"
            className="mt-8 p-4 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
              Stats Comparison
            </h2>

            <div className="grid grid-cols-11 gap-2 mb-6 items-center">
              <div className="col-span-5 text-right pr-2">
                <h3 className="font-bold text-base md:text-xl capitalize text-blue-400">
                  {leftPokemon.name}
                </h3>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 pl-2">
                <h3 className="font-bold text-base md:text-xl capitalize text-red-400">
                  {rightPokemon.name}
                </h3>
              </div>
            </div>

            {renderStatBars("HP", leftPokemon.stats.hp, rightPokemon.stats.hp)}
            {renderStatBars(
              "ATK",
              leftPokemon.stats.attack,
              rightPokemon.stats.attack
            )}
            {renderStatBars(
              "DEF",
              leftPokemon.stats.defense,
              rightPokemon.stats.defense
            )}
            {renderStatBars(
              "SP.ATK",
              leftPokemon.stats.specialAttack,
              rightPokemon.stats.specialAttack
            )}
            {renderStatBars(
              "SP.DEF",
              leftPokemon.stats.specialDefense,
              rightPokemon.stats.specialDefense
            )}
            {renderStatBars(
              "SPD",
              leftPokemon.stats.speed,
              rightPokemon.stats.speed
            )}

            {/* Total stats comparison */}
            <div className="mt-4 md:mt-6 border-t-2 border-gray-700 pt-4">
              {renderStatBars(
                "TOTAL",
                leftPokemon.stats.hp +
                  leftPokemon.stats.attack +
                  leftPokemon.stats.defense +
                  leftPokemon.stats.specialAttack +
                  leftPokemon.stats.specialDefense +
                  leftPokemon.stats.speed,
                rightPokemon.stats.hp +
                  rightPokemon.stats.attack +
                  rightPokemon.stats.defense +
                  rightPokemon.stats.specialAttack +
                  rightPokemon.stats.specialDefense +
                  rightPokemon.stats.speed,
                720 // Max possible total stats
              )}
            </div>
          </Card>
        )}

       
      </div>
    </div>
  );
};

export default ComparePokemons;
