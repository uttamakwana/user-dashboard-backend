const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHanlder(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(authHeader);

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.startsWith(401);
      throw new Error("User is not authorized or token is missing in header");
    }
  }
});

module.exports = validateToken;
