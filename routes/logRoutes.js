const express = require("express");
const router = express.Router();
const controller = require("../controllers/logController");

// Q7. POST /logs
router.post("/", controller.insertLog);

module.exports = router;
