import React from 'react';

export default function InputLabel({ htmlFor, value, className = '' }) {
    return (
        <label htmlFor={htmlFor} className={`block font-medium text-sm text-gray-700 ${className}`}>
            {value}
        </label>
    );
}
