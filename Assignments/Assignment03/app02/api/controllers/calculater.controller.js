const multiply = function (req, res) {
  let numberOne = parseInt(process.env.DEFAULT_NUMBER_VALUE);
  let numberTwo = parseInt(process.env.DEFAULT_NUMBER_VALUE);

  if (req.params && req.params.numberOne) {
    numberOne = parseInt(req.params.numberOne);
  }
  if (req.query && req.query.numberTwo) {
    numberTwo = parseInt(req.query.numberTwo);
  }

  const multiply = numberOne * numberTwo;

  const result = {
    numberOne: numberOne,
    numberTwo: numberTwo,
    multiply: multiply,
  };

  res.status(200).json({ result: result });
};

module.exports = {
  multiply,
};
