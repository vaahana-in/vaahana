const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.userId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
