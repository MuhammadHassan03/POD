const { User } = require("../../Database/Schemas/USER");
const { generateToken } = require("../../Middlewares/auth");
const bcrypt = require("bcrypt");

const hashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Email already exists" });
    }
    const hash = await hashedPass(password);
    const newUser = new User({ email: email, password: hash });
    await newUser.save();
    const token = generateToken(email);
    res.json({ message: "User signed up successfully", Token: token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Failed to sign up user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: "Invalid Email or Password",
      });
    }
    console.log(user);
    const Valid = await bcrypt.compare(password, user.password);
    if (!Valid) {
      res.status(401).json({
        error: "Invalid Email or Password",
      });
    }
    if (!req.headers.authorization) {
      const token = generateToken(email);
      res.status(200).json({
        message: "Login Success",
        Token: token,
      });
    }
    res.status(200).json({
      message: "Login Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Internal Error, It's not You",
    });
  }
};

module.exports = { signup, login };
