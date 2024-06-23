var express = require("express");
var router = express.Router();
const controller = require("../controllers/categories");
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

router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.post("/", upload.single("image"), controller.create);

module.exports = router;
