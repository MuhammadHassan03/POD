const extractJwt = require("passport-jwt").ExtractJwt;
const jwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const { User } = require("../Database/Schemas/USER");
const jwt = require("jsonwebtoken");

//TODO ENV IS NOT ORKING HERE REPLACING IT STATIC FOR NOW
const secretKey = "HASSAN";

function authenticateToken(req, res, next) {
  if (req.url === "/signup") {
    next();
  } else {
    try {
      const token = req?.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(token, secretKey, (err, proceed) => {
          if (err) {
            res.status(401).json({
              error: "Unauthorized",
            });
          } else {
            next();
          }
        });
      }
    } catch (error) {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
  }
}

const generateToken = (id) => {
  return jwt.sign({ id: id }, secretKey, {
    expiresIn: "1m",
  });
};

module.exports = {
  authenticateToken,
  generateToken,
};
