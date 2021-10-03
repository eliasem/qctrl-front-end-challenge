import React, {RefObject} from 'react';
import './style.css';

interface IProps {
    onSearch: (term: string) => void;
}

export default function CountriesHeader({onSearch}: IProps) {
    const ref:RefObject<HTMLInputElement> = React.createRef();
    return (
        <header className="countries-header">
            <input className="searchInput" ref={ref}/>
            <button className="btn" onClick={() => {
                if(!ref.current){ return; }
                onSearch(ref.current.value);
            }}>Search</button>
        </header>
    );
}
