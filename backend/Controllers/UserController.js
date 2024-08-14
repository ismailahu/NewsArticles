const mongoose = require("mongoose");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UnauthorizedError, BadRequestError } = require("../Middlewares/ErrorHandling/Errors");

const SignUp = async (req, res, next) => {
  try {
    const { UserName, Password, Name, Category } = req.body;

    (UserName, Password, Name, Category)


    if (!UserName || !Password)
      return res.status(400).json({ error: "Please provide complete info!" });

    const saltRounds = 10;
    req.body.Password = await bcrypt.hash(req.body.Password, saltRounds);

    const user = await User.create(req.body);

    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(
      { UserName: user.UserName, Password: user.Password },
      jwtSecret,
      { expiresIn: "3d" }
    );

    // Create a copy of the user object
    const userWithoutPassword = { ...user };

    // Delete the Password field from the copy
    delete userWithoutPassword.Password;

    // delete userWithoutPassword.Password;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};

const SignIn = async (req, res, next) => {
  try {
    const { UserName, Password } = req.body;

    (req.body)

    const user = await User.findOne({ UserName });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const jwtSecret = process.env.JWT_SECRET || 'ldasfkadshiuoi';

    const token = jwt.sign(
      { UserName: user.UserName, Password: user.Password },
      jwtSecret,
      { expiresIn: "3d" }
    );

    const userWithoutPassword = {...user};
    delete userWithoutPassword.Password;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  SignUp,
  SignIn,
};
