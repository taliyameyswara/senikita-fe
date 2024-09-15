import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ heads, isLoading = false, freezeTable = false, wrapperClass = '', children, name }) => {
    // Helper function to generate class names for table wrapper
    const getWrapperClassNames = () => {
        return `relative bg-white border rounded-sm shadow-lg border-slate-200 ${isLoading ? 'min-h-[40vh] sm:min-h-[50vh]' : ''} ${wrapperClass}`;
    };

    // Helper function to generate class names for table
    const getTableClassNames = () => {
        return `w-full divide-y table-auto divide-slate-200 ${freezeTable ? 'border-separate border-spacing-0' : ''}`;
    };

    // Helper function to generate class names for table header
    const getHeaderClassNames = () => {
        return `text-xs uppercase font-semibold text-slate-500 bg-slate-50 border-t border-b border-slate-200 ${freezeTable ? 'header' : ''}`;
    };

    // Helper function to generate class names for table header cells
    const getThClassNames = (index) => {
        return `px-4 py-3 whitespace-nowrap border-t border-b border-slate-200 text-start ${freezeTable && index === 0 ? 'fixed-header' : ''}`;
    };


    return (
        <div className="overflow-y-visible">
            {/* Table */}
            <div className={getWrapperClassNames()}>
                <div className="px-5 py-4">
                    <h2 className="font-semibold text-slate-800">
                        All {name} <span className="font-medium text-slate-400">{children ? React.Children.count(children) : 0}</span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-slate-200">
                        {/* Table header */}
                        <thead className="text-xs uppercase border-t text-slate-500 bg-slate-50 border-slate-200">
                            <tr>
                                {heads.map((head, index) => (
                                    <th key={index} className={getThClassNames(index)}>
                                        {/* <div className=> */}
                                        {head}
                                        {/* </div> */}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm">
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    heads: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoading: PropTypes.bool,
    freezeTable: PropTypes.bool,
    wrapperClass: PropTypes.string,
    children: PropTypes.node
};

export default DataTable;
