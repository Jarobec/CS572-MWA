const child_process = require("child_process");

console.log("1: Lab start");

const newProcess = child_process.fork("fibonacci.js", [30, -15]);

console.log("2: Lab end");
