const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (req.body.role) {
    return res
      .status(400)
      .json({ message: "You cannot send the role in req.body" });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const isExistUser = await UserModel.findOne({ email });

    if (isExistUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      await UserModel.create({ name, email, password: hash });
      res.status(200).json({ message: "User Created succesfully" });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const isExistUser = await UserModel.findOne({ email });

  if (!isExistUser) {
    return res.status(400).json({ message: "Please signup" });
  }

  bcrypt.compare(password, isExistUser.password, function (err, result) {
    if (err) {
      return res.status(400).json({ message: "error in comparing.." });
    }

    if (result) {
      const { password, ...rest } = isExistUser._doc;
      jwt.sign({ userdata: rest }, process.env.privateKey, function (err, token) {
        if (err) {
          return res
            .status(400)
            .json({ message: "Error while creating token" });
        }

        res
          .cookie("verificationToken", token)
          .status(200)
          .json({ message: "User login succesfully", userData: rest });
      });
    } else {
      return res.status(400).json({ message: "incorrect password" });
    }
  });
};

module.exports = { signup, login };
