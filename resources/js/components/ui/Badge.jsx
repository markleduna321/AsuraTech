import React from 'react';

const VARIANTS = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
};

export default function Badge({ variant = 'neutral', children, className = '' }) {
    const cls = VARIANTS[variant] || VARIANTS.neutral;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls} ${className}`}>
            {children}
        </span>
    );
}
