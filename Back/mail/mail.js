const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

exports.sendToAdmin = (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cls.rh.2022@gmail.com',
            pass:  'xfhedkatasyxpmvg'
        }
    });
  
    //current folder path
  
      const handlebarOptions = {
          viewEngine: {
          extName: ".hbs",
          partialsDir: path.resolve('./views'),
          defaultLayout: false,
          },
          viewPath: path.resolve('./routes/views'),
          extName: ".hbs",
      }
      transporter.use('compile', hbs(handlebarOptions));
  
  
    let mailOptions = {
            from: 'cls.rh.2022@gmail.com', // TODO: email sender
            to: 'fedihamdi97@outlook.fr', // TODO: email receiver
            subject: 'New Document Request',
            template: 'index',
            context: {
                name : req.body.firstName + ' ' + req.body.lastName,
            }
        };
  
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
              return console.log('Error occurs : '+err);
  
          }
          return console.log('Email sent!!!');
      });
      
}