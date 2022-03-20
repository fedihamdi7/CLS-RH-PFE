const express = require("express");
const router = express.Router();
const moment = require("moment");
const Contract = require("../models/contract");
const contractController = require("../controllers/contractController");
const mail = require("../mail/mail");
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
   Contract.find({},async (err, contracts) =>  {
    Arr= contracts
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
  result= [...new Set(notifArr)];
  // for(let contract of [...new Set(result)]){
  //   console.log("sending notification")
  //    mail.sendNotification(contract);

  // }
  //console.log(result)
  return notifArr;
}
function sendNotification(){
  let contracts=notify();
  console.log('testtt----------')
  // console.log([...new Set(contracts)])
   for(let contract of [...new Set(contracts)]){
    console.log("sending notification")
     //mail.sendNotification(contract);

  }
}
module.exports = sendNotification;
