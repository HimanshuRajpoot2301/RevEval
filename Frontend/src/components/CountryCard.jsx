import React from 'react';

const CountryCard = ({ country, isFavorite, toggleFavorite }) => {
    return (
        <div className="country-card">
            <img src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={country.name.common} />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital[0]}</p>
            <p>Currency: {Object.keys(country.currencies)[0]}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
            <button onClick={toggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default CountryCard;
