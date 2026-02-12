// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

const DataTable = ({ columns, data, onSort, sortBy, sortOrder }) => {
    const handleSort = (field) => {
        if (onSort) {
            const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
            onSort(field, newOrder);
        }
    };

    const SortIcon = ({ field }) => {
        if (sortBy !== field) return <span className="text-slate-600 ml-1">⇅</span>;
        return sortOrder === 'asc'
            ? <HiChevronUp className="inline ml-1 text-indigo-400" />
            : <HiChevronDown className="inline ml-1 text-indigo-400" />;
    };

    if (!data || data.length === 0) {
        return (
            <div className="glass-card p-12 text-center text-slate-400">
                <p className="text-lg">No data found</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto glass-card">
            <table className="table data-table w-full">
                <thead>
                    <tr className="border-b border-base-300">
                        {columns.map((col) => (
                            <th
                                key={col.field}
                                onClick={() => col.sortable !== false && handleSort(col.field)}
                                className={`bg-transparent text-slate-400 text-xs uppercase tracking-wider font-semibold py-4 ${col.sortable !== false ? 'cursor-pointer hover:text-indigo-400' : ''
                                    }`}
                            >
                                {col.label}
                                {col.sortable !== false && <SortIcon field={col.field} />}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={row._id || idx} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                            {columns.map((col) => (
                                <td key={col.field} className="py-3 text-sm">
                                    {col.render ? col.render(row) : row[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
