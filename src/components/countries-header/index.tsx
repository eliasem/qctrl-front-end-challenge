import React from 'react';
import './style.css';

interface IProps {
    onSearch: (term: string) => void;
}

export default function CountriesHeader({onSearch}: IProps) {
    const ref = React.createRef();
    return (
        <header className="countries-header">
            <input className="searchInput" ref={ref}/>
            <button className="btn" onClick={() => {
                onSearch(ref.current.value);
            }}>Search</button>
        </header>
    );
}
