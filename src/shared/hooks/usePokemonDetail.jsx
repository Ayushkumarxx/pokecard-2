import { useState, useCallback } from 'react';
import axios from 'axios';

/**
 * Hook for fetching detailed information about a specific Pokémon
 * @returns {Object} Pokémon details and fetching function
 */
const usePokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch a specific Pokémon by name or ID
   * @param {string|number} nameOrId - Name or ID of the Pokémon
   */
  const fetchPokemon = useCallback(async (nameOrId) => {
    if (!nameOrId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Make the search term lowercase for consistent API calls
      const term = String(nameOrId).toLowerCase().trim();
      
      // Fetch basic Pokémon data
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`);
      const pokemonData = response.data;
      
      // Fetch species data for additional details
      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      
      // Extract the flavor text in English if available
      const flavorText = speciesData.flavor_text_entries
        .find(entry => entry.language.name === 'en')?.flavor_text
        .replace(/\\f|\\n/g, ' ') || '';
      
      // Format the detailed Pokémon data
      const formattedPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        // Image options
        image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
        // Type information
        types: pokemonData.types.map(type => type.type.name),
        // Stats
        stats: {
          hp: pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
          attack: pokemonData.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
          defense: pokemonData.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
          specialAttack: pokemonData.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
          specialDefense: pokemonData.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
          speed: pokemonData.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0
        },
        // Physical attributes
        height: pokemonData.height / 10, // Convert to meters
        weight: pokemonData.weight / 10, // Convert to kg
        baseExperience: pokemonData.base_experience,
        // Abilities
        abilities: pokemonData.abilities.map(ability => ({
          name: ability.ability.name,
          isHidden: ability.is_hidden,
          url: ability.ability.url
        })),
        // Moves
        moves: pokemonData.moves.map(move => ({
          name: move.move.name,
          url: move.move.url
        })),
        // Species information
        species: {
          name: speciesData.name,
          genus: speciesData.genera.find(genus => genus.language.name === 'en')?.genus || '',
          flavorText,
          isBaby: speciesData.is_baby,
          isLegendary: speciesData.is_legendary,
          isMythical: speciesData.is_mythical,
          habitat: speciesData.habitat?.name || 'unknown',
          generation: speciesData.generation.name,
          growthRate: speciesData.growth_rate.name,
          color: speciesData.color.name,
          shape: speciesData.shape?.name || 'unknown',
          eggGroups: speciesData.egg_groups.map(group => group.name),
          captureRate: speciesData.capture_rate,
          baseHappiness: speciesData.base_happiness
        }
      };
      
      setPokemon(formattedPokemon);
      return formattedPokemon;
    } catch (error) {
      console.error(`Error fetching Pokémon "${nameOrId}":`, error);
      setError(`Could not find Pokémon "${nameOrId}". Please check your input.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Clear the currently loaded Pokémon
   */
  const clearPokemon = useCallback(() => {
    setPokemon(null);
    setError(null);
  }, []);

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    clearPokemon
  };
};

export default usePokemonDetail;