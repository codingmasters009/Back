const Investor = require("../models/investor");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createInvestor = async (req, res, next) => {
  
  try {
    const PassportIDCopyPath = req.files?.PassportIDCopy?.[0]?.path;
    const CurrentPicturePath = req.files?.CurrentPicture?.[0]?.path;

    const existingInvestor = await Investor.findOne({  email: req.body.email });
    if (existingInvestor) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const investor = new Investor({
      ...req.body,
      PassportIDCopy: PassportIDCopyPath,
      CurrentPicture: CurrentPicturePath,
      
    });

     await investor.save();
    await sendVerificationEmail( req.body.email, req.body.referenceNo);

    res.status(201).json({ message: "Investor created successfully", investor });
  } catch (error) {
    next(error); 
  }
};

exports.getInvestor = async (req, res, nest) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor) return res.status(404).json({ message: "Investor not found." });
    
    res.status(200).json(investor);
  } catch (error) {
    next(error);
  }
};

exports.updateInvestor = async (req, res, next) => {
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
    next(error);
  }
};

exports.deleteInvestor = async (req, res, next) => {
  try {
    const investor = await Investor.findByIdAndDelete(req.params.id);
    if (!investor) return res.status(404).json({ message: "Investor not found." });
   
    res.status(200).json({ message: "Investor deleted successfully." });
  } catch (error) {
    next(error);
  }
};

