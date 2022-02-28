const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    from: {type : String, required: false},
    sent_date: {type : String, required: false},

    
});

module.exports = mongoose.model('Request', RequestSchema);