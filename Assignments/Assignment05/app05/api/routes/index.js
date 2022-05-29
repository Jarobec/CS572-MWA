const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controller");

router.route("/games/:gameId/reviews").get(reviewsController.getAll);
router.route("/games/:gameId/reviews/:reviewId").get(reviewsController.getOne);

module.exports = router;
