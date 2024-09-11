const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send the token as a response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  registerUser: async (req, res) => {
    const { email, password, name } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create a new user instance
      const newUser = new User({
        name, // add name field
        email,
        password, // no need to hash manually, Mongoose will handle it
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};
