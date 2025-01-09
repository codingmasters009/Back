const SalesPartner = require("../models/salespartner");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createSalesPartner = async (req, res, next) => {
  
  try {
    const PassportIDCopyPath = req.files?.PassportIDCopy?.[0]?.path;
    const CurrentPicturePath = req.files?.CurrentPicture?.[0]?.path;
    const ExperianceProfilePath = req.files?.ExperianceProfile?.[0]?.path;

   

    const existingUser = await SalesPartner.findOne({ email: req.body.email});
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const salesPartner = new SalesPartner({
      ...req.body,
      PassportIDCopy: PassportIDCopyPath,
      CurrentPicture: CurrentPicturePath,
      ExperianceProfile: ExperianceProfilePath,
    });


    await salesPartner.save();
    await sendVerificationEmail(req.body.email, req.body.referenceNo);

    res.status(201).json({ message: "Sales Partner created successfully", salesPartner });
  } catch (error) {
    next(error); 
  }
};

exports.getSalesPartner = async (req, res, next) => {
  try {
    const salesPartner = await SalesPartner.findById(req.params.id);
    if (!salesPartner) throw new Error("User not found.");

    res.status(200).json(salesPartner);
  } catch (error) {
    next(error);
  }
};

exports.updateSalesPartner = async (req, res, next) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.CurrentPicture = req.files.CurrentPicture?.[0]?.path;
      updates.ExperianceProfile = req.files.ExperianceProfile?.[0]?.path;
    }
    const salesPartner = await SalesPartner.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!salesPartner) throw new Error("User not found.");

    res.status(200).json({ message: "Sales Partner updated successfully", salesPartner });
  } catch (error) {
    next(error);
  }
};

exports.deleteSalesPartner = async (req, res, next) => {
  try {
    const salesPartner = await SalesPartner.findByIdAndDelete(req.params.id);
    if (!salesPartner) throw new Error("User not found.");

    res.status(200).json({ message: "Sales Partner deleted successfully." });
  } catch (error) {
    next(error);
  }
};