const Sauce = require("../models/sauces");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "images/",
  filename: makeFileName,
});
const upload = multer({ storage: storage });

function makeFileName(req, file, cb) {
  cb(null, file.originalname);
}

const getSauces = async (req, res) => {
  try {
    Sauce.find({}).then((sauces) => res.send(sauces));
  } catch (err) {
    res.status(400).json(err);
  }
};

function createSauce(req, res) {
  const userId = req.body.userId;
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const description = req.body.description;
  const mainPepper = req.body.mainPepper;
  const imageUrl = req.file.destination + req.file.filename;
  const heat = req.body.heat;
  console.log(JSON.stringify(req.body.sauce.name));
  // const sauce = new Sauce({
  //   userId: userId,
  //   name: name,
  //   manufacturer: manufacturer,
  //   description: description,
  //   mainPepper: mainPepper,
  //   imageUrl: imageUrl,
  //   heat: heat,
  //   likes: 0,
  //   dislikes: 0,
  //   usersLiked: [],
  //   usersDisliked: [],
  // });
  // sauce
  //   .save()
  //   .then((sauces) => res.send({ message: sauces }))
  //   .catch(console.log(err));
}

module.exports = {
  upload,
  getSauces,
  createSauce,
};
