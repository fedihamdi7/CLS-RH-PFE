const Contract = require("../models/contract");
exports.addContract = (req, res) => {
  let newContract = new Contract();
  newContract.supplier = req.body.supplier;
  newContract.date_signature = req.body.date_signature;
  newContract.expires_at = req.body.expires_at;
  newContract.payment_status = req.body.payment_status;
  switch (req.body.payment_status) {
    case "paid":
      newContract.payment_status = req.body.payment_status;
      newContract.contract_details.payment_date = req.body.payment_date;
      newContract.contract_details.payment_amount = req.body.payment_amount;
      newContract.contract_details.method = req.body.method;
      break;
    case "not_paid":
      newContract.contract_details.method = req.body.method;
      newContract.contract_details.payment_amount = req.body.payment_amount;
      newContract.contract_details.due_date = req.body.due_date;
      break;
    case "paid_by_split":
      newContract.contract_details.method = req.body.method;
      newContract.contract_details.global_amount = req.body.global_amount;
      newContract.contract_details.number_of_slices = req.body.number_of_slices;
      newContract.contract_details.payment_each_slice =
        req.body.payment_each_slice;
      break;
    default:
      break;
  }
  newContract.save((err, contract) => {
    if (!contract) {
      console.log(err);
      return res.status(501).json({ message: "error has occurred" });
    }
    return res.status(200).json(contract);
  });
};
exports.getAllContracts = (req, res) => {
  Contract.find((err, contracts) => {
    if (!contracts) {
      console.log(err);
    }
    return res.status(200).json(contracts);
  });
};
exports.getContractById = (req, res) => {
  Contract.find({ _id: req.params.id }, (err, contract) => {
      if (!contract){
          return res.status(404).json({message:"Contract not found"});
      }
      return res.status(200).json({contract})
  });
};
exports.getContractBySupplierId = (req, res) => {
    Contract.find({ supplier: req.params.id }, (err, contract) => {
        if (!contract){
            return res.status(404).json({message:"Contract not found"});
        }
        return res.status(200).json({contract})
    }).populate("supplier");
  };