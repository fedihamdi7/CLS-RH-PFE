const express = require("express");
const router = express.Router();
const Contract = require("../models/contract");
const contractController = require("../controllers/contractController");
var io = require("socket.io")({
  cors: {
    origin: "*",
  },
});
let Arr = [];
function notify() {
  let x = 2022;
   Contract.find({}, (err, contracts) => {
    Arr=contracts
  });
  return Arr;
}
module.exports = notify;
