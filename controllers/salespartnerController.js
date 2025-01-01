const SalesPartner = require("../models/salespartner");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createSalesPartner = async (req, res) => {
  const {
    email,
    firstName,
    middleName,
    lastName,
    passportIdNo,
    profession,
    registrationPurpose,
    nationality,
    nationalityState,
    nationalityCity,
    nationalityPhoneNumber,
    residentialCountry,
    residentialState,
    residentialCity,
    personalPhoneNumber,
    gender,
    salesExp,
    experinceOfYear,
    postalCode,
    termsAccepted,
  } = req.body;

  try {
    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const existingUser = await SalesPartner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const referenceNo = crypto.randomBytes(8).toString("hex");

    const salesPartner = new SalesPartner({
      email,
      firstName,
      middleName,
      lastName,
      passportIdNo,
      profession,
      registrationPurpose,
      nationality,
      nationalityState,
      nationalityCity,
      nationalityPhoneNumber,
      residentialCountry,
      residentialState,
      residentialCity,
      personalPhoneNumber,
      gender,
      salesExp,
      experinceOfYear,
      postalCode,
      referenceNo,
      termsAccepted,
    });

    const savedSalesPartner = await salesPartner.save();

    if (req.files?.PassportIDCopy?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.PassportIDCopy[0].path
      );
      savedSalesPartner.PassportIDCopy = result.secure_url;
    }
    if (req.files?.CurrentPicture?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.CurrentPicture[0].path
      );
      savedSalesPartner.CurrentPicture = result.secure_url;
    }
    if (req.files?.ExperianceProfile?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.ExperianceProfile[0].path
      );
      savedSalesPartner.ExperianceProfile = result.secure_url;
    }

    await savedSalesPartner.save();
    await sendVerificationEmail(email, referenceNo);
    res.status(201).json({ message: "Sales Partner created successfully", savedSalesPartner });
  } catch (error) {
    if (req.files?.PassportIDCopy?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.PassportIDCopy[0].path);
    }
    if (req.files?.CurrentPicture?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.CurrentPicture[0].path);
    }
    if (req.files?.ExperianceProfile?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.ExperianceProfile[0].path);
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getSalesPartner = async (req, res) => {
  try {
    const salesPartner = await SalesPartner.findById(req.params.id);
    if (!salesPartner) return res.status(404).json({ message: "Sales Partner not found." });
    res.status(200).json(salesPartner);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateSalesPartner = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.CurrentPicture = req.files.CurrentPicture?.[0]?.path;
      updates.ExperianceProfile = req.files.ExperianceProfile?.[0]?.path;
    }
    const salesPartner = await SalesPartner.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!salesPartner) return res.status(404).json({ message: "Sales Partner not found." });
    res.status(200).json({ message: "Sales Partner updated successfully", salesPartner });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteSalesPartner = async (req, res) => {
  try {
    const salesPartner = await SalesPartner.findByIdAndDelete(req.params.id);
    if (!salesPartner) return res.status(404).json({ message: "Sales Partner not found." });
    res.status(200).json({ message: "Sales Partner deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};