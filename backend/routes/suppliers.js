var express = require("express");
var router = express.Router();
const controller = require("../controllers/suppliers");
const authMiddleware = require("../middleware/authMiddleware");

router
  .get("/", authMiddleware, controller.getAllSuppliers)
  .get("/:id", authMiddleware, controller.getSupplierById)
  .post("/", authMiddleware, controller.createSupplier)
  .put("/:id", authMiddleware, controller.updateSupplier)
  .delete("/:id", authMiddleware, controller.deleteSupplier);
module.exports = router;
