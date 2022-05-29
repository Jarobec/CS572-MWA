const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisher.controller");

router
  .route("/games/:gameId/publisher")
  .get(publisherController.getOne)
  .post(publisherController.addOne)
  .delete(publisherController.deleteOne);

module.exports = router;
