const express = require("express");
const controllers = require("../controllers/authController");
const authController = express.Router();
const clientController = require("../controllers/clientsController");


authController.route("/login").post(controllers.login);
authController.route("/register").post(clientController.createClient)

// router.route("/reservByClient/:id").get(controllers.createClient);

 
module.exports = authController;


// Avoir une bue globale qui permt de voir toute les reservations avec les nom et prenom des peronnes associées 
//aprouver des reservation 
