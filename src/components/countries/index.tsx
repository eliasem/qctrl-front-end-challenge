import React from 'react';
import './style.css';

interface IProps {
    children: React.ReactNode;
}

export default function Countries({children}: IProps) {
    return (
        <div className="countries">
            {children}
        </div>
    );
}
