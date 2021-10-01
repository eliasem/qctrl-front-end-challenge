import React from 'react';
import './style.css';

interface IProps {
    children: React.ReactNode;
    id: string;
    onClick: (id: string) => void;
}

export default function CountriesListRow({children, id, onClick}: IProps) {
    return (
        <div className="countries-list-row" onClick={() => onClick(id)}>
            <div>{children}</div>
        </div>
    );
}
