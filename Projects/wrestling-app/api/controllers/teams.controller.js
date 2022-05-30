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

  Team.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, teams) {
      const response = { status: 200, message: teams };
      if (err) {
        console.log("Error finding all teams");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res, next) {
  const teamId = req.params.teamId;
  Team.findById(teamId).exec(function (err, team) {
    next({
      error: err,
      document: team,
      modelName: "Team",
    });
    // const response = { status: 200, message: team };
    // if (err) {
    //   console.log("Error finding team");
    //   response.status = 500;
    //   response.message = err;
    // } else if (!team) {
    //   console.log("Team not found", teamId);
    //   response.status = 404;
    //   response.message = { message: "Team not found" };
    // }

    // res.status(response.status).json(response.message);
  });
};

const addOne = function (req, res) {
  const newTeam = {
    name: req.body.name,
    country: req.body.country,
    numOfPartInOlympic: req.body.numOfPartInOlympic,
    players: [],
  };

  Team.create(newTeam, function (err, team) {
    const response = { status: 201, message: team };
    if (err) {
      console.log("Error creating team");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

const _updateOne = function (req, res, updateTeamCallBack) {
  const teamId = req.params.teamId;
  Team.findById(teamId).exec(function (err, team) {
    const response = { status: 204, message: team };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      console.log("Team not found", teamId);
      response.status = 404;
      response.message = { message: "Team not found" };
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      updateTeamCallBack(req, res, team, response);
    }
  });
};

const fullUpdateOne = function (req, res) {
  const teamUpdate = function (req, res, team, response) {
    team.name = req.body.name;
    team.country = req.body.country;
    team.numOfPartInOlympic = req.body.numOfPartInOlympic;

    team.save(function (err, updatedTeam) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, teamUpdate);
};

const partialUpdateOne = function (req, res) {
  const teamUpdate = function (req, res, team, response) {
    if (req.body.name) {
      team.name = req.body.name;
    }
    if (req.body.country) {
      team.country = req.body.country;
    }
    if (req.body.numOfPartInOlympic) {
      team.numOfPartInOlympic = req.body.numOfPartInOlympic;
    }

    team.save(function (err, updatedTeam) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, teamUpdate);
};

const deleteOne = function (req, res) {
  const teamId = req.params.teamId;
  Team.findByIdAndDelete(teamId).exec(function (err, deletedTeam) {
    const response = { status: 204, message: deletedTeam };
    if (err) {
      console.log("Error deleting team");
      response.status = 500;
      response.message = err;
    } else if (!deletedTeam) {
      console.log("Team not found", teamId);
      response.status = 404;
      response.message = { message: "Team not found" };
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
