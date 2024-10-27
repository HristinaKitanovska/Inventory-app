var express = require("express");
var router = express.Router();
const controller = require("../controllers/invoices");
const authMiddleware = require("../middleware/authMiddleware");

router
  .get("/count", authMiddleware, controller.getInvoicesCount)
  .post("/create", authMiddleware, controller.createInvoice);
module.exports = router;
