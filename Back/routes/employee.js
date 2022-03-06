
const express = require('express');
const router = express.Router();
const passport = require('passport');

///Controllers 
const AuthController = require('../controllers/authController');
const RequestController = require('../controllers/requestsController');
const EmployeeController = require('../controllers/employeeController');


//Login
router.post('/login', AuthController.login);
//Registration
router.post('/register', AuthController.register);
//Add Request
router.post('/addRequest', passport.authenticate('jwt', { session: false }), RequestController.addRequest);
//Get all requests
router.get('/getRequest', passport.authenticate('jwt', { session: false }), RequestController.getRequest);
//Get  all employees
router.get('/getEmployees', EmployeeController.getEmployees);

module.exports = router;

