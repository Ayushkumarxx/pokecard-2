import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch all Pokémon types
 * @returns {Object} { types, loading, error }
 */
const usePokemonTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const rawTypes = response.data.results;

        const filteredTypes = rawTypes.filter(type =>
          !['shadow', 'unknown','stellar'].includes(type.name)
        );

        setTypes(filteredTypes.map(type => type.name));
      } catch (err) {
        console.error('Failed to fetch Pokémon types:', err);
        setError('Failed to load Pokémon types.');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
};

export default usePokemonTypes;
