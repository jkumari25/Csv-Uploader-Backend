const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");
const {
  getNewCsv,
  importNewCsvFile,
  getFilteredCsv,
} = require("../controllers/CsvNewController");

const router = express.Router();

// Middleware setup
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "public")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
router.route("/getNewFile").get(isAuthenticatedUser, getNewCsv);
router
  .route("/importNewCsvFile")
  .post(upload.single("file"), importNewCsvFile, isAuthenticatedUser);
router.route("/getCsv").get(getFilteredCsv);

module.exports = router;
