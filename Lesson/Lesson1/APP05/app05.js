const fs = require("fs");

console.log("1: App start");

fs.readFile("largefile.txt", function (err, buffer) {
  console.log("2: Got the file", buffer.toString().substring(0, 10));
});

console.log("3: App end");
