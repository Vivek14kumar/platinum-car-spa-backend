import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
     console.log("Request body:", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("User Find:", user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    /*const isMatch = await user.matchPassword(password);
    //console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });*/
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
