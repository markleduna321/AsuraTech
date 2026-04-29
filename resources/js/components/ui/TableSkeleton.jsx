import React from 'react';
import Skeleton from './Skeleton';

export default function TableSkeleton({ columns = 4, rows = 5 }) {
    return (
        <tbody>
            {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx} className="border-b">
                    {Array.from({ length: columns }).map((__, j) => (
                        <td key={j} className="py-3 px-2">
                            <Skeleton className="h-4 w-full rounded" />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
