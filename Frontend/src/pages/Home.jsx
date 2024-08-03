import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        if (user) {
            fetchHistory();
            fetchFavorites();
        }
    }, [user]);

    const fetchHistory = async () => {
        const res = await axios.get(`/api/countries/history/${user.id}`);
        setHistory(res.data);
    };

    const fetchFavorites = async () => {
        const res = await axios.get(`/api/countries/favorites/${user.id}`);
        setFavorites(res.data);
    };

    const searchCountries = async () => {
        const res = await axios.get(`/api/countries/currency/${search}`);
        setCountries(res.data);
        if (user) {
            await axios.post('/api/countries/history', { userId: user.id, search });
            fetchHistory();
        }
    };

    const toggleFavorite = async (country) => {
        await axios.post('/api/countries/favorite', { userId: user.id, country });
        fetchFavorites();
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by currency code..."
            />
            <button onClick={searchCountries}>Search</button>
            <div>
                <h2>Search History</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Countries</h2>
                <div className="countries-list">
                    {countries.map((country) => (
                        <CountryCard
                            key={country.cca2}
                            country={country}
                            isFavorite={favorites.includes(country.cca2)}
                            toggleFavorite={() => toggleFavorite(country.cca2)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
