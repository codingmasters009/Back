const User = require("../models/indivitual");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

exports.createUser = async (req, res, next) => {
  try {
    const PassportIDCopyPath = req.files?.PassportIDCopy?.[0]?.path;
    const CurrentPicturePath = req.files?.CurrentPicture?.[0]?.path;

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("Email already exists.");
    }


    const user = new User({
      ...req.body,
      PassportIDCopy: PassportIDCopyPath,
      CurrentPicture: CurrentPicturePath,
    });

    await user.save();
    await sendVerificationEmail(req.body.email, req.body.referenceNo);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error); 
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found.");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.files) {
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.CurrentPicture = req.files.CurrentPicture?.[0]?.path;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) throw new Error("User not found.");

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("User not found.");

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};