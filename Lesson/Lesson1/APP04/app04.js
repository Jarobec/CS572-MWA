const fs = require("fs");

console.log("1: App start");

const buffer = fs.readFileSync("largefile.txt");
console.log("2: Got the file", buffer.toString().substring(0, 10));

console.log("3: App end");
