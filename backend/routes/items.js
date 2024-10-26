var express = require("express");
var router = express.Router();
const controller = require("../controllers/items");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

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
  .get("/", authMiddleware, controller.getAll)
  .get("/:id", authMiddleware, controller.getById)
  .get("/category/:category", authMiddleware, controller.getByCategory)
  .post("/", upload.single("image"), authMiddleware, controller.create)
  .put("/:id", upload.single("image"), authMiddleware, controller.updateItem)
  .patch("/move/:itemId", authMiddleware, controller.moveItem)
  .delete("/:id", authMiddleware, controller.delete);
module.exports = router;
