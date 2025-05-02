import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] py-6 mt-12 ">
    <div className="max-w-[1440px] mx-auto px-4 text-center text-gray-400 font-bold ">
      <p>
        Developed by Ayush Kumar with ❤️
        <a
          href="https://pokeapi.co/"
          className="text-[#FFCB05] hover:underline ml-1"
        >
          PokeAPI
        </a>
      </p>
    </div>
  </footer>
  )
}

export default Footer