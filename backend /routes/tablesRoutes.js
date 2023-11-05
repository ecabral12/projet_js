const express = require("express");
const controllers = require("../controllers/tablesController");
const tableRouter = express.Router();

tableRouter.route("/").get(controllers.getAllTables).post(controllers.createTable);
tableRouter
 .route("/:id")
 .get(controllers.getTable)
 .put(controllers.getTable)
 .delete(controllers.getTable);

 tableRouter.route("/tablesDispo").post(controllers.getTablesDispo);

module.exports = tableRouter;