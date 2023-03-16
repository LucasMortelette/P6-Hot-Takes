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
  const body = JSON.parse(req.body.sauce);
  const { userId, name, manufacturer, description, mainPepper, heat } = body;
  const imageUrl = "http://localhost:3000/" + req.file.filename;
  const sauce = new Sauce({
    userId: userId,
    name: name,
    manufacturer: manufacturer,
    description: description,
    mainPepper: mainPepper,
    imageUrl: imageUrl,
    heat: heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then((sauces) => res.send({ message: sauces }))
    .catch((err) => console.log(err));
}

function getSauces_id(req, res) {
  try {
    const id = req.params.id;
    Sauce.findOne({ _id: id }, function (err, sauce) {
      res.send(sauce);
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

function deleteSauce(req, res) {
  const id = req.params.id;
  Sauce.remove({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/sauces");
  });
}

function updateSauce(req, res) {
  const hasNewImage = req.file != null;
  if (hasNewImage) {
    const body = req.body.sauce;
    const { userId, name, manufacturer, description, mainPepper, heat } = body;
    const id = req.params.id;
    const imageUrl = "http://localhost:3000/" + req.file.filename;
    const upsauce = Sauce.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          imageUrl: imageUrl,
          heat: heat,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
        },
      }
    );
    upsauce
      .then((sauces) => res.send({ message: sauces }))
      .catch((err) => console.log(err));
  } else {
    const body = req.body;
    const { userId, name, manufacturer, description, mainPepper, heat } = body;
    console.log(req.body);
    const id = req.params.id;
    const upsauce = Sauce.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          heat: heat,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
        },
      }
    );
    upsauce
      .then((sauces) => res.send({ message: sauces }))
      .catch((err) => console.log(err));
  }
}

module.exports = {
  upload,
  getSauces,
  createSauce,
  getSauces_id,
  deleteSauce,
  updateSauce,
};
