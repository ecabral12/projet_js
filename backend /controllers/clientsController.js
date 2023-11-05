const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllClients = (req, res, next) => {
    conn.query("SELECT * FROM clients", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


   exports.createClient = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 400));
  
    const clientData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.téléphone,
      mdp: req.body.mdp

    };
  
    conn.query(
      "INSERT INTO clients (nom, prenom, email, telephone, mdp) VALUES (?, ?, ?, ?, ?)",
      [clientData.nom, clientData.prenom, clientData.email, clientData.telephone, clientData.mdp],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(201).json({
          status: "success",
          message: "Client created!",
        });
      }
    );
  };

  exports.getClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client id found", 404));
    }
    conn.query(
      "SELECT * FROM clients WHERE client_id = ?",
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
  
  exports.updateClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client ID found", 404));
    }
  
    const clientId = req.params.id;
    const updatedClientData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      téléphone: req.body.téléphone,
    };
  
    conn.query(
      "UPDATE clients SET ? WHERE client_id = ?",
      [updatedClientData, clientId],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(200).json({
          status: "success",
          message: "Client updated!",
        });
      }
    );
  };

  exports.deleteClient = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No client ID found", 404));
    }
  
    const clientId = req.params.id;
  
    conn.query(
      "DELETE FROM clients WHERE client_id = ?",
      [clientId],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(200).json({
          status: "success",
          message: "Client deleted!",
        });
      }
    );
  };
  