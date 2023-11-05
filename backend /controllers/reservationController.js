const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllReservations = (req, res, next) => {
    conn.query("SELECT * FROM reservations", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


   exports.createReservation = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 400));

    const reservationData = {
      clientId: req.body.client_id, // l'ID du client associé à la réservation
      tableId: req.body.table_id, // l'ID de la table réservée
      nombrePersonnes: req.body.nombre_personnes,
      dateReservation: req.body.date_reservation, // le nombre de personnes pour la réservation
    };

    conn.query(
      "INSERT INTO reservations (client_id, table_id, nombre_personnes,date_reserv) VALUES (?, ?, ?, ?)",
      [reservationData.clientId, reservationData.tableId, reservationData.nombrePersonnes,reservationData.dateReservation],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));

        res.status(201).json({
          status: "success",
          message: "Reservation created!",
        });
      }
    );
  };

  exports.getReservation = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client id found", 404));
    }
    conn.query(
      "SELECT * FROM reservations WHERE reservation_id = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
  };
  
  exports.updateReservation = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No reservation ID found", 404));
    }
  
    const reservationId = req.params.id;
    const updatedReservationData = {
      clientId: req.body.client_id,
      tableId: req.body.table_id,
      dateReservation: req.body.date_reservation,
      nombrePersonnes: req.body.nombre_personnes,
    };
  
    conn.query(
      "UPDATE reservations SET ? WHERE reservation_id = ?",
      [updatedReservationData, reservationId],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(200).json({
          status: "success",
          message: "Reservation updated!",
        });
      }
    );
  };

  exports.deleteReservation = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No reservation ID found", 404));
    }
  
    const reservationId = req.params.id;
  
    conn.query(
      "DELETE FROM reservations WHERE reservation_id = ?",
      [reservationId],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(200).json({
          status: "success",
          message: "Reservation deleted!",
        });
      }
    );
  };
  
  exports.getReservationsByClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client ID found", 404));
    }
  
    const clientId = req.params.id;
  
    conn.query(
      "SELECT * FROM reservations WHERE client_id = ?",
      [clientId],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
  };
  