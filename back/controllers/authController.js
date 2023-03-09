const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//verifie la presence du token pour donner accès
function token_verif(req, res, next) {
  const header = req.header("Authorization");
  const token = header.split("")[1];

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

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email
  if (err.message === "email incorrect") {
    errors.email = "cet email n'est pas enregistré";
  }
  //incorrect password
  if (err.message === "mot de passe incorrect") {
    errors.email = "mot de passe incorrect";
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// const maxAge = 3 * 24 * 60 * 60;
//creation token
const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "1d",
  });
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.status(201).send({ message: "utilisateur enregistré" });
    // res.status(201).json({ message });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user: user._id, token: token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  token_verif,
  signup_post,
  login_post,
};
