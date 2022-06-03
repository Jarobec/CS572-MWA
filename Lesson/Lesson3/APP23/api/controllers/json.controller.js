module.exports.json = function (req, res) {
  console.log("JSON received");
  res.status(200).json({ "JSON Data": "True" });
};
