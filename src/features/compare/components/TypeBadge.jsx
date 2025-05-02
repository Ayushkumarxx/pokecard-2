import React from 'react';



// type badge componet get color using Pokemon type 
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
      <span className={`${typeColors[type] || 'bg-gray-400'} text-white text-xs font-bold px-2 py-1 rounded-full mr-1 uppercase shadow-md`}>
        {type}
      </span>
    );
  };

  export default TypeBadge;