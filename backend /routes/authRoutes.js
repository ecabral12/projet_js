const express = require("express");
const controllers = require("../controllers/authController");
const authController = express.Router();

authController.route("/").post(controllers.login);


 
module.exports = authController;


// Avoir une bue globale qui permt de voir toute les reservations avec les nom et prenom des peronnes associées 
//aprouver des reservation 
