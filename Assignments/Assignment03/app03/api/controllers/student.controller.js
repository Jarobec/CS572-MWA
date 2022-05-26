const schoolsData = require("../data/school.json");
const customError = require("../middleware/custom.error");

const getAll = function (req, res) {
  res.status(200).json(schoolsData);
};

const getStudent = function (req, res) {
  if (isNaN(parseInt(req.params.studentIndex))) {
    customError.customError(req, res, 401, "Bad request");
  } else {
    const index = req.params.studentIndex;
    res.status(200).json(schoolsData[index - 1]);
  }
};

module.exports = {
  getAll,
  getStudent,
};
