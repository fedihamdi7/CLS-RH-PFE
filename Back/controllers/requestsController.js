const PDFEmployee = require('../pdf/employee');
const mail = require ('../mail/mail');
const Request = require('../models/request');
const moment = require('moment');
const PDFAdmin = require('../pdf/adminValidation');


exports.addRequest = (req, res, next) => {
    user = req.user;
    query = new Request();
    query.from=user._id;
    query.done_date=null;
    query.type=req.body.type;
    query.sent_date = Date.now();
    var today = new Date();
    let unique_number = today.getTime();
    fileName = 'attestation'+'-'+unique_number+'-'+req.body.id+'.pdf';
    PDFEmployee.create(req,fileName);
    mail.sendToAdmin(req);
    query.file=fileName;
    query.save();
    res.json({ success: true, message: 'profile ', query})
}

exports.getRequest = (req, res, next) => {
    user = req.user;
    Request.find({from:user._id, type : req.params.type},(err,request)=>{
        if (err) return res.status(401).json({msg:" you dont have any request"})
        else res.status(200).json({request})
    })
}

exports.getAllRequests = (req, res, next) => {
    Request.find({}, (err, request)=>{
        if (err) return res.status(500)
        else res.status(200).json({request})
    }).populate('from')
}

exports.getRequestById = (req, res, next) => {
    Request.find({_id:req.params.id}, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({request})
    }).populate('from')
}

exports.updateStatus = (req, res, next) => {
    Request.findOneAndUpdate({_id:req.params.id}, {status:req.body.status, done_date : moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]') }, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({message : "Request updated"})
    })
}

exports.preview = (req, res, next) => {
    PDFAdmin.create(req);
}