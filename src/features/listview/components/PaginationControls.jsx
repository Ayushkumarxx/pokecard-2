import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = ({
  itemsPerPage,
  handleItemsPerPageChange,
  handlePageChange,
  pagination,
  totalPages,
  selectedTypes,
  show = true,
}) => {
  if (!show) return null;

  // Dynamic page range
  const getVisiblePages = () => {
    const pages = [];
    const maxButtons = 5;
    const { currentPage } = pagination;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mt-8 bg-[#1A1A1A] p-4 rounded-lg shadow-sm">
      
      {/* Items per page */}
      <div className="flex items-center text-white font-bold">
        <label htmlFor="items-per-page" className="mr-2">
          Items per page:
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="bg-[#2A2A2A] border border-[#3B4CCA] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFCB05]"
        >
          {[10, 20, 50].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 bg-[#3B4CCA] text-white rounded-md disabled:opacity-50 hover:bg-[#2A3CAA] transition-colors shadow-md flex items-center font-bold gap-2"
        >
          <FaArrowLeft /> Prev
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange("goto", page)}
            className={`w-9 h-9 flex items-center justify-center rounded-md font-semibold shadow-md transition-colors ${
              pagination.currentPage === page
                ? "bg-[#FFCB05] text-black font-bold"
                : "bg-[#333] text-white hover:bg-[#444]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange("next")}
          disabled={pagination.currentPage === totalPages}
          className="px-3 py-1 bg-[#3B4CCA] text-white rounded-md disabled:opacity-50 hover:bg-[#2A3CAA] transition-colors shadow-md flex items-center font-bold gap-2"
        >
          Next <FaArrowRight />
        </button>
      </div>

      {/* Page info */}
      <div className="text-gray-300 font-bold text-center sm:text-left">
        Page {pagination.currentPage} of{" "}
        {selectedTypes.length > 0
          ? pagination.filteredTotalPages
          : pagination.totalPages}
      </div>
    </div>
  );
};

export default PaginationControls;
