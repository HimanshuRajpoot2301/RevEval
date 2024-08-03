import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        const res = await axios.get(`/api/countries/favorites/${user.id}`);
        setFavorites(res.data);
    };

    return (
        <div>
            <h2>Favorites</h2>
            <div className="favorites-list">
                {favorites.map((countryCode) => (
                
                
                    <CountryCard
                        key={countryCode}
                        country={country}
                        isFavorite={true}
                        toggleFavorite={() => {}}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
