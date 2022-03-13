const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController')
router.post('/addContract',contractController.addContract)
router.get('/',(req, res) =>{return res.json({msg:"uidfisu"})})
module.exports =router;