import React from 'react';

export default function TextInput({ id, className = '', type = 'text', value, onChange, ...props }) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 w-full ${className}`}
            {...props}
        />
    );
}
