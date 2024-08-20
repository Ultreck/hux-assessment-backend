const { verifyToken } = require("../utils/jwtUtils");
const authenticateJWT = (req, res, next)  => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token, req);
  

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  req.user = decoded;
  next();
}

module.exports = authenticateJWT;
