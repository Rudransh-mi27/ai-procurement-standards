const express = require("express");
const multer = require("multer");

const documentController = require("../controllers/document_controller");
const requireAuth = require("../middleware/auth_middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  }
});

router.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  documentController.uploadDocument
);

module.exports = router;