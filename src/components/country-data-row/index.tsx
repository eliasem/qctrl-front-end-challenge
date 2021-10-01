import React from 'react';
import './style.css';

interface IProps {
    label: string;
    value: string;
}

export default function Countries({label, value}: IProps) {
    const valueExists = !!value;
    return (
        <div className="country-data-row">
            <div className="label">{label}</div>
            <div className={`value ${!valueExists && 'missing'}`}>{valueExists ? value : 'Unavailable'}</div>
        </div>
    );
}
