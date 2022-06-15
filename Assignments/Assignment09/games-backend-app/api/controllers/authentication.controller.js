const jwt = require("jsonwebtoken");
const util = require("util");

const authenticate = function (req, res, next) {
  const response = {
    status: 403,
    message: { message: "No token provided" },
  };

  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headerExists.authorization.split(" ")[1];
    console.log("The token is", token);
    // try {
    //   jwt.verify(token, process.env.JWT_PASSWORD);
    //   next();
    // } catch (err) {
    //   res.status(401).json({ message: "Unauthorized" });
    // }
    const jwtVerifyPromise = util.promisify(jwt.verify, {
      context: jwt,
    });
    jwtVerifyPromise(token, process.env.JWT_PASSWORD).then(() => next());
  } else {
    res.status(response.status).json(response.message);
  }
};

module.exports = { authenticate };
