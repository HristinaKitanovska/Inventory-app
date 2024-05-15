var express = require("express");
var router = express.Router();
const controller = require("../controllers/categories");

router.get("/", controller.getAllCategories);
router.post("/", controller.create);
module.exports = router;
