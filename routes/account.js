const express = require('express');
const router = express.Router();
const { getCurrentUser, ensureAuthenticated } = require('../controllers/authController');
const { getEventsByUserId, getFavoriteEvents } = require('../controllers/eventController');

router.get('/', ensureAuthenticated, async (req, res) => {
    console.log('Rendering My Account page...');
    const user = getCurrentUser(req);
    const user_events = await getEventsByUserId(user._id);
    const user_fav_events = await getFavoriteEvents(req, res);
    res.render('account', { title: 'My Account', user: user, user_events: user_events, user_fav_events: user_fav_events });
});

module.exports = router;
