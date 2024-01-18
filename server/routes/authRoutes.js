const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
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
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
