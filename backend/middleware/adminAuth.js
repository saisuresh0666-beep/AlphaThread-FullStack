const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];



    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  

    if (decoded.role !== "admin") {

       console.log(decoded.role)
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = adminAuth;
