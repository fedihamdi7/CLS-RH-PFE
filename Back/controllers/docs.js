
const request = require('../models/request');


exports.getDocs = (req, res, next) =>{
    request.find()
    .then(x => res.json(x));
}
