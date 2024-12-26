const express = require("express");
const { signup, login,test } = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

module.exports = userRouter;
