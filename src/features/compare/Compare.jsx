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
      fetchLeftPokemon(leftSearchInput.trim());
    }
  };

  // Function to handle right Pokémon search
  const handleRightSearch = (e) => {
    e.preventDefault();
    if (rightSearchInput.trim()) {
      fetchRightPokemon(rightSearchInput.trim());
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

  // Component to render type badges
  const TypeBadge = ({ type }) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200 text-gray-800',
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
      fairy: 'bg-pink-300 text-gray-800',
      '???': 'bg-gray-400'
    };

    return (
      <span className={`${typeColors[type] || 'bg-gray-400'} text-white text-xs font-bold px-3 py-1 rounded-full mr-1 uppercase shadow-md`}>
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
    placeholderText,
    side
  }) => (
    <div className={`bg-gradient-to-br ${side === 'left' ? 'from-blue-900 to-blue-700' : 'from-red-900 to-red-700'} rounded-2xl p-5 mb-4 shadow-xl`}>
      <form onSubmit={handleSearch} className="flex mb-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholderText}
          className="flex-grow p-3 rounded-l-lg bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-blue-500 font-medium"
        />
        <button
          type="submit"
          disabled={loading}
          className={`${side === 'left' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white py-3 px-6 rounded-r-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 ${side === 'left' ? 'focus:ring-blue-600' : 'focus:ring-red-600'} disabled:opacity-70 transition-colors duration-200`}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <button
        onClick={handleRandom}
        disabled={loading}
        className={`w-full ${side === 'left' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-pink-600 hover:bg-pink-700'} text-white py-3 px-4 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 ${side === 'left' ? 'focus:ring-indigo-600' : 'focus:ring-pink-600'} disabled:opacity-70 shadow-md transition-colors duration-200`}
      >
        Random Pokémon
      </button>
      {error && <p className="text-yellow-300 mt-2 text-sm font-medium">{error}</p>}
    </div>
  );

  // Function to render stat bars with comparison highlighting
  const renderStatBars = (statName, leftStat, rightStat, maxStat = 255) => {
    const leftPercentage = Math.min(100, (leftStat / maxStat) * 100);
    const rightPercentage = Math.min(100, (rightStat / maxStat) * 100);
    
    const leftColor = getStatColor(leftStat, rightStat);
    const rightColor = getStatColor(rightStat, leftStat);
    
    return (
      <div className="grid grid-cols-11 gap-2 mb-3 items-center">
        <div className="col-span-5">
          <div className="flex items-center w-full justify-end">
            <span className="text-sm font-bold text-white mr-2">{leftStat}</span>
            <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden shadow-inner">
              <div
                className={`h-5 rounded-full ${leftColor} transition-all duration-500`}
                style={{ width: `${leftPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 text-center font-bold text-white">{statName}</div>
        
        <div className="col-span-5">
          <div className="flex items-center w-full">
            <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden shadow-inner">
              <div
                className={`h-5 rounded-full ${rightColor} transition-all duration-500`}
                style={{ width: `${rightPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-white ml-2">{rightStat}</span>
          </div>
        </div>
      </div>
    );
  };

  // Component for Pokémon card (reusable)
  const PokemonCard = ({ pokemon, loading, side }) => {
    const cardGradient = side === 'left' 
      ? 'from-blue-800 to-blue-900' 
      : 'from-red-800 to-red-900';
    
    if (loading) {
      return (
        <div className={`bg-gradient-to-br ${cardGradient} rounded-2xl p-6 animate-pulse shadow-xl`}>
          <div className="h-48 bg-gray-700 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      );
    }

    if (!pokemon) {
      return (
        <div className={`bg-gradient-to-br ${cardGradient} rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] shadow-xl border-2 border-gray-700`}>
          <div className="text-white text-center">
            <p className="text-2xl font-bold mb-3">No Pokémon Selected</p>
            <p className="text-sm opacity-80">Search by name or ID to compare</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-gradient-to-br ${cardGradient} rounded-2xl p-6 shadow-xl border border-gray-700`}>
        <div className="relative">
          {/* Badge for legendary/mythical status */}
          {(pokemon.species.isLegendary || pokemon.species.isMythical) && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-sm font-bold text-black px-3 py-1 rounded-full shadow-md transform rotate-3">
              {pokemon.species.isLegendary ? 'LEGENDARY' : 'MYTHICAL'}
            </div>
          )}
          
          {/* Pokémon image with glow effect */}
          <div className="relative flex justify-center">
            <div className={`absolute inset-0 ${side === 'left' ? 'bg-blue-500' : 'bg-red-500'} rounded-full filter blur-xl opacity-30 transform scale-75`}></div>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full h-56 object-contain relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        {/* Pokémon name and number */}
        <div className="text-center mb-4 mt-2">
          <h2 className="text-2xl font-bold text-white capitalize">
            {pokemon.name}
          </h2>
          <p className={`text-lg ${side === 'left' ? 'text-blue-300' : 'text-red-300'} font-mono`}>
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
        </div>
        
        {/* Type badges */}
        <div className="flex justify-center mb-4 gap-2">
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
        
        {/* Species info */}
        <p className="text-sm text-center text-gray-300 mb-3">
          <span className="font-semibold">Species:</span> {pokemon.species.genus}
        </p>
        
        {/* Physical attributes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 text-center backdrop-filter backdrop-blur-sm">
            <p className="text-xs text-gray-400 uppercase font-semibold">Height</p>
            <p className="text-white font-bold">{pokemon.height}m</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 text-center backdrop-filter backdrop-blur-sm">
            <p className="text-xs text-gray-400 uppercase font-semibold">Weight</p>
            <p className="text-white font-bold">{pokemon.weight}kg</p>
          </div>
        </div>
        
        {/* Description */}
        <div className="bg-gray-800 bg-opacity-40 rounded-xl p-3 backdrop-filter backdrop-blur-sm">
          <p className="text-sm text-gray-200 line-clamp-3">
            {pokemon.species.flavorText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-red-500">Pokémon Battle Analyzer</h1>
          <div className="h-1 w-48 rounded-full bg-gradient-to-r from-blue-500 to-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
          {/* Left column */}
          <div className="lg:col-span-3">
            <SearchBox
              searchInput={leftSearchInput}
              setSearchInput={setLeftSearchInput}
              handleSearch={handleLeftSearch}
              handleRandom={handleRandomLeft}
              loading={leftLoading}
              error={leftError}
              placeholderText="Enter Pokémon name or ID..."
              side="left"
            />
            <PokemonCard pokemon={leftPokemon} loading={leftLoading} side="left" />
          </div>
          
          {/* VS section (always visible) */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center text-2xl lg:text-3xl font-black shadow-xl border-4 border-gray-800">VS</div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-600 to-red-600 -z-10 blur-lg opacity-70 animate-pulse"></div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="lg:col-span-3">
            <SearchBox
              searchInput={rightSearchInput}
              setSearchInput={setRightSearchInput}
              handleSearch={handleRightSearch}
              handleRandom={handleRandomRight}
              loading={rightLoading}
              error={rightError}
              placeholderText="Enter Pokémon name or ID..."
              side="right"
            />
            <PokemonCard pokemon={rightPokemon} loading={rightLoading} side="right" />
          </div>
        </div>
        
        {/* Stats comparison section */}
        {leftPokemon && rightPokemon && (
          <div className="mt-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Stats Comparison</h2>
            
            <div className="grid grid-cols-11 gap-2 mb-6 items-center">
              <div className="col-span-5 text-right pr-2">
                <h3 className="font-bold text-xl capitalize text-blue-400">{leftPokemon.name}</h3>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 pl-2">
                <h3 className="font-bold text-xl capitalize text-red-400">{rightPokemon.name}</h3>
              </div>
            </div>
            
            {renderStatBars('HP', leftPokemon.stats.hp, rightPokemon.stats.hp)}
            {renderStatBars('ATK', leftPokemon.stats.attack, rightPokemon.stats.attack)}
            {renderStatBars('DEF', leftPokemon.stats.defense, rightPokemon.stats.defense)}
            {renderStatBars('SP.ATK', leftPokemon.stats.specialAttack, rightPokemon.stats.specialAttack)}
            {renderStatBars('SP.DEF', leftPokemon.stats.specialDefense, rightPokemon.stats.specialDefense)}
            {renderStatBars('SPD', leftPokemon.stats.speed, rightPokemon.stats.speed)}
            
            {/* Total stats comparison */}
            <div className="mt-6 border-t-2 border-gray-700 pt-4">
              {renderStatBars('TOTAL', 
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
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Abilities</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-blue-400">{leftPokemon.name}</h3>
                  <div className="space-y-3">
                    {leftPokemon.abilities.map(ability => (
                      <div key={ability.name} className="bg-blue-900 bg-opacity-30 p-3 rounded-xl capitalize font-medium flex justify-between items-center">
                        {ability.name}
                        {ability.isHidden && 
                          <span className="text-xs bg-blue-600 rounded-full px-2 py-1 font-bold">Hidden</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-red-400">{rightPokemon.name}</h3>
                  <div className="space-y-3">
                    {rightPokemon.abilities.map(ability => (
                      <div key={ability.name} className="bg-red-900 bg-opacity-30 p-3 rounded-xl capitalize font-medium flex justify-between items-center">
                        {ability.name}
                        {ability.isHidden && 
                          <span className="text-xs bg-red-600 rounded-full px-2 py-1 font-bold">Hidden</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional info comparison */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Breeding & Capture</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-blue-400">{leftPokemon.name}</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Egg Groups:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {leftPokemon.species.eggGroups.map(group => (
                          <span key={group} className="bg-blue-700 text-xs font-bold rounded-full px-3 py-1 capitalize">{group}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Catch Rate:</span>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${(leftPokemon.species.captureRate / 255) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-mono font-bold">{leftPokemon.species.captureRate}/255</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-red-400">{rightPokemon.name}</h3>
                  <div className="space-y-3">
                    <div className="bg-red-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Egg Groups:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {rightPokemon.species.eggGroups.map(group => (
                          <span key={group} className="bg-red-700 text-xs font-bold rounded-full px-3 py-1 capitalize">{group}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-red-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Catch Rate:</span>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${(rightPokemon.species.captureRate / 255) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-mono font-bold">{rightPokemon.species.captureRate}/255</span>
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