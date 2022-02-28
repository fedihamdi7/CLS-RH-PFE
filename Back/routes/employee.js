
const express = require('express');
const router = express.Router();
const docsController = require('../controllers/docs');
const multer = require('multer');
const mongoose = require('mongoose');



router.get('/getDocs',docsController.getDocs);


module.exports = router;

