import React from "react";
import typeStyles from "../utils/typeStyle";
import { useLikeContext } from "../context/LikeContext";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// 🎖️ A neat little badge for each Pokémon type
const TypeBadge = ({ type }) => {
  const style = typeStyles[type] || {
    color: "#CCCCCC",
    gradient: "linear-gradient(135deg, #CCCCCC, #999999)",
  };

  return (
    <span
      className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white capitalize mr-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{ background: style.gradient }}
    >
      {type}
    </span>
  );
};

// 📊 A simple bar to represent stats like HP, ATK, etc.
const StatBar = ({ label, value, maxValue = 200, color }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold uppercase text-gray-300">
          {label}
        </span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full animate-expand"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            animation: "expandWidth 1.5s ease-out",
          }}
        ></div>
      </div>
    </div>
  );
};

// 🧩 The main card displaying Pokémon details, image, stats & more
const PokemonCard = ({ pokemon, onUnlike }) => {
  const { toggleLike, isLiked } = useLikeContext();
  const navigate = useNavigate();

  const handleHeartClick = () => {
    toggleLike(pokemon.id);
    if (isLiked && onUnlike) {
      onUnlike(); // Let parent component know if we unliked it 🗑️
    }
  };

  const primaryType = pokemon.types[0];
  const style = typeStyles[primaryType] || {
    color: "#CCCCCC",
    gradient: "linear-gradient(135deg, #CCCCCC, #999999)",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl animate-fadeIn "
      style={{
        animation: "fadeIn 0.6s ease-out",
        background: `radial-gradient(circle, ${style.color}30, ${style.color}10)`,
      }}
    >
      {/* 🌈 Fancy top border with type gradient */}
      <div className="h-1.5" style={{ background: style.gradient }}></div>

      <div className="p-5">
        {/* 🧾 Pokémon name and ID */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-white capitalize">
              {pokemon.name}
            </h2>
            <div className="text-[12px] font-mono font-bold text-gray-400">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
          </div>

          {/* 💖 Like button with heart icon */}
          <button onClick={handleHeartClick} className="cursor-pointer">
            <FaHeart
              size={20}
              fill={isLiked(pokemon.id) ? style.color : "#CCCCCC"}
              color={style.color}
              className="transition-all duration-300 hover:scale-110"
            />
          </button>
        </div>

        {/* 📷 Pokémon image with hover animation */}
        <div
          className="rounded-full p-6 mb-4 flex justify-center items-center overflow-hidden bg-opacity-10 cursor-pointer"
          style={{
            background: `radial-gradient(circle, ${style.color}30, ${style.color}10)`,
          }}
          onClick={() => navigate(`/details/${pokemon.id}`)}
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-36 h-36 object-contain transform hover:scale-110 transition duration-500 drop-shadow-lg animate-float"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: `${Math.random() * 1000}ms`,
            }}
          />
        </div>

        {/* 🏷️ Display all Pokémon types */}
        <div className="mb-4">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>

        {/* 💪 Display core stats: HP, ATK, DEF, SPD */}
        <div className="mt-5">
          <StatBar label="HP" value={pokemon.stats.hp} color="#FF5959" />
          <StatBar label="ATK" value={pokemon.stats.attack} color="#F5AC78" />
          <StatBar label="DEF" value={pokemon.stats.defense} color="#FAE078" />
          <StatBar label="SPD" value={pokemon.stats.speed} color="#FA92B2" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
