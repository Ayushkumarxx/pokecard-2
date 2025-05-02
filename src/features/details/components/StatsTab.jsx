const StatsTab = ({ pokemon, getStatGradient }) => (
    <div>
      <h2 className="text-2xl font-bold mb-10 text-center">Base Stats</h2>
      
      <div className="max-w-3xl mx-auto space-y-8">
        {Object.entries(pokemon.stats).map(([statName, statValue]) => {
          const displayName = {
            hp: 'HP',
            attack: 'Attack',
            defense: 'Defense',
            specialAttack: 'Sp. Attack',
            specialDefense: 'Sp. Defense',
            speed: 'Speed'
          }[statName];
          
          return (
            <div key={statName} className="flex items-center gap-6  justify-between max-md:flex-col">
              <div className="flex gap-1 w-[20%] max-md:w-full justify-between  text-[16px] ">
                <span className="font-semibold text-gray-300">{displayName}</span>
                <span className="font-semibold text-white">{statValue}</span>
              </div>
              <div className="w-[80%] max-md:w-full h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${getStatGradient(statName)}`}
                  style={{ 
                    width: `${Math.min(100, (statValue / 255) * 100)}%`,
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-14 pt-10 border-t border-[#333333]">
        <h3 className="text-xl font-semibold mb-8 text-center">Additional Information</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Base Experience</p>
            <p className="font-medium text-xl">{pokemon.baseExperience || 'N/A'}</p>
          </div>
          <div className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Growth Rate</p>
            <p className="font-medium text-xl capitalize">{pokemon.species.growthRate.replace('-', ' ')}</p>
          </div>
          <div className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Capture Rate</p>
            <p className="font-medium text-xl">{pokemon.species.captureRate}/255</p>
          </div>
          <div className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Base Happiness</p>
            <p className="font-medium text-xl">{pokemon.species.baseHappiness}/255</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default StatsTab  