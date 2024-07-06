var express = require("express");
var router = express.Router();
const controller = require("../controllers/items");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router
  .get("/", controller.getAll)
  .get("/:id", controller.getById)
  .get("/category/:category", controller.getByCategory)
  .post("/", upload.single("image"), controller.create)
  .patch("/:id", /*upload.single("image"),*/ controller.update)
  .delete("/:id", controller.delete);
module.exports = router;
