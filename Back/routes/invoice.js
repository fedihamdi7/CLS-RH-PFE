const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController')
router.post('/addInvoice',invoiceController.addInvoice)
router.get('/getAllInvoices',invoiceController.getAllInvoices)
router.get('/getInvoiceById/:id',invoiceController.getInvoiceById)
router.get('/getInvoiceBySupplierId/:id',invoiceController.getInvoiceBySupplierId)

module.exports =router;