
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

router.post('',async (req,res)=> {
  console.log(req.body);
    n = req.body.name;
    c = "1111111";

    try{
      var doc = new PDFDocument();
      var pdfFile = path.join(__dirname, 'out2.pdf');
      var pdfStream = fs.createWriteStream(pdfFile);

      doc.fontSize(25).text('ATTESTATION DE TRAVAIL', 150, 80);
        
      doc.image('C:/Users/Legion 5/Desktop/PFE/CLS-RH/Back/assets/cls.jfif',  70, 50, {width: 70});
          
      doc
        .text('', 50, 200)
        .font('Times-Roman', 20)
        .moveDown()
        .text('Je sousigné Mr. '+ n +' Gérant de la société RDH,atteste/attestons par la présente que Mr Salah Ayari titulaire de la CIN N°'+c+', a été salarié (e) au sein de notre société du 01/01/2010 au 31/12/2012 (ou est salarié au sein de la société du 01/01/2012 à ce jour).Cette attestation est délivrée à l’intéressé (e) pour servir et valoir ce que de droit.', {
          width: 500,
          align: 'justify',
          indent: 50,
          columns: 1,
          height: 700,
          ellipsis: true
        }).moveDown()
        .moveDown()
        .moveDown()
        .text('Fait à Tunis le 12/06/2020')
        .moveDown()
        .text('Prénom et nom de l’intermédiaire')
        .text('Signature et cachet');

      doc.pipe(pdfStream);
      // doc.pipe(fs.createWriteStream('C:/Users/Legion 5/Desktop/PFE/CLS-RH/Front/src/assets/pdf/attestation.pdf'));

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

