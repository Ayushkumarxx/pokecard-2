import { FiSearch, FiX, FiFrown } from 'react-icons/fi';

/**
 * MovesTab component
 * Display a list of moves with search and load more functionality
 */
const MovesTab = ({
  filteredMoves,
  searchQuery,
  setSearchQuery,
  visibleMoves,
  loadMoreMoves,
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-10 text-center">Moves</h2>

    {/* Search input with clear button */}
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <FiSearch className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search moves..."
        className="w-full px-12 py-4 bg-[#2A2A2A] border border-[#444444] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white"
          onClick={() => setSearchQuery("")}
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>

    {/* Display no results message if filteredMoves is empty */}
    {filteredMoves.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 bg-[#2A2A2A] rounded-xl">
        <FiFrown className="w-16 h-16 text-gray-500 mb-4" />
        <p className="text-lg text-gray-400">
          No moves found matching "{searchQuery}"
        </p>
      </div>
    ) : (
      <>
        {/* Display list of moves */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredMoves.slice(0, visibleMoves).map((move) => (
            <div
              key={move.name}
              className="bg-[#2A2A2A] hover:bg-[#333333] transition-all duration-200 rounded-xl p-4"
            >
              <p className="font-medium capitalize text-center">
                {move.name.replace(/-/g, " ")}
              </p>
            </div>
          ))}
        </div>

        {/* Load more button if there are more moves to display */}
        {visibleMoves < filteredMoves.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreMoves}
              className="bg-indigo-600 hover:bg-indigo-700 text-white  px-6 py-3 rounded-xl transition-colors duration-200 font-bold"
            >
              Load More Moves ({visibleMoves} of {filteredMoves.length})
            </button>
          </div>
        )}
      </>
    )}
  </div>
);

export default MovesTab;

