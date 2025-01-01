const mongoose = require("mongoose");

const salesPartnerSchema = new mongoose.Schema({
  dateTime: { type: String, default: new Date().toISOString() },
  referenceNo: { type: String, default: "" },
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  passportIdNo: { type: String, default: "" },
  profession: { type: String, default: "" },
  registrationPurpose: { type: String, default: "" },
  nationality: { type: String, default: "" },
  nationalityState: { type: String, default: "" },
  nationalityCity: { type: String, default: "" },
  nationalityPhoneNumber: { type: String, default: "" },
  residentialCountry: { type: String, default: "" },
  residentialState: { type: String, default: "" },
  residentialCity: { type: String, default: "" },
  personalPhoneNumber: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  residentialAddress: { type: String, default: "" },
  gender: { type: String, default: "" },
  salesExp: { type: String, default: "" },
  experinceOfYear: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  PassportIDCopy: { type: String, default: "" },
  CurrentPicture: { type: String, default: "" },
  ExperianceProfile: { type: String, default: "" },
  termsAccepted: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SalesPartner", salesPartnerSchema);