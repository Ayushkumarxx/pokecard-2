// context/LikeContext.js
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const LikeContext = createContext(); // * context for liked pokemons

export const LikeProvider = ({ children }) => {
  const [likedIds, setLikedIds] = useState(() => {
    // ? get liked pokemons from local storage
    const stored = localStorage.getItem("likedPokemonIds");
    return stored ? JSON.parse(stored) : []; // default to empty array
  });

  useEffect(() => {
    // ! save liked pokemons to local storage
    localStorage.setItem("likedPokemonIds", JSON.stringify(likedIds));
  }, [likedIds]);

  const toggleLike = useCallback((id) => {
    // ? toggle like for pokemon with given id
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const isLiked = useCallback((id) => likedIds.includes(id), [likedIds]);

  const value = useMemo(() => ({ likedIds, toggleLike, isLiked }), [likedIds, toggleLike, isLiked]);

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};

export const useLikeContext = () => useContext(LikeContext);

