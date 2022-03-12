const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContractSchema = new mongoose.Schema({
    supplier: {type : Schema.Types.ObjectId, required: false,ref:"Supplier"},
    date_signature: {type : String,required: true},
    expires_at: {type : String,required: true},
    file: { type: String, required:true}
});
module.exports = mongoose.model('Contract', ContractSchema);