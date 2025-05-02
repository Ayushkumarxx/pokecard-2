import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

const EvolutionTab = ({ evolutionChain, evolutionLoading, pokemon }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-10 text-center">
        Evolution Chain
      </h2>

      {evolutionLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-14 h-14 border-t-4 border-r-4 border-indigo-400 rounded-full animate-spin"></div>
        </div>
      ) : evolutionChain.length <= 1 ? (
        <div className="flex flex-col justify-center items-center h-64 bg-gray-800 rounded-2xl shadow-lg transition-all duration-300">
          <FaExclamationTriangle className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-xl text-gray-300 font-medium">
            This Pokémon does not evolve.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-8">
            {evolutionChain.map((evo, index) => (
              <div
                key={evo.id}
                className="relative flex flex-col items-center mb-8 md:mb-0 max-w-xs w-full"
              >
                <Link
                  to={`/pokemon/${evo.id}`}
                  className="block relative z-10 w-full group"
                >
                  <div
                    className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                      ${
                        evo.id === pokemon.id.toString()
                          ? "bg-gradient-to-b from-gray-700 to-[#121212] ring-2 ring-indigo-400 shadow-xl"
                          : "bg-gradient-to-b from-[#121212] to-gray-800 group-hover:bg-gray-700"
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 w-40 h-40 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-gray-800">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                          alt={evo.name}
                          className="w-32 h-32 object-contain transform group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`;
                          }}
                        />
                      </div>

                      <p className="text-sm text-gray-400 mb-1 font-mono">
                        #{evo.id.padStart(3, "0")}
                      </p>
                      <p className="text-2xl font-semibold capitalize mb-3 text-white tracking-wide">
                        {evo.name.replace("-", " ")}
                      </p>

                      {index > 0 && (
                        <div className="mt-2 py-2 px-4 bg-gray-900 rounded-lg text-center transition-all duration-300 group-hover:bg-gray-800">
                          <p className="text-sm text-indigo-300 font-medium">
                            {evo.min_level
                              ? `Level ${evo.min_level}`
                              : evo.trigger === "use-item" && evo.item
                              ? `Use ${evo.item.replace("-", " ")}`
                              : evo.trigger === "trade"
                              ? "Trade"
                              : evo.trigger
                              ? evo.trigger.replace("-", " ")
                              : "Special condition"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {index < evolutionChain.length - 1 && (

                    <div className="bg-gradient-to-b from-gray-700 to-gray-800 ring-2 ring-indigo-400   mt-4 md:mt-0 md:absolute md:top-1/2 md:right-[-2.5rem] md:transform md:-translate-y-1/2 z-50 text-2xl  px-4 py-1 rounded-full max-md:rotate-90">  <FaArrowRight  /></div>
                 
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolutionTab;