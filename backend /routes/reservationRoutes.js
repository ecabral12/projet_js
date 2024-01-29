const express = require("express");
const controllers = require("../controllers/reservationController");
const reservController = express.Router();

reservController.route("/").get(controllers.getAllReservations).post(controllers.createReservation);
reservController
 .route("/:id")
 .get(controllers.getReservation)
 .put(controllers.updateReservation)
 .delete(controllers.deleteReservation);

 reservController.route("/reservClient/:id").get(controllers.getReservationsByClient)
 reservController.route("/reservPastClient/:id").get(controllers.getPastReservationsByClient)
 reservController.route("/reservUpcomingClient/:id").get(controllers.getUpComingReservationsByClient)



 
module.exports = reservController;


// Avoir une bue globale qui permt de voir toute les reservations avec les nom et prenom des peronnes associées 
//aprouver des reservation 
