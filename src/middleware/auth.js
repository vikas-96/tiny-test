const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers?.authorization) {
      console.log("1");
      return res.status(401).json({
        message: "Not Authorized to access",
      });
    }
    const [Bearer, token] = req.headers?.authorization.split(" ");

    if (!Bearer || Bearer !== "Bearer") {
      console.log("2");
      return res.status(401).json({
        message: "Not Authorized to access",
      });
    }

    if (!token) {
      console.log("3");
      return res.status(401).json({
        message: "Not Authorized to access",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Please provide a valid token",
        });
      }

      req.decoded = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  isAuthenticated: verifyToken,
};
