import React, { useState, useEffect, useCallback } from 'react';
import usePokemonDetail from '../../shared/hooks/usePokemonDetail';

// Reusable Button Component
const Button = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`py-3 px-4 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 shadow-md transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

// Reusable Back Button Component
const BackButton = ({ onClick }) => (
  <Button 
    onClick={onClick} 
    className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2 rounded-full px-4 py-2 absolute top-6 left-6 z-10"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Back
  </Button>
);

// Reusable Card Component
const Card = ({ children, gradient, className }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-xl border border-gray-700 ${className}`}>
    {children}
  </div>
);

// Reusable Stat Bar Component
const StatBar = ({ value, maxValue = 255, color }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  return (
    <div className="flex items-center w-full">
      <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden shadow-inner">
        <div
          className={`h-5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm font-bold text-white ml-2">{value}</span>
    </div>
  );
};

// Reusable Type Badge Component
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

const ComparePokemons = () => {
  // State for search inputs - controlled components
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
  const handleLeftSearch = useCallback((e) => {
    e.preventDefault();
    if (leftSearchInput.trim()) {
      fetchLeftPokemon(leftSearchInput.trim());
    }
  }, [leftSearchInput, fetchLeftPokemon]);

  // Function to handle right Pokémon search
  const handleRightSearch = useCallback((e) => {
    e.preventDefault();
    if (rightSearchInput.trim()) {
      fetchRightPokemon(rightSearchInput.trim());
    }
  }, [rightSearchInput, fetchRightPokemon]);

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
    if (!stat1 || !stat2) return 'bg-gray-600';
    if (stat1 > stat2) return 'bg-green-500';
    if (stat1 < stat2) return 'bg-red-500';
    return 'bg-yellow-400';
  }, []);

  // Return to home page (or previous page)
  const handleBack = useCallback(() => {
    // You can replace this with your navigation logic
    window.history.back();
    // Alternatively if using React Router: navigate('/')
  }, []);

  // Function to render stat bars with comparison highlighting
  const renderStatBars = useCallback((statName, leftStat, rightStat, maxStat = 255) => {
    const leftColor = getStatColor(leftStat, rightStat);
    const rightColor = getStatColor(rightStat, leftStat);
    
    return (
      <div className="grid grid-cols-11 gap-2 mb-3 items-center">
        <div className="col-span-5">
          <div className="flex items-center w-full justify-end">
            <span className="text-sm font-bold text-white mr-2">{leftStat}</span>
            <StatBar value={leftStat} maxValue={maxStat} color={leftColor} />
          </div>
        </div>
        
        <div className="col-span-1 text-center font-bold text-white">{statName}</div>
        
        <div className="col-span-5">
          <StatBar value={rightStat} maxValue={maxStat} color={rightColor} />
        </div>
      </div>
    );
  }, [getStatColor]);

  // Component for search box (reusable)
  const SearchBox = useCallback(({ 
    searchInput, 
    setSearchInput, 
    handleSearch, 
    handleRandom, 
    loading, 
    error, 
    placeholderText,
    side
  }) => (
    <Card 
      gradient={side === 'left' ? 'from-blue-900 to-blue-700' : 'from-red-900 to-red-700'} 
      className="mb-4"
    >
      <form onSubmit={handleSearch} className="flex mb-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholderText}
          className="flex-grow p-3 rounded-l-lg bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-blue-500 font-medium"
        />
        <Button
          disabled={loading}
          className={`${side === 'left' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-l-none rounded-r-lg`}
        >
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </form>
      <Button
        onClick={handleRandom}
        disabled={loading}
        className={`w-full ${side === 'left' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-pink-600 hover:bg-pink-700'} text-white`}
      >
        Random Pokémon
      </Button>
      {error && <p className="text-yellow-300 mt-2 text-sm font-medium">{error}</p>}
    </Card>
  ), []);

  // Component for Pokémon card (reusable)
  const PokemonCard = useCallback(({ pokemon, loading, side }) => {
    const cardGradient = side === 'left' 
      ? 'from-blue-800 to-blue-900' 
      : 'from-red-800 to-red-900';
    
    if (loading) {
      return (
        <Card gradient={cardGradient} className="animate-pulse">
          <div className="h-48 bg-gray-700 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </Card>
      );
    }

    if (!pokemon) {
      return (
        <Card gradient={cardGradient} className="flex flex-col items-center justify-center min-h-[400px] border-2 border-gray-700">
          <div className="text-white text-center">
            <p className="text-2xl font-bold mb-3">No Pokémon Selected</p>
            <p className="text-sm opacity-80">Search by name or ID to compare</p>
          </div>
        </Card>
      );
    }

    return (
      <Card gradient={cardGradient}>
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
      </Card>
    );
  }, []);

  // AbilityItem component
  const AbilityItem = useCallback(({ name, isHidden, side }) => (
    <div className={`bg-${side === 'left' ? 'blue' : 'red'}-900 bg-opacity-30 p-3 rounded-xl capitalize font-medium flex justify-between items-center`}>
      {name}
      {isHidden && 
        <span className={`text-xs bg-${side === 'left' ? 'blue' : 'red'}-600 rounded-full px-2 py-1 font-bold`}>Hidden</span>
      }
    </div>
  ), []);

  // EggGroup component
  const EggGroup = useCallback(({ name, side }) => (
    <span className={`bg-${side === 'left' ? 'blue' : 'red'}-700 text-xs font-bold rounded-full px-3 py-1 capitalize`}>
      {name}
    </span>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Back Button */}
      <BackButton onClick={handleBack} />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
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
          <Card gradient="from-gray-800 to-gray-900" className="mt-10 p-8">
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
          </Card>
        )}
        
        {/* Additional comparison sections */}
        {leftPokemon && rightPokemon && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Abilities comparison */}
            <Card gradient="from-gray-800 to-gray-900" className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Abilities</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-blue-400">{leftPokemon.name}</h3>
                  <div className="space-y-3">
                    {leftPokemon.abilities.map(ability => (
                      <AbilityItem 
                        key={ability.name} 
                        name={ability.name} 
                        isHidden={ability.isHidden} 
                        side="left" 
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-red-400">{rightPokemon.name}</h3>
                  <div className="space-y-3">
                    {rightPokemon.abilities.map(ability => (
                      <AbilityItem 
                        key={ability.name} 
                        name={ability.name} 
                        isHidden={ability.isHidden} 
                        side="right" 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Additional info comparison */}
            <Card gradient="from-gray-800 to-gray-900" className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Breeding & Capture</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center text-lg font-bold mb-3 capitalize text-blue-400">{leftPokemon.name}</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Egg Groups:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {leftPokemon.species.eggGroups.map(group => (
                          <EggGroup key={group} name={group} side="left" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Catch Rate:</span>
                      <div className="mt-2 flex items-center">
                        <StatBar 
                          value={leftPokemon.species.captureRate} 
                          maxValue={255} 
                          color="bg-blue-500" 
                        />
                        <span className="ml-2 font-mono font-bold">/255</span>
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
                          <EggGroup key={group} name={group} side="right" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-red-900 bg-opacity-30 p-3 rounded-xl">
                      <span className="text-sm font-bold">Catch Rate:</span>
                      <div className="mt-2 flex items-center">
                        <StatBar 
                          value={rightPokemon.species.captureRate} 
                          maxValue={255} 
                          color="bg-red-500" 
                        />
                        <span className="ml-2 font-mono font-bold">/255</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePokemons;