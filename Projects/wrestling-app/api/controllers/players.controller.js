const mongoose = require("mongoose");
const Team = mongoose.model(process.env.DB_TEAM_MODEL);

const getAll = function (req, res) {
  let count = parseInt(
    process.env.DEFAULT_FIND_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  let offset = parseInt(
    process.env.DEFAULT_FIND_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );
  const maxCount = parseInt(
    process.env.DEFAULT_FIND_COUNT_MAX,
    process.env.INTEGER_CONVERSION_BASE
  );

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }
  if (isNaN(count) || isNaN(offset)) {
    res
      .status(400)
      .json({ message: "QueryString: Offset and Count should be numbers" });
    return;
  }
  if (count > maxCount) {
    res.status(400).json({ message: "Cannot exceed count of " + maxCount });
    return;
  }

  const teamId = req.params.teamId;
  Team.findById(teamId)
    .select("players")
    .exec(function (err, team) {
      const response = {
        status: 200,
        message: [],
      };
      if (err) {
        console.log("Error finding Team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team not found", teamId);
        response.status = 404;
        response.message = { message: "Team not found" };
      } else if (team && team.players.length === 0) {
        console.log("Players not found");
        response.status = 404;
        response.message = { message: "Players not found" };
      } else {
        response.message = team.players;
      }

      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;
  Team.findById(teamId)
    .select("players")
    .exec(function (err, team) {
      const response = {
        status: 200,
        message: [],
      };
      if (err) {
        console.log("Error finding team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team not found", teamId);
        response.status = 404;
        response.message = { message: "Team not found" };
      } else if (team && !team.players.id(playerId)) {
        console.log("Player not found", playerId);
        response.status = 404;
        response.message = { message: "Player not found" };
      } else {
        response.message = team.players.id(playerId);
      }

      res.status(response.status).json(response.message);
    });
};

const addOne = function (req, res) {
  const teamId = req.params.teamId;
  Team.findById(teamId)
    .select("players")
    .exec(function (err, team) {
      const response = { status: 200, message: team };
      if (err) {
        console.log("Team not found", team);
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team not found", teamId);
        response.status = 404;
        response.message = { message: "Team not found" };
      }
      if (team) {
        _addPlayer(req, res, team);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _addPlayer = function (req, res, team) {
  const newPlayer = { name: req.body.name, age: req.body.age };
  team.players.push(newPlayer);

  team.save(function (err, updatedTeam) {
    const response = { status: 200, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedTeam.players;
    }
    res.status(response.status).json(response.message);
  });
};

const _updateOne = function (req, res, playerUpdateCallback) {
  const teamId = req.params.teamId;
  Team.findById(teamId)
    .select("players")
    .exec(function (err, team) {
      const response = { status: 204, message: team };
      if (err) {
        console.log("Error finding team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team not found");
        response.status = 404;
        response.message = { message: "Team not found" };
      } else if (team && !team.players.id(req.params.playerId)) {
        console.log("Player not found", playerId);
        response.status = 404;
        response.message = { message: "Player not found" };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      }
      playerUpdateCallback(req, res, team);
    });
};

const _fullPlayerUpdate = function (req, res, team) {
  let player = team.players.id(req.params.playerId);
  player.name = req.body.name;
  player.age = req.body.age;

  team.save(function (err, updatedTeam) {
    const response = { status: 204, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedTeam.players;
    }
    res.status(response.status).json(response.message);
  });
};

const _partialPlayerUpdate = function (req, res, team) {
  let player = team.players.id(req.params.playerId);

  if (req.body.name) {
    player.name = req.body.name;
  }
  if (req.body.age) {
    player.age = req.body.age;
  }

  team.save(function (err, updatedTeam) {
    const response = { status: 204, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedTeam.players;
    }
    res.status(response.status).json(response.message);
  });
};

const fullUpdateOne = function (req, res) {
  _updateOne(req, res, _fullPlayerUpdate);
};
const partialUpdateOne = function (req, res) {
  _updateOne(req, res, _partialPlayerUpdate);
};

const deleteOne = function (req, res) {
  const teamId = req.params.teamId;
  Team.findById(teamId)
    .select("players")
    .exec(function (err, team) {
      const response = { status: 200, message: team };
      if (err) {
        console.log("Error finding team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team not found", teamId);
        response.status = 404;
        response.message = { message: "Team not found" };
      } else if (team && !team.players.id(req.params.playerId)) {
        console.log("Player not found", playerId);
        response.status = 404;
        response.message = { message: "Player not found" };
      }

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      }
      _deletePlayer(req, res, team);
    });
};

const _deletePlayer = function (req, res, team) {
  team.players.id(req.params.playerId).remove();

  team.save(function (err, updatedTeam) {
    const response = { status: 204, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedTeam.players;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
