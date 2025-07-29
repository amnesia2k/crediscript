import jwt from "jsonwebtoken";

export function generateToken(userId) {
  return jwt.sign(
    { _id: userId, purpose: "authentication" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}
