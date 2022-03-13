const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var passport = require('passport')

const employeeRouter = require('./routes/employee');
const requestRouter = require('./routes/Request');
const supplierRouter = require('./routes/supplier');
const contractRouter = require('./routes/contract');

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
app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport)
app.use('/api/employee', employeeRouter);
app.use('/api/request',requestRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/contract',contractRouter);

module.exports = app;