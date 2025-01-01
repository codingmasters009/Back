const Investor = require("../models/investor");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createInvestor = async (req, res) => {
  const {
    email,
    firstName,
    middleName,
    lastName,
    passportIdNo,
    profession,
    investType,
    investVol,
    investmentInt,
    investmentStartDate,
    registrationPurpose,
    nationality,
    nationalityState,
    nationalityCity,
    nationalityAddress,
    nationalityPhoneNumber,
    businessName,
    residentialCountry,
    residentialState,
    residentialCity,
    personalPhoneNumber,
    termsAccepted,
  } = req.body;

  try {
    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const existingInvestor = await Investor.findOne({ email });
    if (existingInvestor) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Generate Reference Number
    const referenceNo = crypto.randomBytes(8).toString("hex");

    const investor = new Investor({
      email,
      firstName,
      middleName,
      lastName,
      passportIdNo,
      profession,
      investType,
      investVol,
      investmentInt,
      investmentStartDate,
      registrationPurpose,
      nationality,
      nationalityState,
      nationalityCity,
      nationalityAddress,
      nationalityPhoneNumber,
      businessName,
      residentialCountry,
      residentialState,
      residentialCity,
      personalPhoneNumber,
      referenceNo,
      termsAccepted,
    });

    const savedInvestor = await investor.save();

    if (req.files?.PassportIDCopy?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.PassportIDCopy[0].path
      );
      savedInvestor.PassportIDCopy = result.secure_url;
    }
    if (req.files?.CurrentPicture?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.CurrentPicture[0].path
      );
      savedInvestor.CurrentPicture = result.secure_url;
    }

    await savedInvestor.save();
    await sendVerificationEmail(email, referenceNo);
    res.status(201).json({ message: "Investor created successfully", savedInvestor });
  } catch (error) {
    if (req.files?.PassportIDCopy?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.PassportIDCopy[0].path);
    }
    if (req.files?.CurrentPicture?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.CurrentPicture[0].path);
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getInvestor = async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor) return res.status(404).json({ message: "Investor not found." });
    res.status(200).json(investor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateInvestor = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.CurrentPicture = req.files.CurrentPicture?.[0]?.path;
    }
    const investor = await Investor.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!investor) return res.status(404).json({ message: "Investor not found." });
    res.status(200).json({ message: "Investor updated successfully", investor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteInvestor = async (req, res) => {
  try {
    const investor = await Investor.findByIdAndDelete(req.params.id);
    if (!investor) return res.status(404).json({ message: "Investor not found." });
    res.status(200).json({ message: "Investor deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

