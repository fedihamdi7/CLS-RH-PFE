const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationsController');

router.get('/getAllNotifications', notificationController.getAllNotifications);
router.delete('/deleteNotification/:id', notificationController.deleteNotification);
module.exports = router;
