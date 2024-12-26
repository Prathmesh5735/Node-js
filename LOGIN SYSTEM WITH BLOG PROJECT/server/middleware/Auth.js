const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const { verificationToken } = req.cookies;
  if (!verificationToken) {
    return res.status(400).json({ message: "Login again" });
  }

  jwt.verify(
    verificationToken,
    process.env.privateKey,
    function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: err });
      }

      req.user = decoded.userdata;
      next();
    }
  );
};

module.exports = isAuth;
