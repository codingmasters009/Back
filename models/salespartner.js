const mongoose = require("mongoose");

const salesPartnerSchema = new mongoose.Schema({
  dateTime: { type: String, default: new Date().toISOString() },
  referenceNo: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  passportIdNo: { type: String, required: true },
  profession: { type: String, required: true },
  registrationPurpose: { type: String, required: true },
  nationality: { type: String, required: true },
  nationalityState: { type: String, required: true },
  nationalityCity: String,
  nationalityPhoneNumber: { type: String, required: true },
  residentialCountry: { type: String, required: true },
  residentialState: { type: String, required: true },
  residentialCity: { type: String },
  personalPhoneNumber:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  residentialAddress: { type: String, required: true },
  gender: { type: String, required: true },
  salesExp:{ type: String, required: true },
  experinceOfYear: { type: String, required: true },
  postalCode: { type: String, required: true },
  PassportIDCopy: { type: String, required: true },
  CurrentPicture: { type: String, required: true },
  ExperianceProfile: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SalesPartnerRegister", salesPartnerSchema);