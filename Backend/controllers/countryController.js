const axios = require('axios');
const User = require('../models/User');

const getCountryByCurrency = async (req, res) => {
    const { currency } = req.params;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${currency}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching country data' });
    }
};

const addFavorite = async (req, res) => {
    const { userId, country } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.favorites.includes(country)) {
            user.favorites.push(country);
            await user.save();
        }
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error adding favorite' });
    }
};

const getFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorites' });
    }
};

const addSearchHistory = async (req, res) => {
    const { userId, search } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.searchHistory.includes(search)) {
            user.searchHistory.unshift(search);
            if (user.searchHistory.length > 5) {
                user.searchHistory.pop();
            }
            await user.save();
        }
        res.json(user.searchHistory);
    } catch (error) {
        res.status(500).json({ error: 'Error adding search history' });
    }
};

const getSearchHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.json(user.searchHistory);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching search history' });
    }
};

module.exports = { getCountryByCurrency, addFavorite, getFavorites, addSearchHistory, getSearchHistory };
