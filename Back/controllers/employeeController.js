const User = require('../models/users');
const moment = require('moment');
const bcrypt = require("bcryptjs");

exports.getEmployees = (req, res, next) => {
    User.find({
        type: 'employee'
    }, (err, employee) => {
        if (err) return res.status(401).json({
            msg: 'no employees yet'
        })
        else return res.status(200).json({
            employee
        })
    })
}

exports.getEmployeeById = (req, res, next) => {
    User.findById(req.params.id, (err, employee) => {
        if (err) return res.status(401).json({
            msg: 'no employee found'
        })
        else return res.status(200).json(employee)
    })
}

exports.updateEmployeeProfile = (req, res, next) => {
    if (req.body.password == null) {
        User.findOne({_id : req.params.id}, (err, employee) => {
            employee.first_name = req.body.first_name;
            employee.last_name = req.body.last_name;
            employee.email = req.body.email;
            employee.phone = req.body.phone;
            employee.cin = req.body.cin;
            employee.job_title = req.body.job_title;
            employee.department = req.body.department;
            employee.save((err, employee) => {
                if (err) return res.status(401).json({
                    update: false
                })
                else return res.status(200).json({
                    updated: true
                })
            })
        })

    } else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            //Use this salt value to hash password
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                req.body.password = hash;
                User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
                    if (err) return res.status(401).json({
                        update: false
                    })
                    else return res.status(200).json({
                        updated: true
                    })
                })
            });
        });
    }
}

exports.editUser = (req, res, next) => {
    if (req.body.date_in) req.body.date_in = moment(req.body.date_in).format('YYYY-MM-DD[T00:00:00.000Z]');
    if (req.body.date_out) req.body.date_out = moment(req.body.date_out).format('YYYY-MM-DD[T00:00:00.000Z]');

    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return res.status(401).json({
            update: false
        })
        else return res.status(200).json({
            updated: true
        })
    })
}