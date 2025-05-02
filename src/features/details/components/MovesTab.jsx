const MovesTab = ({ filteredMoves, searchQuery, setSearchQuery, visibleMoves, loadMoreMoves }) => (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center">Moves</h2>
      
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
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
            onClick={() => setSearchQuery('')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
      
      {filteredMoves.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[#2A2A2A] rounded-xl">
          <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-lg text-gray-400">No moves found matching "{searchQuery}"</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {filteredMoves.slice(0, visibleMoves).map(move => (
              <div 
                key={move.name} 
                className="bg-[#2A2A2A] hover:bg-[#333333] transition-all duration-200 rounded-xl p-4"
              >
                <p className="font-medium capitalize text-center">{move.name.replace(/-/g, ' ')}</p>
              </div>
            ))}
          </div>
          
          {visibleMoves < filteredMoves.length && (
            <div className="mt-8 text-center">
              <button 
                onClick={loadMoreMoves}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
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