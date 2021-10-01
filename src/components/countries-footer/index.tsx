import React from 'react';
import './style.css';

interface IProps {
    hasMore: boolean;
    hasPrevious: boolean;
    onNext: () => void;
    onPrevious: () => void;
}

export default function CountriesFooter({hasPrevious, hasMore, onNext, onPrevious}: IProps) {
    return (
        <footer className="countries-footer">
            <button className="btn" disabled={!hasPrevious} onClick={onPrevious}>Previous</button>
            <button className="btn" disabled={!hasMore} onClick={onNext}>Next</button>
        </footer>
    );
}
