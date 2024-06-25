const express = require("express");
const controllers = require("../controllers/clientsController");
const router = express.Router();

router.route("/").get(controllers.getAllClients).post(controllers.createClient);
router
 .route("/:id")
 .get(controllers.getClient)
 .put(controllers.updateClient)
 .delete(controllers.deleteClient); 
 //create a new endpoint

 //router.route("/reservByClient/:id").get(controllers.createClient);

module.exports = router;