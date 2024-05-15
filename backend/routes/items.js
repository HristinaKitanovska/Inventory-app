var express = require("express");
var router = express.Router();
const controller = require("../controllers/items");

router
  .get("/", controller.getAll)
  .get("/:id", controller.getById)
  .get("/category/:category", controller.getByCategory)
  .post("/", controller.create)
  .patch("/:id", /*upload.single("image"),*/ controller.update)
  .delete("/:id", controller.delete);
module.exports = router;
