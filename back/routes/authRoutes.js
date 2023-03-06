const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

//Chiffre le mot de passe et ajoute l'utilisateur à la base de données
router.post("/api/auth/signup", authController.signup_post);

//Vérifie les infos d'identification, en renvoyant l'userID depui la DB et un jeton web JSON signé(contenant également l'identifiant userID)
router.post("/api/auth/login", () => {});

// Renvoie le tableau de toutes les sauces dans la DB
router.get("/api/sauces", () => {});

//Renvoie la sauce avec l'ID fourni
router.get("/api/sauces/:id", () => {});

//Capture en enregistre l'image, analyse la sauce et l'enregistre dans la DB, en definissant correctement son image URL. Remet les sauces aimées et celles détestées à 0, et les sauces userliked et celles userdilsiked aux tableaux vides
router.post("/api/sauces", () => {});

//Met à jour la suace avec id fourni, nouvelle image.
router.put("/api/sauces/:id", () => {});

//Supprime la sauce avec l'ID fourni
router.delete("/api/sauces/:id", () => {});

//Définit le statut "j'aime" pour UserID fourini.  Si j'aime = 0,l'utilisateur annule cequ'il aime ou ce qu'iln'aime pas. Si j'aime =-1, l'utilisateur n'aimepas la sauce.L'identifiant del'utilisateur doit êtreajouté ou supprimé dutableau approprié, en gardant une trace deses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime"
router.post("/api/sauces/:id/like", () => {});

module.exports = router;
