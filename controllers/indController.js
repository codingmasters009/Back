const User = require("../models/indivitual");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");




exports.createUser = async (req, res) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    const PassportIDCopyPath = req.files?.PassportIDCopy?.[0]?.path || null;
    const CurrentPicturePath = req.files?.CurrentPicture?.[0]?.path || null;

    if (!PassportIDCopyPath || !CurrentPicturePath) {
      return res.status(400).json({ message: "Both files must be uploaded." });
    }
    const {
      email,
      firstName,
      middleName,
      lastName,
      passportIdNo,
      profession,
      registrationPurpose,
      residentialAddress,
      residentialCountry,
      residentialstate,
      residentialcity,
      personalPhoneNumber,
      gender,
      nationality,
      nationalityState,
      nationalityCity,
      nationalityAddress,
      nationalityPhoneNumber,
      termsAccepted,
    } = req.body;

    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const referenceNo = crypto.randomBytes(8).toString("hex"); // Generate reference number

    const user = new User({
      email,
      firstName,
      middleName,
      lastName,
      passportIdNo,
      profession,
      registrationPurpose,
      residentialAddress,
      residentialCountry,
      residentialstate,
      residentialcity,
      personalPhoneNumber,
      gender,
      nationality,
      nationalityState,
      nationalityCity,
      nationalityAddress,
      nationalityPhoneNumber,
      PassportIDCopy: PassportIDCopyPath,
      CurrentPicture: PassportIDCopyPath,
      termsAccepted,
      referenceNo,
    });

    await user.save();
    console.log("Uploaded PassportIDCopy path:", PassportIDCopyPath);
    console.log("Uploaded CurrentPicture path:", CurrentPicturePath);
    // Send verification email
    await sendVerificationEmail(email, referenceNo);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.PassportIDCopy = req.files.PassportIDCopy?.[0]?.path;
      updates.CurrentPicture = req.files.CurrentPicture?.[0]?.path;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}