const filename = "talk.js";

const goodbye = function () {
  console.log("Goodbye");
};

const intro = function () {
  console.log("I am a node file called", filename);
};

const hello = function () {
  console.log("Hello");
};

module.exports = {
  goodbye,
  intro,
  greeting: hello,
};
