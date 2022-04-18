const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationsController');
const passport = require('passport');

router.get('/getAllNotifications',passport.authenticate('jwt', { session: false }), notificationController.getAllNotifications);
router.delete('/deleteAllNotifications',passport.authenticate('jwt', { session: false }), notificationController.deleteAllNotifications);
router.delete('/deleteNotification/:id',passport.authenticate('jwt', { session: false }), notificationController.deleteNotification);
module.exports = router;
