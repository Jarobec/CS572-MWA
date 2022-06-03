import { DE_Student } from "./DE_Student.js";
console.log("App start");
let jack = new DE_Student(123, "Jack", 3.8);
console.log(jack);
// for(let i in jack) {
//     console.log(i); 
// }
console.log(jack["course"]);
if (jack["canProgram"]) {
    console.log(jack.name + " please program");
    jack["program"]();
}
else {
    console.log("Don't worry you will learn to program.");
}
console.log("App end");
