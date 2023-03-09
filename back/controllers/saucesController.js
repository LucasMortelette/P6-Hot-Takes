const Sauce = require("../models/sauces");
const jwt = require("jsonwwebtoken");
const { token_verif } = require("../controllers/authController");
require("dotenv").config();

const getSauces = async (req, res) => {
  try {
    // const token = await token_verif();
    // Sauce.find({}).then((sauces) =>
    res.send(["sauce1", "sauce2"]);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createSauce = async (req, res) => {
  const sauce = new Sauce({
    userId: "test",
    name: "test",
    manufacturer: "test",
    description: "test",
    mainPepper: "test",
    imageUrl: "test",
    heat: 3,
    likes: 3,
    dislikes: 3,
    usersLiked: ["test"],
    usersDisliked: ["test"],
  });
  sauce
    .save()
    .then((res) => console.log("sauce enregistrée", res))
    .catch(console.log(err));
};

module.exports = {
  getSauces,
  createSauce,
};
