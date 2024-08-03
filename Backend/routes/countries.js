const express = require('express');
const { getCountryByCurrency, addFavorite, getFavorites, addSearchHistory, getSearchHistory } = require('../controllers/countryController');
const router = express.Router();

router.get('/currency/:currency', getCountryByCurrency);
router.post('/favorite', addFavorite);
router.get('/favorites/:userId', getFavorites);
router.post('/history', addSearchHistory);
router.get('/history/:userId', getSearchHistory);

module.exports = router;
