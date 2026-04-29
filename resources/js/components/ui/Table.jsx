import React from 'react';
import TableSkeleton from './TableSkeleton';

export default function Table({ columns = [], data = [], loading = false, emptyMessage = 'No data', className = '' }) {
    if (loading) {
        return (
            <div className={`overflow-hidden rounded-md border ${className}`}>
                <table className="min-w-full divide-y">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <TableSkeleton columns={columns.length} rows={5} />
                </table>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return <div className="p-4 text-sm text-gray-600">{emptyMessage}</div>;
    }

    return (
        <div className={`overflow-hidden rounded-md border ${className}`}>
            <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col.key} className="px-3 py-2 text-sm text-gray-700">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
