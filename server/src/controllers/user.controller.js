import User from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generate-token.js";

// ✅ GET ALL USERS (exclude passwords)
export const getUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password"); // always hide password

    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: { users },
    });
  } catch (err) {
    console.error("❌ getUsers error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ GET CURRENT USER (/me) - requires protectRoute middleware to set req.user
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found",
      });
    }

    // Convert mongoose doc to plain JS object
    const user = req.user.toObject();

    // Remove sensitive info just in case
    delete user.password;

    res.status(200).json({
      message: "Current user fetched successfully",
      success: true,
      data: { user },
    });
  } catch (err) {
    console.error("❌ getCurrentUser error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ CREATE USER (register)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, bio = "This user has no bio" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email address already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = newUser.toObject();
    delete user.password;
    user.token = token;

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: { user },
    });
  } catch (err) {
    console.error("❌ createUser error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    safeUser.token = token;

    res.status(200).json({
      message: "Login successful",
      success: true,
      data: { user: safeUser },
    });
  } catch (err) {
    console.error("❌ loginUser error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ LOGOUT USER
export const logoutUser = async (_req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error("❌ logoutUser error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
