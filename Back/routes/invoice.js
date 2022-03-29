const express = require('express');
const multer = require('multer');
const router = express.Router();
const Invoice = require("../models/invoice");
const moment = require("moment");

const invoiceController = require('../controllers/invoiceController')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/invoices/'));
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now()+ '-' +name);
    }
});


router.post('/addInvoice',multer({storage:storage}).single("pdf"),(req,res,next)=>{
    let newInvoice = new Invoice();
    newInvoice.supplier = req.body.supplier;
    newInvoice.date = moment(req.body.date).format('YYYY-MM-DD[T00:00:00.000Z]');
    newInvoice.payment_status = req.body.payment_status;
    newInvoice.payment_method = req.body.payment_method;
    newInvoice.amount = req.body.amount;
    newInvoice.Amount_excluding_taxes = req.body.Amount_excluding_taxes;
    newInvoice.file = req.file.filename;
    newInvoice.save((err, invoice) => {
        if (!invoice) {
        console.log(err);
        return res.status(501).json({ message: "error has occurred" });
        }
        return res.status(200).json({invoice, added: true });
    });

})
router.get('/getAllInvoices',invoiceController.getAllInvoices)
router.get('/getInvoiceById/:id',invoiceController.getInvoiceById)
router.get('/getInvoiceBySupplierId/:id',invoiceController.getInvoiceBySupplierId)

module.exports =router;