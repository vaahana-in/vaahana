const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();

const authenticateToken = require("../middlewares/auth");

router.get("/user", authenticateToken, userController.getUser);
module.exports = router;
