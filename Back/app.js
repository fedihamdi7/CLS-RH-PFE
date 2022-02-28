const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const employeeRouter = require('./routes/employee');


//connecting to database
mongoose.connect('mongodb://localhost:27017/CLS-RH', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

app.use(bodyParser.json());


// CORS Middleware
app.use(cors());

app.use('/api/employee', employeeRouter);
module.exports = app;