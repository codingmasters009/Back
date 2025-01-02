const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now },
  referenceNo: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  passportIdNo: String,
  profession: String,
  registrationPurpose: String,
  email: { type: String, required: true, unique: true },
  residentialAddress: String,
  residentialCountry: String,
  residentialstate: String,
  residentialcity: String,
  personalPhoneNumber: String,
  gender: String,
  nationality: String,
  nationalityState: String,
  nationalityCity: String,
  nationalityAddress: String,
  nationalityPhoneNumber: String,
  PassportIDCopy: String,
  CurrentPicture: String,
  termsAccepted: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
