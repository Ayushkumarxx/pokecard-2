import React, { useState, useEffect } from 'react';
import usePokemonDetail from '../../shared/hooks/usePokemonDetail';

const ComparePokemons = () => {
  // State for search inputs
  const [leftSearchInput, setLeftSearchInput] = useState('');
  const [rightSearchInput, setRightSearchInput] = useState('');
  
  // Using our provided hook twice - once for each Pokémon
  const {
    pokemon: leftPokemon,
    loading: leftLoading,
    error: leftError,
    fetchPokemon: fetchLeftPokemon,
    clearPokemon: clearLeftPokemon
  } = usePokemonDetail();
  
  const {
    pokemon: rightPokemon,
    loading: rightLoading,
    error: rightError,
    fetchPokemon: fetchRightPokemon,
    clearPokemon: clearRightPokemon
  } = usePokemonDetail();

  // Function to handle left Pokémon search
  const handleLeftSearch = (e) => {
    e.preventDefault();
    if (leftSearchInput.trim()) {
      fetchLeftPokemon(leftSearchInput);
    }
  };

  // Function to handle right Pokémon search
  const handleRightSearch = (e) => {
    e.preventDefault();
    if (rightSearchInput.trim()) {
      fetchRightPokemon(rightSearchInput);
    }
  };

  // Function to get random Pokémon (ID between 1 and 898)
  const getRandomPokemon = () => {
    return Math.floor(Math.random() * 898) + 1;
  };

  // Function to fetch random Pokémon for left side
  const handleRandomLeft = () => {
    const randomId = getRandomPokemon();
    setLeftSearchInput(randomId.toString());
    fetchLeftPokemon(randomId);
  };

  // Function to fetch random Pokémon for right side
  const handleRandomRight = () => {
    const randomId = getRandomPokemon();
    setRightSearchInput(randomId.toString());
    fetchRightPokemon(randomId);
  };

  // Helper function to determine stat color based on comparison
  const getStatColor = (stat1, stat2) => {
    if (!stat1 || !stat2) return 'bg-gray-600';
    if (stat1 > stat2) return 'bg-green-500';
    if (stat1 < stat2) return 'bg-red-500';
    return 'bg-yellow-400';
  };

  // Function to render stat bars with comparison highlighting
  const renderStatBars = (statName, leftStat, rightStat, maxStat = 255) => {
    const leftPercentage = Math.min(100, (leftStat / maxStat) * 100);
    const rightPercentage = Math.min(100, (rightStat / maxStat) * 100);
    
    const leftColor = getStatColor(leftStat, rightStat);
    const rightColor = getStatColor(rightStat, leftStat);
    
    return (
      <div className="grid grid-cols-2 gap-4 mb-2 items-center">
        <div className="flex flex-col items-end">
          <div className="flex items-center w-full justify-end">
            <span className="text-sm font-medium text-white mr-2">{leftStat}</span>
            <div className="w-full max-w-[180px] bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${leftColor}`}
                style={{ width: `${leftPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="text-center font-medium text-gray-300 mx-2">{statName}</div>
        
        <div className="flex flex-col">
          <div className="flex items-center w-full">
            <div className="w-full max-w-[180px] bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${rightColor}`}
                style={{ width: `${rightPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-white ml-2">{rightStat}</span>
          </div>
        </div>
      </div>
    );
  };

  // Component to render type badges
  const TypeBadge = ({ type }) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-600',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-800',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
      '???': 'bg-gray-400'
    };

    return (
      <span className={`${typeColors[type] || 'bg-gray-400'} text-white text-xs font-medium px-2.5 py-0.5 rounded-full mr-1`}>
        {type}
      </span>
    );
  };

  // Component for search box (reusable)
  const SearchBox = ({ 
    searchInput, 
    setSearchInput, 
    handleSearch, 
    handleRandom, 
    loading, 
    error, 
    placeholderText 
  }) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <form onSubmit={handleSearch} className="flex mb-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholderText}
          className="flex-grow p-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-800"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <button
        onClick={handleRandom}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-800"
      >
        Random Pokémon
      </button>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </div>
  );

  // Component for Pokémon card (reusable)
  const PokemonCard = ({ pokemon, loading }) => {
    if (loading) {
      return (
        <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      );
    }

    if (!pokemon) {
      return (
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="text-gray-400 text-center">
            <p className="text-xl mb-2">No Pokémon Selected</p>
            <p className="text-sm">Search by name or ID to compare</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="relative">
          {/* Badge for legendary/mythical status */}
          {(pokemon.species.isLegendary || pokemon.species.isMythical) && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-bold text-black px-2 py-1 rounded-bl-lg rounded-tr-lg">
              {pokemon.species.isLegendary ? 'LEGENDARY' : 'MYTHICAL'}
            </div>
          )}
          
          {/* Pokémon image */}
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-48 object-contain mb-4"
          />
        </div>
        
        {/* Pokémon name and number */}
        <h2 className="text-2xl font-bold text-white capitalize mb-1">
          {pokemon.name}
        </h2>
        <p className="text-gray-400 mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>
        
        {/* Type badges */}
        <div className="mb-4">
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
        
        {/* Species info */}
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold">Species:</span> {pokemon.species.genus}
        </p>
        
        {/* Physical attributes */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-700 rounded p-2 text-center">
            <p className="text-xs text-gray-400">Height</p>
            <p className="text-white">{pokemon.height}m</p>
          </div>
          <div className="bg-gray-700 rounded p-2 text-center">
            <p className="text-xs text-gray-400">Weight</p>
            <p className="text-white">{pokemon.weight}kg</p>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-3">
          {pokemon.species.flavorText}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Pokémon Comparison</h1>
        <div className="h-1 w-32 mb-8 rounded-full bg-red-500"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <SearchBox
              searchInput={leftSearchInput}
              setSearchInput={setLeftSearchInput}
              handleSearch={handleLeftSearch}
              handleRandom={handleRandomLeft}
              loading={leftLoading}
              error={leftError}
              placeholderText="Search Pokémon by name or ID..."
            />
            <PokemonCard pokemon={leftPokemon} loading={leftLoading} />
          </div>
          
          {/* Middle VS section (only visible on mobile) */}
          <div className="lg:hidden flex items-center justify-center my-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-xl font-bold">VS</div>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            <SearchBox
              searchInput={rightSearchInput}
              setSearchInput={setRightSearchInput}
              handleSearch={handleRightSearch}
              handleRandom={handleRandomRight}
              loading={rightLoading}
              error={rightError}
              placeholderText="Search Pokémon by name or ID..."
            />
            <PokemonCard pokemon={rightPokemon} loading={rightLoading} />
          </div>
        </div>
        
        {/* VS section (for desktop) */}
        <div className="hidden lg:flex justify-center my-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl font-bold shadow-lg">VS</div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-red-600 to-red-800 -z-10 blur-sm"></div>
          </div>
        </div>
        
        {/* Stats comparison section */}
        {leftPokemon && rightPokemon && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Stats Comparison</h2>
            
            {renderStatBars('HP', leftPokemon.stats.hp, rightPokemon.stats.hp)}
            {renderStatBars('Attack', leftPokemon.stats.attack, rightPokemon.stats.attack)}
            {renderStatBars('Defense', leftPokemon.stats.defense, rightPokemon.stats.defense)}
            {renderStatBars('Sp. Attack', leftPokemon.stats.specialAttack, rightPokemon.stats.specialAttack)}
            {renderStatBars('Sp. Defense', leftPokemon.stats.specialDefense, rightPokemon.stats.specialDefense)}
            {renderStatBars('Speed', leftPokemon.stats.speed, rightPokemon.stats.speed)}
            
            {/* Total stats comparison */}
            <div className="mt-4 border-t border-gray-700 pt-4">
              {renderStatBars('Total', 
                leftPokemon.stats.hp + leftPokemon.stats.attack + leftPokemon.stats.defense + 
                leftPokemon.stats.specialAttack + leftPokemon.stats.specialDefense + leftPokemon.stats.speed,
                rightPokemon.stats.hp + rightPokemon.stats.attack + rightPokemon.stats.defense + 
                rightPokemon.stats.specialAttack + rightPokemon.stats.specialDefense + rightPokemon.stats.speed,
                720 // Max possible total stats
              )}
            </div>
          </div>
        )}
        
        {/* Additional comparison sections */}
        {leftPokemon && rightPokemon && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Abilities comparison */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Abilities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-center text-lg font-medium mb-2 capitalize">{leftPokemon.name}</h3>
                  <ul className="space-y-2">
                    {leftPokemon.abilities.map(ability => (
                      <li key={ability.name} className="bg-gray-700 p-2 rounded capitalize">
                        {ability.name} {ability.isHidden && <span className="text-xs bg-blue-500 rounded px-1">Hidden</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-center text-lg font-medium mb-2 capitalize">{rightPokemon.name}</h3>
                  <ul className="space-y-2">
                    {rightPokemon.abilities.map(ability => (
                      <li key={ability.name} className="bg-gray-700 p-2 rounded capitalize">
                        {ability.name} {ability.isHidden && <span className="text-xs bg-blue-500 rounded px-1">Hidden</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Additional info comparison */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Breeding & Capture</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-center text-lg font-medium mb-2 capitalize">{leftPokemon.name}</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-sm font-medium">Egg Groups:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {leftPokemon.species.eggGroups.map(group => (
                          <span key={group} className="bg-blue-600 text-xs rounded px-2 py-1 capitalize">{group}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-sm font-medium">Catch Rate:</span>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(leftPokemon.species.captureRate / 255) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{leftPokemon.species.captureRate}/255</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-center text-lg font-medium mb-2 capitalize">{rightPokemon.name}</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-sm font-medium">Egg Groups:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {rightPokemon.species.eggGroups.map(group => (
                          <span key={group} className="bg-blue-600 text-xs rounded px-2 py-1 capitalize">{group}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-sm font-medium">Catch Rate:</span>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(rightPokemon.species.captureRate / 255) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{rightPokemon.species.captureRate}/255</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePokemons;