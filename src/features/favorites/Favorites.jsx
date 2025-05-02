import React, { useState, useEffect, useCallback } from "react";
import { useLikeContext } from "../../shared/context/LikeContext";
import PokemonCard from "../../shared/components/PokemonCard";
import usePokemonDetail from "../../shared/hooks/usePokemonDetail";
import { FaArrowLeft } from "react-icons/fa"; // Back icon from React Icons
import { useNavigate } from "react-router-dom"; // For navigation
import Exports from "../../shared/utils/export";
import { FaHeart } from "react-icons/fa6";

/**
 * FavoritesPage Component
 *
 * Displays all the Pokémon that a user has liked.
 * Shows a message when there are no liked Pokémon.
 * Fetches and displays liked Pokémon details.
 */
const FavoritesPage = () => {
  const { likedIds } = useLikeContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchPokemon } = usePokemonDetail();
  const navigate = useNavigate(); // To navigate back to the homepage

  useEffect(() => {
    const loadFavorites = async () => {
      if (likedIds.length === 0) return;

      setLoading(true);
      const pokemonPromises = likedIds.map((id) => fetchPokemon(id));

      try {
        const results = await Promise.all(pokemonPromises);
        // Filter out any null results (failed fetches)
        setFavorites(results.filter((pokemon) => pokemon !== null));
      } catch (error) {
        console.error("Error loading favorite Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [fetchPokemon]);
  // ✅ useCallback to memoize function
  const handleUnlike = useCallback(
    (id) => {
      setFavorites((prev) => prev.filter((p) => p.id !== id));
    },
    [setFavorites]
  );
  if (loading) {
    return (
      <Exports.components.sectionLoader
        minHeight="min-h-screen"
        message="Loading your favorite Pokémon..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")} // Navigate back to the homepage using useNavigate
          className="text-white font-bold text-[18px] mb-4 py-2 px-4 flex items-center hover:bg-gray-800 cursor-pointer rounded-full "
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Your Favorite Pokémon
        </h1>
        <div className="h-1 w-32 mb-8 rounded-full bg-text-gray"></div>

        {likedIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <FaHeart className="text-gray-400 text-5xl mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-400 text-center font-semibold text-sm">
              You haven't liked any Pokémon yet. Explore the Pokédex and click
              the heart icon to add Pokémon to your favorites!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                onUnlike={() => handleUnlike(pokemon.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
