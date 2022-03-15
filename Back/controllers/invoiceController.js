const Invoice = require("../models/invoice");
const moment = require('moment');

exports.addInvoice = (req, res) => {
  let newInvoice = new Invoice();
  newInvoice.supplier = req.body.supplier;
  newInvoice.date = moment(req.body.date).format('YYYY-MM-DD[T00:00:00.000Z]');
  newInvoice.payment_status = req.body.payment_status;
  newInvoice.payment_method = req.body.payment_method;
  newInvoice.amount = req.body.amount;
  newInvoice.Amount_excluding_taxes = req.body.Amount_excluding_taxes;

  newInvoice.save((err, invoice) => {
    if (!invoice) {
      console.log(err);
      return res.status(501).json({ message: "error has occurred" });
    }
    return res.status(200).json({invoice, added: true });
  });
};
exports.getAllInvoices = (req, res) => {
    Invoice.find((err, invoices) => {
      if (!invoices) {
        console.log(err);
      }
      return res.status(200).json(invoices);
    }).populate("supplier");
};
exports.getInvoiceById = (req, res) => {
    Invoice.find({ _id: req.params.id }, (err, invoice) => {
        if (!invoice){
            return res.status(404).json({message:"invoice not found"});
        }
        return res.status(200).json(invoice[0]);
    });
};
exports.getInvoiceBySupplierId = (req, res) => {
    Invoice.find({ supplier: req.params.id }, (err, invoice) => {
        if (!invoice){
            return res.status(404).json({message:"invoice not found"});
        }
        return res.status(200).json(invoice)
    }).populate("supplier");
  };