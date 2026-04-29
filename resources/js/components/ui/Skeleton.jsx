import React from 'react';

export default function Skeleton({ className = 'h-4 w-full rounded', style = {} }) {
    return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} style={style} />;
}
