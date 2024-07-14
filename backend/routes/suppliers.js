var express = require("express");
var router = express.Router();
const controller = require("../controllers/suppliers");

router
  .get("/", controller.getAllSuppliers)
  .get("/:id", controller.getSupplierById)
  .post("/", controller.createSupplier)
  .patch("/:id", controller.updateSupplier)
  .delete("/:id", controller.deleteSupplier);
module.exports = router;
