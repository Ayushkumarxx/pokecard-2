import { Link } from "react-router-dom";

const EvolutionTab = ({ evolutionChain, evolutionLoading, pokemon }) => (
    <div>
      <h2 className="text-2xl font-bold mb-10 text-center">Evolution Chain</h2>
      
      {evolutionLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-t-4 border-r-4 border-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : evolutionChain.length <= 1 ? (
        <div className="flex flex-col justify-center items-center h-64 bg-[#2A2A2A] rounded-xl">
          <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <p className="text-lg text-gray-400">This Pokémon does not evolve.</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-around items-center md:items-start">
            {evolutionChain.map((evo, index) => (
              <div key={evo.id} className="relative mb-8 md:mb-0 max-w-xs w-full">
                <Link 
                  to={`/pokemon/${evo.id}`} 
                  className={`block relative z-10 h-full`}
                >
                  <div 
                    className={`h-full p-6 rounded-xl transition-all duration-300
                      ${evo.id === pokemon.id.toString() 
                        ? 'bg-gradient-to-b from-[#333333] to-[#2A2A2A] ring-2 ring-indigo-500 shadow-lg' 
                        : 'bg-[#2A2A2A] hover:bg-[#333333]'}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 w-36 h-36 rounded-full bg-[#222222] flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`} 
                          alt={evo.name}
                          className="w-28 h-28 object-contain" 
                          onError={(e) => {
                            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`;
                          }}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-1">#{evo.id.padStart(3, '0')}</p>
                      <p className="text-xl font-medium capitalize mb-3">{evo.name.replace('-', ' ')}</p>
                      
                      {index > 0 && (
                        <div className="mt-2 py-1 px-3 bg-[#222222] rounded-lg text-center">
                          <p className="text-sm text-indigo-400">
                            {evo.min_level ? `Level ${evo.min_level}` : 
                             evo.trigger === 'use-item' && evo.item ? `Use ${evo.item.replace('-', ' ')}` : 
                             evo.trigger === 'trade' ? 'Trade' :
                             evo.trigger ? evo.trigger.replace('-', ' ') : 
                             'Special condition'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  export default EvolutionTab