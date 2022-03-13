const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController')
router.post('/addContract',contractController.addContract)
router.get('/',contractController.getAllContracts)
router.get('/:id',contractController.getContractById)
router.get('/getContractBySupplierId/:id',contractController.getContractBySupplierId)
module.exports =router;