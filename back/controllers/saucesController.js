const Sauce = require("../models/sauces");
const fs = require("fs");
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

const deleteSauce = async (req, res) => {
  const id = req.params.id;
  await Sauce.findOne({ _id: id }).then((sauce) => {
    const filename = sauce.imageUrl.split("3000/")[1];
    fs.unlink(`../back/images/${filename}`, (err) => {
      if (err) {
        console.log(err);
      }
      Sauce.deleteOne({ _id: id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((err) => res.status(400).json({ err }));
    });
  });
};

function updateSauce(req, res) {
  const hasNewImage = req.file != null;
  const id = req.params.id;
  //on verifie si il y a une nouvelle image
  if (hasNewImage === true) {
    Sauce.findOne({ _id: id }).then((sauce) => {
      const filename = sauce.imageUrl.split("3000/")[1];
      //on supprime l'ancienne image à l'aide de son nom
      fs.unlinkSync(`../back/images/${filename}`);
      const body = JSON.parse(req.body.sauce);
      const { userId, name, manufacturer, description, mainPepper, heat } =
        body;
      //on sauvegarde la nouvelle image et tous les autres changements
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
          },
        }
      );
      upsauce
        .then((sauces) => res.send({ message: sauces }))
        .catch((err) => console.log(err));
    });
  } else {
    //si aucune nouvelle image, le contenu à recuperer est dans le req.body
    const body = req.body;
    const { userId, name, manufacturer, description, mainPepper, heat } = body;
    console.log(req.body);
    const id = req.params.id;
    //on met à jour toutes les infos sauf l'imageUrl
    const upsauce = Sauce.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          heat: heat,
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
