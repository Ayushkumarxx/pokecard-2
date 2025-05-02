const AbilitiesTab = ({ pokemon }) => (
  <div>
    <h2 className="text-2xl font-bold mb-10 text-center">Abilities</h2>

    <div className="max-w-full mx-auto grid gap-6">
      {pokemon.abilities.map((ability) => (
        <div
          key={ability.name}
          className={`p-6 rounded-xl transition-all duration-200 
              ${
                ability.isHidden
                  ? "bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30"
                  : "bg-[#2A2A2A] hover:bg-[#333333]"
              }`}
        >
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <h3 className="font-semibold text-xl capitalize mr-3">
                  {ability.name.replace(/-/g, " ")}
                </h3>
                {ability.isHidden && (
                  <span className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full font-medium">
                    Hidden Ability
                  </span>
                )}
              </div>
              <p className="text-gray-400 leading-relaxed font-semibold text-sm">
                {ability.isHidden
                  ? `This is a special hidden ability that rare ${pokemon.name} may possess. Hidden abilities often provide unique strategic advantages in battle.`
                  : `This is one of ${pokemon.name}'s standard abilities that helps it in battle and influences how it interacts with different move types and battle conditions.`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AbilitiesTab;
