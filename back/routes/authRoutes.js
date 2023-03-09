const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

//Chiffre le mot de passe et ajoute l'utilisateur à la base de données
router.post("/api/auth/signup", authController.signup_post);

//Vérifie les infos d'identification, en renvoyant l'userID depui la DB et un jeton web JSON signé(contenant également l'identifiant userID)
router.post("/api/auth/login", authController.login_post);

module.exports = router;
