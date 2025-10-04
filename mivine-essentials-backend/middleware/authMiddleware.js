const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Support both { id } and { user: { id } } payload structures
      const userId = decoded.id || decoded._id || (decoded.user && decoded.user.id);

      if (!userId) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      req.user = await User.findById(userId).select("-password"); // Exclude password

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token Verification Failed", error);
      res.status(401).json({ message: "Not authorized. token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not Authorized as an admin" });
  }
};

module.exports = { protect, admin };
