const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, process.env.APP_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }
};

module.exports = authenticateToken;
