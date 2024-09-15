import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../config/axiosConfig';
import FullPageLoader from '../../../loading/FullPageLoader';
import axios from 'axios';

function ReactTable({ headers, apiUrl }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      const { data, current_page, last_page, next_page_url, prev_page_url } = response.data.data;
      setData(data);
      setPagination({
        currentPage: current_page,
        lastPage: last_page,
        nextPageUrl: next_page_url,
        prevPageUrl: prev_page_url,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(apiUrl);
  }, [apiUrl]);

  const handlePagination = (url) => {
    if (url) {
      fetchData(url);
    }
  };

  return (
    <div>
      {loading && <FullPageLoader />}
      <div className="relative bg-white border rounded-sm shadow-lg border-slate-200">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            All Orders <span className="font-medium text-slate-400">{data.length}</span>
          </h2>
        </header>
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y table-auto divide-slate-200">
              {/* Table header */}
              <thead className="text-xs uppercase border-t text-slate-500 bg-slate-50 border-slate-200">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">{header}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, headerIndex) => (
                      <td key={headerIndex} className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                        <div>{row[header]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
            <ul className="flex justify-center">
              <li className="ml-3 first:ml-0">
                <a
                  className={`bg-white btn border-slate-200 ${!pagination.prevPageUrl ? 'cursor-not-allowed text-slate-300' : 'text-indigo-500 hover:border-slate-300'}`}
                  href="#0"
                  onClick={() => handlePagination(pagination.prevPageUrl)}
                >
                  &lt;- Previous
                </a>
              </li>
              <li className="ml-3 first:ml-0">
                <a
                  className={`text-indigo-500 bg-white btn border-slate-200 ${!pagination.nextPageUrl ? 'cursor-not-allowed text-slate-300' : 'hover:border-slate-300'}`}
                  href="#0"
                  onClick={() => handlePagination(pagination.nextPageUrl)}
                >
                  Next -&gt;
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-sm text-center text-slate-500 sm:text-left">
            Showing <span className="font-medium text-slate-600">{(pagination.currentPage - 1) * 15 + 1}</span> to <span className="font-medium text-slate-600">{Math.min(pagination.currentPage * 15, data.length)}</span> of <span className="font-medium text-slate-600">{pagination.total}</span> results
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactTable;
