import React from 'react';
import CountryDataRow from '../country-data-row';
import './style.css';

interface IProps {
    data?: Country;
    onClose: () => void;
}

export default function Country({data, onClose}: IProps) {

    return data ? (
        <div className="country">
            <button className="btn" onClick={onClose}>Close</button>
            <div className="content">
                <img src={data.flags[0]} alt={`${data.name.official} flag`}/>
                <div className="name-official">{data.name.official}</div>
                <div className="name-common">({data.name.common})</div>
                <div className="data-list">
                    <CountryDataRow label="Population" value={data.population.toString()} />
                    <CountryDataRow label="Demonym" value={data.demonyms.eng?.m} />
                </div>
            </div>
        </div>
    ): null;
}
