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
      clientId: req.body.client_id, 
      tableId: req.body.table_id, 
      nombrePersonnes: req.body.nombre_personnes,
      date_reserv: req.body.date_reserv,
    };

    conn.query(
      "INSERT INTO reservations (client_id, table_id, nombre_personnes,date_reserv) VALUES (?, ?, ?, ?)",
      [reservationData.clientId, reservationData.tableId, reservationData.nombrePersonnes,reservationData.date_reserv],
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
      client_id: req.body.client_id,
      table_id: req.body.table_id,
      date_reserv: req.body.date_reserv,
      nombre_personnes: req.body.nombre_personnes,
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


  exports.getUpComingReservationsByClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client ID found", 404));
    }
  
    const clientId = req.params.id;
  
    conn.query(
      "SELECT * FROM reservations WHERE client_id = ? AND date_reserv > sysdate()",
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

  exports.getPastReservationsByClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client ID found", 404));
    }
  
    const clientId = req.params.id;
  
    conn.query(
      "SELECT * FROM reservations WHERE client_id = ? AND date_reserv < sysdate()",
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
  