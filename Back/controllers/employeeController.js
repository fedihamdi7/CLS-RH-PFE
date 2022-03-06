const User = require('../models/users');

exports.getEmployees = (req, res, next) => {
    User.find({type: 'employee'}, (err, employee)=>{
        if (err) return res.status(401).json({msg:'no employees yet'})
        else return res.status(200).json({employee})
    })
}