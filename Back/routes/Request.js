const express = require('express');
const router = express.Router();
const Request = require('../models/request');
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

module.exports = router;
