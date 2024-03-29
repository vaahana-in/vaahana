const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// Signup route
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    try {
      const {
        name,
        email,
        password,
        address,
        locationCoords,
        profilePic,
        phoneNumber,
      } = req.body;
      const user = new User({
        name,
        email,
        password,
        address,
        locationCoords,
        profilePic,
        phoneNumber,
      });
      await user.save();
      res
        .status(201)
        .json({ message: "Registration successful", success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(409).json({ message: "Email already taken" });
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.APP_SECRET,
      {
        expiresIn: "6h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
