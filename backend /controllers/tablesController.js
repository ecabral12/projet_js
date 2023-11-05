const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllTables = (req, res, next) => {
    conn.query("SELECT * FROM tables", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


   exports.createTable = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 400));
  
    const tableData = {
      capacite: req.body.capacite
    };
  
    conn.query(
      "INSERT INTO tables (capacite) VALUES (?)",
      [ tableData.capacite],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
  
        res.status(201).json({
          status: "success",
          message: "Table created!",
        });
      }
    );
  };

  exports.getTable = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No table  found", 404));
    }
    conn.query(
      "SELECT * FROM tables WHERE table_id = ?",
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
  
  exports.getTablesDispo = (req, res, next) => {
    const { capaciteMin, dateReservation, nombrePersonnes } = req.body;
  
    const sqlQuery = `
      SELECT t.*
      FROM tables t
      WHERE t.capacite >= ? 
      AND t.table_id NOT IN (
        SELECT r.table_id
        FROM reservations r
        WHERE r.date_reserv = ?
        AND r.nombre_personnes = ?
        AND TIMESTAMPDIFF(SECOND, NOW(), r.date_reserv) >= 7200
      );
    `;
  
    conn.query(sqlQuery, [capaciteMin, dateReservation, nombrePersonnes], (err, data, fields) => {
      if (err) {
        return next(new AppError(err, 500));
      }
  
      res.status(200).json({
        status: "success",
        length: data.length,
        data: data,
      });
    });
  };
  
  

exports.updateTable = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No table ID found", 404));
  }

  const tableId = req.params.id;
  const updatedTableData = {
    capacite: req.body.capacite,
  };

  conn.query(
    "UPDATE tables SET ? WHERE table_id = ?",
    [updatedTableData, tableId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));

      res.status(200).json({
        status: "success",
        message: "Table updated!",
      });
    }
  );
};



exports.deleteTable = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No table ID found", 404));
  }

  const tableId = req.params.id;

  conn.query(
    "DELETE FROM tables WHERE table_id = ?",
    [tableId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));

      res.status(200).json({
        status: "success",
        message: "Table deleted!",
      });
    }
  );
};

