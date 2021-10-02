import React from 'react';
import CountryDataRow from '../country-data-row';
import './style.css';

interface IProps {
    data: Country;
    onClose: () => void;
}

export default function Countries({data, onClose}: IProps) {
    return (
        <div className="country">
            <button className="btn" onClick={onClose}>Close</button>
            <div className="content">
                <img src={data.flags[0]} />
                <div className="name-official">{data.name.official}</div>
                <div className="name-common">({data.name.common})</div>
                <div className="data-list">
                    <CountryDataRow label="Population" value={data.population.toString()} />
                    <CountryDataRow label="Demonym" value={data.demonyms.eng?.m} />
                </div>
            </div>
        </div>
    );
}
