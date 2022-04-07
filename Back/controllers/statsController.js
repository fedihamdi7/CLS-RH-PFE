const Leave = require('../models/leave');
const User = require('../models/users');
const contract = require('../models/contract');
const invoice = require('../models/invoice');
const request = require('../models/request');
const supplier = require('../models/supplier');

exports.getStats = (req, res) => {
    //get documents count
    User.countDocuments({}, (err, userCount) => {
        userCount = userCount-1;
        Leave.countDocuments({}, (err, leaveCount) => {
            contract.countDocuments({}, (err, contractCount) => {
                invoice.countDocuments({}, (err, invoiceCount) => {
                    request.countDocuments({}, (err, requestCount) => {
                        supplier.countDocuments({}, (err, supplierCount) => {
                            res.status(200).json({
                                USERS : userCount,
                                LEAVES : leaveCount,
                                CONTRACTS : contractCount,
                                INVOICES : invoiceCount,
                                REQUESTS : requestCount,
                                SUPPLIERS : supplierCount
                            })
                        })
                    })
                })
            })
        })
    })
}