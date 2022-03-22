const moment = require('moment');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
const User = require('../models/users');
const path = require('path');
const pdfTemplates = require('./templates');


exports.create = (req) =>{
    User.findOneAndUpdate({_id : req.body.user_id}, {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      cin: req.body.cin,
      date_in: moment(req.body.date_in).format('YYYY-MM-DD[T00:00:00.000Z]'),
      date_out: req.body.date_out == null ? "Present" : moment(req.body.date_out).format('YYYY-MM-DD[T00:00:00.000Z]'),
      job_title: req.body.job_title,
      department: req.body.department,
  }, (err, user)=>{});

    firstName = req.body.firstName || '##First Name##';
    lastName = req.body.lastName || '##Last Name##';
    cin = req.body.cin || '##CIN##';
    date_in = moment(req.body.date_in).format('DD/MM/YYYY') || '##Date In##';
    date_out = req.body.date_out == null ? "Present" : moment(req.body.date_out).format('DD/MM/YYYY');
    job_title = req.body.job_title || '##Job Title##';
    department = req.body.department || '##Department##';

    saveToPath = "../assets/certifications/";

    try{
        var pdfFile = path.join(__dirname, saveToPath+req.body.file);
        pdfTemplates.workTemplate(firstName,lastName,cin,date_in,date_out,job_title,department,pdfFile);
      }catch(err){
        console.error('MakePDF ERROR: ' + err.message);
      }
}