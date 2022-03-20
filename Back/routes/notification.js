const express = require("express");
const router = express.Router();
const moment = require("moment");
const Contract = require("../models/contract");
const contractController = require("../controllers/contractController");
var io = require("socket.io")({
  cors: {
    origin: "*",
  },
});
let Arr = [];
let result=[];
let notifArr=[];
function notify() {
  let currentDate = new Date();
   Contract.find({}, (err, contracts) => {
    Arr=contracts
    //console.log(currentDate.getFullYear());
  });
  for (let contract of Arr){
    let ContractExpires_at = moment(contract["expires_at"]).format("YYYY-MM-DD");
    if (new Date(ContractExpires_at).getFullYear()-currentDate.getFullYear() == 0)
    {
      if(new Date(ContractExpires_at).getMonth()-currentDate.getMonth()<=2){
        notifArr.push(contract)
      }
    }
  }
  result=[...new Set(notifArr)];
  // console.log(result)
  return result;
}
module.exports = notify;
