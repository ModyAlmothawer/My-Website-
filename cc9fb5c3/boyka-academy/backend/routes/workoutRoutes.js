const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutController");

router.get("/", controller.getWorkouts);

module.exports = router;
