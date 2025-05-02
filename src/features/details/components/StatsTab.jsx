const StatsTab = ({ pokemon }) => (
  <div className="px-2 sm:px-6">
    <h2 className="text-2xl font-bold mb-10 text-center text-white">Base Stats</h2>

    <div className="max-w-3xl mx-auto space-y-8">
      {Object.entries(pokemon.stats).map(([statName, statValue]) => {
        const displayName = {
          hp: "HP",
          attack: "Attack",
          defense: "Defense",
          specialAttack: "Sp. Attack",
          specialDefense: "Sp. Defense",
          speed: "Speed",
        }[statName];

        return (
          <div
            key={statName}
            className="flex items-center justify-between gap-6 md:gap-10 flex-wrap sm:flex-nowrap"
          >
            <div className="flex justify-between  gap-2 sm:gap-4 w-full sm:w-[20%] text-[16px]">
              <span className="font-semibold text-gray-300">{displayName}</span>
              <span className="font-semibold text-white">{statValue}</span>
            </div>
            <div className="w-full sm:w-[80%] h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-100 rounded-full"
                style={{
                  width: `${Math.min(100, (statValue / 255) * 100)}%`,
                  transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-14 pt-10 border-t border-[#333333]">
      <h3 className="text-xl font-semibold mb-8 text-center text-white">
        Additional Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          {
            label: "Base Experience",
            value: pokemon.baseExperience || "N/A",
          },
          {
            label: "Growth Rate",
            value: pokemon.species.growthRate.replace("-", " "),
          },
          {
            label: "Capture Rate",
            value: `${pokemon.species.captureRate}/255`,
          },
          {
            label: "Base Happiness",
            value: `${pokemon.species.baseHappiness}/255`,
          },
        ].map((info) => (
          <div
            key={info.label}
            className="bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-200 rounded-xl p-5 text-center"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{info.label}</p>
            <p className="font-semibold text-sm text-white">{info.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatsTab;
