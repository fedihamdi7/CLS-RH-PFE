const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const moment = require('moment');
const PDFAdmin = require('../pdf/adminValidation');
// Get all requests
router.get('/getAllRequests',(req, res) =>{
    Request.find({}, (err, request)=>{
        if (err) return res.status(500)
        else res.status(200).json({request})
    }).populate('from')
});

// Get request by id

router.get('/getRequestById/:id', (req, res)=>{
    Request.find({_id:req.params.id}, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({request})
    }).populate('from')
})

router.post('/updateStatus/:id',(req, res)=>{
    Request.findOneAndUpdate({_id:req.params.id}, {status:req.body.status, done_date : moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]') }, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({message : "Request updated"})
    })
});

//previw PDF 
router.post('/preview/',(req, res)=>{
    PDFAdmin.create(req);
});


module.exports = router;
