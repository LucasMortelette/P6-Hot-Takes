const mongoose = require("mongoose");
const { isEmail } = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

//Schema user
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Entrez une adresse email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Entrez une adresse email valide"],
  },
  password: {
    type: String,
    required: [true, "Entrez un mot de passe"],
    minlength: [6, "Entrez un mot de passe de 6 caractères minimum"],
  },
});

UserSchema.plugin(uniqueValidator, { message: "Cet email est déjà utilisé" });

//fonction appelée avant de sauvegarder un nouveau user  /Mongoose Hook
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
UserSchema.statics.login = async function (email, password) {
  //verifie si l'email est dans la DB
  const user = await this.findOne({ email });
  if (user) {
    //Si le mail est dans la DB, vérifie si le mot de passe est le bon (bcrypt compare les mdp hash)
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      //si les deux sont bon, retourne le user
      return user;
    }
    throw Error("mot de passe incorrect");
  }
  throw Error("email incorrect");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
