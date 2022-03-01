const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const employeeRouter = require('./routes/employee');
const pdfRouter = require('./routes/pdf')

//connecting to database
mongoose.connect('mongodb+srv://root:root@cluster0.xe2ma.mongodb.net/CLS-RH', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

app.use(bodyParser.json());


// CORS Middleware
app.use(cors());

app.use('/api/employee', employeeRouter);
app.use('/api/pdf', pdfRouter);

module.exports = app;