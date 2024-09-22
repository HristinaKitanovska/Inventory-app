var express = require("express");
var router = express.Router();
const controller = require("../controllers/categories");
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
  .get("/", authMiddleware, controller.getAllCategories)
  .get("/:id", authMiddleware, controller.getCategoryById)
  .post("/", upload.single("image"), authMiddleware, controller.create)
  .put(
    "/:id",
    upload.single("image"),
    authMiddleware,
    controller.updateCategory
  )
  .delete("/:id", authMiddleware, controller.deleteCategory);

module.exports = router;
