const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teams.controller");
const playersController = require("../controllers/players.controller");

router.route("/teams").get(teamsController.getAll).post(teamsController.addOne);
router
  .route("/teams/:teamId")
  .get(teamsController.getOne)
  .put(teamsController.fullUpdateOne)
  .patch(teamsController.partialUpdateOne)
  .delete(teamsController.deleteOne);

router
  .route("/teams/:teamId/players")
  .get(playersController.getAll)
  .post(playersController.addOne);
router
  .route("/teams/:teamId/players/:playerId")
  .get(playersController.getOne)
  .put(playersController.fullUpdateOne)
  .patch(playersController.partialUpdateOne)
  .delete(playersController.deleteOne);

module.exports = router;
