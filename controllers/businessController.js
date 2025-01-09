const Business = require("../models/business");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createBusiness = async (req, res, next) => {
  try {
    const TradeCopyPath = req.files?.TradeCopy?.[0]?.path;
    const RequestLetterPath = req.files?.RequestLetter?.[0]?.path;
    const PassportIDCopyPath = req.files?.PassportIDCopy?.[0]?.path;

    
    const existingUser = await Business.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("Email already exists.");
    }

    const business = new Business({
      ...req.body,
      TradeCopy: TradeCopyPath,
      RequestLetter: RequestLetterPath,
      PassportIDCopy: PassportIDCopyPath,
    });

    const savedBusiness = await business.save();

    await sendVerificationEmail(req.body.email, req.body.referenceNo);

    res.status(201).json({ message: "Business created successfully", savedBusiness });
  } catch (error) {
    next(error);
  }
};

exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) throw new Error("Business not found.");

    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};

exports.updateBusiness = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.files) {
      if (req.files.TradeCopy?.[0]) updates.TradeCopy = req.files.TradeCopy[0].path;
      if (req.files.PassportIDCopy?.[0]) updates.PassportIDCopy = req.files.PassportIDCopy[0].path;
      if (req.files.RequestLetter?.[0]) updates.RequestLetter = req.files.RequestLetter[0].path;
    }

    const business = await Business.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!business) throw new Error("Business not found.");

    res.status(200).json({ message: "Business updated successfully", business });
  } catch (error) {
    next(error);
  }
};

exports.deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) throw new Error("Business not found.");

    res.status(200).json({ message: "Business deleted successfully." });
  } catch (error) {
    next(error);
  }
};
