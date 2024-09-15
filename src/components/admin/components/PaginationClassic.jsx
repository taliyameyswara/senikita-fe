import React from 'react';

function PaginationClassic({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white border-slate-200 ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'hover:border-slate-300 text-indigo-500'}`}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white border-slate-200 ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'hover:border-slate-300 text-indigo-500'}`}
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-center text-slate-500 sm:text-left">
        Showing <span className="font-medium text-slate-600">{currentPage}</span> of <span className="font-medium text-slate-600">{totalPages}</span> pages
      </div>
    </div>
  );
}

export default PaginationClassic;
