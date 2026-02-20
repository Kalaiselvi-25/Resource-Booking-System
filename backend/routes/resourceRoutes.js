const express = require("express");
const router = express.Router();
const {
  addResource,
  getResources,
  deleteResource,
  getSummary
} = require("../controllers/resourceController");

router.post("/add", addResource);
router.get("/all", getResources);
router.delete("/delete/:id", deleteResource);
router.get("/summary", getSummary);

module.exports = router;
