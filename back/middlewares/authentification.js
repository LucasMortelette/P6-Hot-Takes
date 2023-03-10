const jwt = require("jsonwebtoken");
require("dotenv").config();

function token_verif(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
}

module.exports = { token_verif };
