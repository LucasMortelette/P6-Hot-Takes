const mongoose = require("mongoose");
const { isEmail } = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

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

//fonction appelée avant de suavegarder un nouveau user  /Mongoose Hook
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;