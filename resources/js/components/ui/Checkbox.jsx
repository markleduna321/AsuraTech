import React from 'react';

export default function Checkbox({ id, name, checked, onChange, className = '', ...props }) {
    return (
        <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`form-checkbox h-4 w-4 text-indigo-600 ${className}`}
            {...props}
        />
    );
}
