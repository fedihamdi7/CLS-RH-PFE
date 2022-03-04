
const express = require('express');
const router = express.Router();
const docsController = require('../controllers/docs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const passport = require('passport');
const Request = require('../models/request');
const moment = require('moment');


router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email }
        //Check the user exists
    User.findOne(query, (err, user) => {
        //Error during exuting the query
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again'
            });
        }

        //No User match the search condition
        if (!user) {
            return res.send({
                success: false,
                message: 'Error, Account not found'
            });
        }

        //Check if the password is correct
        user.isPasswordMatch(password, user.password, (err, isMatch) => {

            //Invalid password
            if (!isMatch) {
                return res.status(400).send({
                    success: false,
                    message: 'Error, Invalid Password'
                });
            }

            //User is Valid

            const ONE_WEEK = 604800; //Token validtity in seconds

            //Generating the token
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });
            // console.log(token)
                //console.log( jwt.decode(token))
                //User Is Valid
                //This object is just used to remove the password from the returned fields
            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id,
            }
            user.password=""
            //Send the response back
            return res.status(200).send({
                success: true,
                message: 'You are logged in now',
                user,
                token
            });
        });

    });

});

//Registration
router.post('/register', (req, res, next) => {

    let newUser = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        cin:req.body.cin,
        date_in: moment(req.body.date_in).format('YYYY-MM-DD[T00:00:00.000Z]'),
        date_out:  moment(req.body.date_out).format('YYYY-MM-DD[T00:00:00.000Z]') ? req.body.date_out : "Present",
        job_title:req.body.job_title,
        department: req.body.department,
    });
    const query = req.body.email;
    //Check the user exists
    User.findOne({ email: req.body.email }, (err, user) => {
        //Error during exuting the query
        if (user) {
            return res.send({
                success: false,
                message: 'Error, User already exists'
            });
        } else {
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Failed to save the user'
                    });
                }
                res.send({
                    success: true,
                    message: 'User Saved',
                    user
                });
            });
        }
    });

});

router.post('/addRequest', passport.authenticate('jwt', { session: false }),(req, res, next)=>{
    user = req.user;
    let type = req.body.type || 'work';
    query = new Request();
    query.from=user._id;
    query.done_date=null;
    query.type=type;
    query.sent_date = Date.now();
    query.save();
    res.json({ success: true, message: 'profile ', query})

})
router.get('/getDocs',docsController.getDocs);

router.get('/getRequest', passport.authenticate('jwt', { session: false }), (req, res)=>{
    user = req.user;
    Request.find({from:user._id},(err,request)=>{
        if (err) return res.status(401).json({msg:" you dont have any request"})
        else res.status(200).json({request})
    })
})
//Get  all employees
router.get('/getEmployees',(req, res, next)=>{
    User.find({type: 'employee'}, (err, employee)=>{
        if (err) return res.status(401).json({msg:'no employees yet'})
        else return res.status(200).json({employee})
    })
});

module.exports = router;

