import React from "react";

// Reusable PokemonHeader Component
const PokemonHeader = ({ pokemon, getTypeColor }) => (
  <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden mb-10 backdrop-blur-xl">
    <div
      className="relative px-6 py-10"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${getTypeColor(
          pokemon.types[0]
        )}33 0%, transparent 75%), 
                    linear-gradient(to bottom, ${getTypeColor(
                      pokemon.types[0]
                    )}22, transparent)`,
        boxShadow: `inset 0 -20px 30px -10px #1E1E1E`,
      }}
    >
      <div className="absolute top-6 right-6 bg-[#00000040] backdrop-blur-md px-4 py-2 rounded-full">
        <span className="text-lg font-bold text-white">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-2/5 mb-8 md:mb-0 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 bg-white opacity-5 blur-2xl rounded-full scale-90"
              style={{
                background: `radial-gradient(circle, ${getTypeColor(
                  pokemon.types[0]
                )}66, transparent 70%)`,
              }}
            ></div>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="relative z-10 w-64 h-64 object-contain drop-shadow-2xl transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 md:pl-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {pokemon.species.isLegendary && (
              <span className="inline-block bg-amber-500 text-amber-900 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Legendary
              </span>
            )}
            {pokemon.species.isMythical && (
              <span className="inline-block bg-fuchsia-500 text-fuchsia-900 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Mythical
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold capitalize mb-2">
            {pokemon.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{pokemon.species.genus}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium capitalize"
                style={{
                  backgroundColor: `${getTypeColor(type)}44`,
                  color: getTypeColor(type),
                  border: `1px solid ${getTypeColor(type)}88`,
                }}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="bg-[#00000030] backdrop-blur-sm rounded-xl p-4 mb-6">
            <p className="text-gray-300 leading-relaxed">
              {pokemon.species.flavorText}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#00000030] backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Height
              </p>
              <p className="font-semibold text-lg">{pokemon.height} m</p>
            </div>
            <div className="bg-[#00000030] backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Weight
              </p>
              <p className="font-semibold text-lg">{pokemon.weight} kg</p>
            </div>
            <div className="bg-[#00000030] backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Habitat
              </p>
              <p className="font-semibold text-lg capitalize">
                {pokemon.species.habitat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PokemonHeader;
