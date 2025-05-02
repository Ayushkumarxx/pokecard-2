// Reusable PokemonTabs Component
const PokemonTabs = ({ activeTab, setActiveTab }) => (
    <div className="flex overflow-x-auto space-x-2 mb-8 py-1 px-1 bg-[#1E1E1E] rounded-xl">
      {['stats', 'evolution', 'abilities', 'moves'].map((tab) => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-3 rounded-lg font-medium capitalize flex-shrink-0 transition-all duration-200 ${
            activeTab === tab 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  export default PokemonTabs