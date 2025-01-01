const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  dateTime: { type: String, default: new Date().toISOString() },
  referenceNo: { type: String, default: "" },
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  profession: { type: String, default: "" },
  investType: { type: String, default: "" },
  investVol: { type: String, default: "" },
  investmentInt: { type: String, default: "" },
  investmentStartDate: { type: String, default: "" },
  registrationPurpose: { type: String, default: "" },
  nationality: { type: String, default: "" },
  nationalityState: { type: String, default: "" },
  nationalityCity: { type: String, default: "" },
  nationalityPhoneNumber: { type: String, default: "" },
  businessName: { type: String, default: "" },
  residentialCountry: { type: String, default: "" },
  residentialState: { type: String, default: "" },
  residentialCity: { type: String, default: "" },
  personalPhoneNumber: { type: String, default: "" },
  passportIdNo: { type: String, default: "" },
  email: { type: String, default: "", unique: true },
  residentialAddress: { type: String, default: "" },
  gender: { type: String, default: "" },
  nationalityAddress: { type: String, default: "" },
  PassportIDCopy: { type: String, default: "" },
  CurrentPicture: { type: String, default: "" },
  termsAccepted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Investor", investorSchema);