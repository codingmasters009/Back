const Business = require("../models/business");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createBusiness = async (req, res) => {
  const {
    email,
    companyName,
    businessType,
    tradeLicenseNo,
    passportIdNo,
    registrationPurpose,
    postalCode,
    ownerFirstName,
    ownerMiddleName,
    ownerLastName,
    residentialAddress,
    ownerCountry,
    ownerState,
    ownerCity,
    ownerPhoneNumber,
    gender,
    companyNationality,
    companyState,
    completOfficeAddress,
    companyCity,
    ownerAddress,
    nationalityPhoneNumber,
    residentPostalCode,
    termsAccepted,
  } = req.body;

  try {
    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Generate Reference Number
    const referenceNo = crypto.randomBytes(8).toString("hex");

    // Save Business Without File Paths
    const business = new Business({
      email,
      companyName,
      businessType,
      tradeLicenseNo,
      passportIdNo,
      registrationPurpose,
      postalCode,
      ownerFirstName,
      ownerMiddleName,
      ownerLastName,
      residentialAddress,
      ownerCountry,
      ownerState,
      ownerCity,
      ownerPhoneNumber,
      gender,
      companyNationality,
      companyState,
      completOfficeAddress,
      companyCity,
      ownerAddress,
      nationalityPhoneNumber,
      residentPostalCode,
      referenceNo,
      termsAccepted,
    });

    const savedBusiness = await business.save();

    // Handle File Upload Only After Successful Business Creation
    if (req.files?.TradeCopy?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.TradeCopy[0].path);
      savedBusiness.TradeCopy = result.secure_url;
    }
    if (req.files?.PassportIDCopy?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.PassportIDCopy[0].path);
      savedBusiness.PassportIDCopy = result.secure_url;
    }
    if (req.files?.RequestLetter?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.RequestLetter[0].path);
      savedBusiness.RequestLetter = result.secure_url;
    }

    await savedBusiness.save();
    await sendVerificationEmail(email, referenceNo);
    res.status(201).json({ message: "Business created successfully", savedBusiness });
  } catch (error) {
    // Cleanup Uploaded Files in Case of Errors
    if (req.files?.TradeCopy?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.TradeCopy[0].path);
    }
    if (req.files?.PassportIDCopy?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.PassportIDCopy[0].path);
    }
    if (req.files?.RequestLetter?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.RequestLetter[0].path);
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found." });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.TradeCopy = req.files.TradeCopy?.[0]?.path;
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.RequestLetter = req.files.RequestLetter?.[0]?.path;
    }
    const business = await Business.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!business) return res.status(404).json({ message: "Business not found." });
    res.status(200).json({ message: "Business updated successfully", business });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found." });
    res.status(200).json({ message: "Business deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};