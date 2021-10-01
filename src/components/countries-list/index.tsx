import React from 'react';
import './style.css';

interface IProps {
    children: React.ReactNode;
}

export default function CountriesList({children}: IProps) {
    return (
        <section className="countries-list">
            {children}
        </section>
    );
}
