var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");

router
  .post("/login", controller.loginUser)
  .post("/register", controller.registerUser);

module.exports = router;
