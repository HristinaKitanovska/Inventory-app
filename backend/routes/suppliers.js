var express = require("express");
var router = express.Router();
const controller = require("../controllers/suppliers");

router.get("/", controller.getAllSuppliers);

module.exports = router;
