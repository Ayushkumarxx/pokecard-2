import React from 'react'
import Exports from '../../../shared/utils/export';

const ListPageLoder = () => {
    return (
        <div className="min-h-screen bg-[#121212] flex justify-center items-center">
          <div className="text-center">
            <img
              src={Exports.images.pokeBall}
              alt="Loading"
              className="w-20 h-20 mx-auto mb-4 animate-bounce"
            />
            <p className="text-xl text-[#FFCB05] font-extrabold text-border-md">
              Loading Pokémon...
            </p>
          </div>
        </div>
      );
}

export default ListPageLoder