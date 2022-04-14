const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }),statsController.getStats);
module.exports = router;
