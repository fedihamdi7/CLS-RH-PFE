
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

router.post('',async (req,res)=> {

    firstName = req.body.firstName || '##First Name##';
    lastName = req.body.lastName || '##Last Name##';
    cin = req.body.cin || '##CIN##';
    date_in = req.body.date_in || '##Date In##';
    date_out = req.body.date_out || '##Date Out##';
    job_title = req.body.job_title || '##Job Title##';
    department = req.body.department || '##Department##';

  
    //today date 
    var today = new Date();
    //format today dat YYYY-MM-DD
    var todayFormat = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    //get unique number from date 
    let unique_number = today.getTime();

    

    logoPath = path.join(__dirname,'../assets/cls.jfif');
    fileName = '../assets/certifications/attestation'+'-'+unique_number+'-'+req.body.id+'.pdf';
    try{
      var doc = new PDFDocument();
      var pdfFile = path.join(__dirname, fileName);
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
          ellipsis: true
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
    pdfStream.addListener('finish', function() {
      // HERE PDF FILE IS DONE
      res.download(pdfFile);
    });
  });


module.exports = router;

