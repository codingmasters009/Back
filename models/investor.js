const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  dateTime: { type: String, default: new Date().toISOString() },
  referenceNo:{ type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String},
  lastName: { type: String, required: true },
  profession:{ type: String, required: true },
  investType: { type: String, required: true },
  investVol: { type: String, required: true },
  investmentInt: { type: String, default: "" },
  investmentStartDate: { type: String, required: true },
  registrationPurpose: { type: String, required: true },
  nationality: { type: String, required: true },
  nationalityState:{ type: String, required: true },
  nationalityCity: { type: String },
  nationalityPhoneNumber: { type: String, required: true },
  businessName: { type: String, required: true },
  residentialCountry:{ type: String, required: true },
  residentialState: { type: String, required: true },
  residentialCity: { type: String },
  personalPhoneNumber:{ type: String, required: true },
  passportIdNo: { type: String, required: true },
  email: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  gender:{ type: String, required: true },
  nationalityAddress: { type: String, required: true },
  PassportIDCopy: { type: String, required: true },
  CurrentPicture: { type: String, required: true },
  termsAccepted:{ type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("InvestorRegister", investorSchema);