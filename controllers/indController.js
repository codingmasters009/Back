const User = require("../models/indivitual");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");




exports.createUser = async (req, res) => {
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
    state,
    city,
    personalPhoneNumber,
    gender,
    nationality,
    nationalityState,
    nationalityCity,
    nationalityAddress,
    nationalityPhoneNumber,
    termsAccepted,
  } = req.body;

  try {
    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Generate Reference Number
    const referenceNo = crypto.randomBytes(8).toString("hex");

    // Save User Without File Paths
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
      state,
      city,
      personalPhoneNumber,
      gender,
      nationality,
      nationalityState,
      nationalityCity,
      nationalityAddress,
      nationalityPhoneNumber,
      referenceNo,
      termsAccepted,
    });

    const savedUser = await user.save();

    // Handle File Upload Only After Successful User Creation
    if (req.files?.PassportIDCopy?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.PassportIDCopy[0].path
      );
      savedUser.PassportIDCopy = result.secure_url;
    }
    if (req.files?.CurrentPicture?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.CurrentPicture[0].path
      );
      savedUser.CurrentPicture = result.secure_url;
    }

    await savedUser.save();
    await sendVerificationEmail(email, referenceNo);
    res.status(201).json({ message: "User created successfully", savedUser });
  } catch (error) {
    // Cleanup Uploaded Files in Case of Errors
    if (req.files?.PassportIDCopy?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.PassportIDCopy[0].path);
    }
    if (req.files?.CurrentPicture?.[0]?.path) {
      await cloudinary.uploader.destroy(req.files.CurrentPicture[0].path);
    }

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
};
