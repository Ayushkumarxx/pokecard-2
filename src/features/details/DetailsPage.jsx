import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import usePokemonDetail from "../../shared/hooks/usePokemonDetail";
import { FaArrowLeft } from "react-icons/fa6";
import PokemonHeader from "./components/PokemonHeader";
import PokemonTabs from "./components/PokemonTabs";
import StatsTab from "./components/StatsTab";
import EvolutionTab from "./components/EvolutionTab";
import AbilitiesTab from "./components/AbilitiesTab";
import MovesTab from "./components/MovesTab";

// Reusable MovesTab Component

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error, fetchPokemon } = usePokemonDetail();
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [evolutionLoading, setEvolutionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleMoves, setVisibleMoves] = useState(24);

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id, fetchPokemon]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (pokemon?.species) {
        try {
          setEvolutionLoading(true);
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
          );
          const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

          const evolutionResponse = await axios.get(evolutionChainUrl);
          const chain = evolutionResponse.data.chain;

          const evolutions = [];
          processEvolutionChain(chain, evolutions);

          setEvolutionChain(evolutions);
        } catch (error) {
          console.error("Error fetching evolution chain:", error);
        } finally {
          setEvolutionLoading(false);
        }
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  const processEvolutionChain = (chain, evolutions) => {
    const pokemonId = chain.species.url.split("/").filter(Boolean).pop();
    evolutions.push({
      id: pokemonId,
      name: chain.species.name,
      min_level: chain.evolution_details[0]?.min_level || null,
      trigger: chain.evolution_details[0]?.trigger?.name || null,
      item: chain.evolution_details[0]?.item?.name || null,
    });

    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => {
        processEvolutionChain(evolution, evolutions);
      });
    }
  };

  const filteredMoves = useMemo(() => {
    return (
      pokemon?.moves.filter((move) =>
        searchQuery ? move.name.includes(searchQuery.toLowerCase()) : true
      ) || []
    );
  }, [pokemon?.moves, searchQuery]);

  const loadMoreMoves = useCallback(() => {
    setVisibleMoves((prev) => Math.min(prev + 24, filteredMoves.length));
  }, [filteredMoves.length]);

  const getTypeColor = useCallback((type) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };

    return typeColors[type] || "#A8A878";
  }, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-r-4 border-indigo-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-xl text-gray-300 font-medium">
            Searching the Pokédex...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="bg-[#1E1E1E] rounded-xl shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="text-center">
          <p className="text-xl text-gray-300">No Pokémon selected.</p>
          <div
            onClick={() => navigate(-1)}
            className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Go Back
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4 text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center mb-8 text-gray-300 font-bold hover:text-indigo-300  transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <PokemonHeader pokemon={pokemon} getTypeColor={getTypeColor} />

        <PokemonTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl p-8 max-md:p-2 max-md:py-6 mb-8">
          {activeTab === "stats" && (
            <StatsTab pokemon={pokemon}  />
          )}
          {activeTab === "evolution" && (
            <EvolutionTab
              evolutionChain={evolutionChain}
              evolutionLoading={evolutionLoading}
              pokemon={pokemon}
            />
          )}
          {activeTab === "abilities" && <AbilitiesTab pokemon={pokemon} />}
          {activeTab === "moves" && (
            <MovesTab
              filteredMoves={filteredMoves}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              visibleMoves={visibleMoves}
              loadMoreMoves={loadMoreMoves}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
