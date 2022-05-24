require("./instantHello");
let talk = require("./talk");
let question = require("./talk/question");

talk.greeting();
talk.intro();
let answer = question.ask("What is the meaning of life?");
console.log(answer);
talk.goodbye();
