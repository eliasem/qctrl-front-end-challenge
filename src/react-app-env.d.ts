/// <reference types="react-scripts" />

interface Countries {
    id: string;
    displayName: string;
}

interface CountryApi {
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

interface Country extends CountryApi{
    id: string;
}
