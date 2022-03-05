const moment = require('moment');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require('../models/users');

exports.create = (req, fileName, res) =>{
    if(req.body.date_out == null){
        reqdate_out = "Present";
    }else{
      reqdate_out = moment(req.body.date_out).format('YYYY-MM-DD[T00:00:00.000Z]')
    }

    firstName = req.body.firstName || '##First Name##';
    lastName = req.body.lastName || '##Last Name##';
    cin = req.body.cin || '##CIN##';
    date_in = moment(req.body.date_in).format('DD/MM/YYYY') || '##Date In##';
    date_out = moment(reqdate_out).format('DD/MM/YYYY');
    job_title = req.body.job_title || '##Job Title##';
    department = req.body.department || '##Department##';

    User.findOneAndUpdate({_id: req.body.user_id}, {
        lastName: lastName,
        firstName: firstName,
        cin: cin,
        date_in: moment(req.body.date_in).format('YYYY-MM-DD[T00:00:00.000Z]'),
        date_out:  reqdate_out,
        job_title: job_title,
        department: department
    }, {new: true}, function(err, doc){});

    var today = new Date();
    saveToPath = "../../Front/src/assets/pdf/";
    var todayFormat = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    logoPath = path.join(__dirname,'../assets/cls.jfif');

    try{
        var doc = new PDFDocument();
        var pdfFile = path.join(__dirname, saveToPath+req.body.file);
        var pdfStream = fs.createWriteStream(pdfFile);
  
        doc.fontSize(25).text('ATTESTATION DE TRAVAIL', 150, 80);
          
        doc.image(logoPath,  70, 50, {width: 70});
            
        doc
          .text('', 50, 200)
          .font('Times-Roman', 20)
          .moveDown()
          .text('Je sousigné Mr. flen el fouleni Gérant de la société CLS,atteste/attestons par la présente que Mr '+lastName +' '+ firstName+' titulaire de la CIN N°'+cin+', a été salarié (e) au sein de notre société du '+ date_in +' au '+ date_out +' occupé le post de '+ job_title +' au department '+ department +'.Cette attestation est délivrée à l’intéressé (e) pour servir et valoir ce que de droit.', {
            width: 500,
            align: 'justify',
            indent: 50,
            columns: 1,
            height: 700,
            ellipsis: true,
            lineGap : 10
          }).moveDown()
          .moveDown()
          .moveDown()
          .text('Fait à Tunis le '+todayFormat)
          .moveDown()
          .text('Prénom et nom de l’intermédiaire')
          .text('Signature et cachet');
  
        doc.pipe(pdfStream);
        doc.pipe(fs.createWriteStream(pdfFile));
  
        doc.end();
      }catch(err){
        console.error('MakePDF ERROR: ' + err.message);
      }
}