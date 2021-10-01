import React from 'react';
import Countries from './components/countries';
import CountriesFooter from './components/countries-footer';
import CountriesHeader from './components/countries-header';
import CountriesList from './components/countries-list';
import CountriesListRow from './components/countries-list-row';
import Country from './components/country';
import './App.css';


/*
* I normally wouldn't have all my utility functions and business logic in this file but I wanted
* you to be able to read all my comments in one place.
*
* I would normally separate them into their own files and have tests along with them.
*
* I hoping you are okay with me building the app in Typescript :D
* */

function mapCountries(data : Country[]): Countries[] {
    return data.map(({flag, name, id}): Countries => ({
        id,
        displayName: `${flag}  ${name.official}`
    }))
}

function App() {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1);
    const [hasPrevious, setHasPrevious] = React.useState<boolean>( false);
    const [hasMore, setHasMore] = React.useState<boolean>(false);
    const [allCountries, setAllCountries] = React.useState<Country[]>([]);
    const [countriesList, setCountriesList] = React.useState<Countries[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isSelectedCountryLoading, setSelectedCountryLoading] = React.useState<boolean>(true);
    const [selectedCountry, setSelectedCountry] = React.useState<string>('');

    React.useEffect(() => {
        fetch("https://restcountries.com/v3/all?fields=name,population,demonyms,flags,flag")
            // I'm not sure why the server wont return the response as a json
            .then((response):Promise<string> => response.text())
            // so I'm converting to a json here
            .then((text):Promise<Country[]> => JSON.parse(text))
            .then((countries: Country[]) => {
                setAllCountries(
                    countries
                        .map((c) => ({...c, id: c.name.official.replaceAll(' ', '_')}))
                        /*
                        * Normally wouldn't sort on large objects like this because it creates a temporary
                        * country object every time.
                        *
                        * Would prefer to pick the property into an array and sort that instead. Then do a look up
                        * to generate the list.
                        *
                        * Even more preferably, the rest api already gives us the data sorted :D
                        * */
                        .sort((a, b) => a.name.official.toLowerCase().localeCompare(b.name.official.toLowerCase()))
                );
                setIsLoading(false);
            });

    }, []);

    React.useEffect(() => {
        const regex = RegExp(searchTerm.toLowerCase(), 'g')
        const list = mapCountries(
            allCountries
                .filter(({name}: Country): boolean => {
                    /*
                    *  I would suggest to drop the search button and listen to input change
                    * after 3 characters and debouncing the search call for 300 ms.
                    * */

                    // If there is no search term then return the full list
                    if(!searchTerm) { return true; }

                    // Checks both common and official names
                    return regex.test(name.common.toLowerCase()) || regex.test(name.official.toLowerCase());
                })
        );

        setCountriesList(list.slice((currentPageNumber - 1) * 10, currentPageNumber * 10));
        setHasPrevious(currentPageNumber !== 1);
        setHasMore(currentPageNumber !== Math.ceil(list.length / 10));
    }, [allCountries, currentPageNumber, searchTerm]);

    React.useEffect(() => {
        if(!selectedCountry) { return; }

        /*
        * Cache the image in the browser to reduce Content Layout shift
        * */
        const img = new Image();

        img.onload = () => {
            setSelectedCountryLoading(false);
        };

        img.src = allCountries.find(({id}) => id === selectedCountry).flags[0];
    }, [selectedCountry])

    return (
        <div className="App">
            {isLoading && <div className="loading" />}
            <Countries>
                <CountriesHeader onSearch={(term) => {
                    setSearchTerm(term);
                    setCurrentPageNumber(1);
                }} />
                <CountriesList>
                    {countriesList.map(({displayName, id}) =>
                        <CountriesListRow
                            key={id}
                            id={id}
                            onClick={(selected) => setSelectedCountry(selected)}
                        >
                            {displayName}
                        </CountriesListRow>)}
                </CountriesList>
                <CountriesFooter
                    hasPrevious={hasPrevious}
                    hasMore={hasMore}
                    onNext={() => { setCurrentPageNumber(currentPageNumber + 1)}}
                    onPrevious={() => { setCurrentPageNumber(currentPageNumber - 1)}}
                />
            </Countries>
            {// Show the loading icon when preload the flag image
                selectedCountry && isSelectedCountryLoading && <div className="loading" />
            }
            {// Show the Country page when the flag image has been cached by the browser
                selectedCountry && !isSelectedCountryLoading && <Country
                    data={
                        allCountries.find(({id}) => id === selectedCountry)
                    }
                    onClose={() => {
                        setSelectedCountry('');
                        setSelectedCountryLoading(true);
                    }}
             />}
        </div>
    );
}

export default App;
