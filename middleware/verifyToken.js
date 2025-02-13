// server/middleware/verifyToken.js
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header exists and follows the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
  const token = authHeader.split(" ")[1];

  // Verify the JWT token and decode it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded token data (user info) to req.user
    req.user = decoded; // decoded should contain userId, role, etc.
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
