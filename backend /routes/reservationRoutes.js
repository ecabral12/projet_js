const express = require("express");
const controllers = require("../controllers/reservationController");
const reservController = express.Router();

reservController.route("/").get(controllers.getAllReservations).post(controllers.createReservation);
reservController
 .route("/:id")
 .get(controllers.getReservation)
 .put(controllers.updateReservation)
 .delete(controllers.deleteReservation);


 
module.exports = reservController;


// Avoir une bue globale qui permt de voir toute les reservations avec les nom et prenom des peronnes associées 