/// <reference types="react-scripts" />

interface Country {
    flags: string[];
    name: {
        common: string;
        official: string;
        nativeName: {
            eng?: {};
        };
    };
    demonyms: {
        eng ?: {
            f: string;
            m: string;
        };
    };
    flag: string;
    population: number;
}
